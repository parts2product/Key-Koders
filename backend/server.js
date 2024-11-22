const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const nodemailer = require("nodemailer");
const UserModel = require("./Models/Users.js");
const Job = require("./Models/Job.js");
const ApplicationModel = require("./models/ApplicationModel");
require('dotenv').config();
// Middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve static files
app.use(cookieParser());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

// Constants
const bcryptKey = bcrypt.genSaltSync(10);
const jwtSecret = "wertyuidfgh345678";

// MongoDB Connection
mongoose
  .connect("mongodb+srv://KEYKODERS:KODERS123@koders.itcwu.mongodb.net/")
  .then(() => console.log("DB connected"))
  .catch((err) => console.error(err));

// Register Endpoint
app.post("/register", async (req, res) => {
  const { username, password, email } = req.body;
  const hashedPassword = bcrypt.hashSync(password, bcryptKey);

  try {
    const createdUser = await UserModel.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: createdUser._id, name: createdUser.name },
      jwtSecret
    );

    res.json({ token, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating user" });
  }
});

// Login Endpoint
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userDoc = await UserModel.findOne({ email });

    if (!userDoc) {
      return res.status(404).json("User not found");
    }

    const isPasswordValid = bcrypt.compareSync(password, userDoc.password);
    if (isPasswordValid) {
      const token = jwt.sign(
        { email: userDoc.email, name: userDoc.name, id: userDoc._id },
        jwtSecret,
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token,
        userDoc,
        success: true,
      });
    } else {
      res.status(401).json("Invalid credentials");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Internal server error");
  }
});

// get user by id
app.get("/getuser/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract userID from request body

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required." });
    }

    // Find user by ID
    const user = await UserModel.findById(id);

    if (user) {
      return res.status(200).json({
        success: true,
        message: "User details retrieved successfully.",
        user,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }
  } catch (error) {
    console.error("Error retrieving user:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while retrieving the user.",
    });
  }
});

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Create transporter for email
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "gangeswaran375@gmail.com",
    pass: "jgig rycj xsfa ueat", // Ensure this is securely stored
  },
});

// Application Form Endpoint (email sending)
app.post("/application-form", async (req, res) => {
  const { name, email, skills, phone, address, resume, education } =
    req.body.formData;
  const { userID, jobTitle } = req.body;
  if(!userID){
    return res.status(400).json({ success: false, message: "Sign in to apply for a job." });
  }

  // Assuming 'resume' is a URL or file path to the resume uploaded by the applicant.
  const resumeLink = resume ? resume : "#"; // Replace '#' with the actual link to the resume.

  const mailOptions = {
    to: "gangeswaran.keykoders@gmail.com",
    subject: "New Application Received",
    html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.8; color: #333; padding: 20px;">
        <h1 style="font-size: 24px; font-weight: bold; color: #333;">New Application for the Position of ${jobTitle}</h1>
        <p style="font-size: 16px;">Dear Hiring Manager,</p>
        <p style="font-size: 16px;">We are pleased to inform you that a new application has been received for the position of <strong>${jobTitle}</strong>. Below are the details of the applicant:</p>
        
        <p style="font-size: 16px;"><strong>Name:</strong> ${name}</p>
        <p style="font-size: 16px;"><strong>Email:</strong> ${email}</p>
        <p style="font-size: 16px;"><strong>Phone:</strong> ${phone}</p>
        <p style="font-size: 16px;"><strong>Address:</strong> ${address}</p>
        <p style="font-size: 16px;"><strong>Education:</strong> ${education}</p>
        <p style="font-size: 16px;"><strong>Skills:</strong> ${skills.join(
          ", "
        )}</p>
        
        <p style="font-size: 16px;">If you wish to move forward with the application, you may contact the applicant directly via email. Additionally, you can download the applicant's resume using the following link:</p>

        <p style="font-size: 16px;">
            To contact the applicant: 
            <a href="mailto:${email}" style="color: #007BFF; text-decoration: none;">Email ${name}</a>
        </p>
        <p style="font-size: 16px;">
            To download the resume: 
            <a href="${resumeLink}" download style="color: #28A745; text-decoration: none;">Download Resume</a>
        </p>

        <p style="font-size: 16px;">Kind regards,</p>
        <p style="font-size: 16px;">The Hiring Team</p>
    </div>
`,
  };

  try {
    await transporter.sendMail(mailOptions);
    const application = new ApplicationModel({
      userID,
      jobTitle,
      name,
      email,
      skills,
      phone,
      address,
      resume,
      education,
    });

    await application.save();

    res
      .status(200)
      .json({ success: true, message: "Application submitted successfully!" });
  } catch (error) {
    res.status(500).send("Failed to submit the application");
  }
});

// Get Applications
app.get("/my-applications", async (req, res) => {
  try {
    const id = req.query.userID;
    const applications = await ApplicationModel.find({ userID: id }).sort({
      createdAt: -1,
    });
    res.status(200).json({ success: true, applications });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error retrieving applications." });
  }
});

// Server
app.listen(5000, () => {
  console.log("Connected to host 5000");
});
