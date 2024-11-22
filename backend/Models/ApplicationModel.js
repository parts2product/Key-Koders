const mongoose = require('mongoose');

// Schema for application submissions
const ApplicationSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true }, // Reference to User
    jobTitle: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    skills: { type: [String], required: true },
    resume: { type: String , required: true }, 
    education: { type: String, required: true },
    phone: { type: Number, required: true},
    address: { type: String , required: true},
}, { timestamps: true });

const ApplicationModel = mongoose.model("Applications", ApplicationSchema);

module.exports = ApplicationModel;
