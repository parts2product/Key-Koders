import React, { useState } from "react";
import axios from "axios";

const ApplicationForm = ({ jobTitle }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    skills: [],
    phone: "",
    address: "",
    resume: "",
    education: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "skills") {
      setFormData((prev) => ({
        ...prev,
        [name]: value.split(",").map((skill) => skill.trim()),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userID = parseInt(localStorage.getItem("userID"), 10);
    if (!userID) {
      setError("Please login before applying.");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/application-form`,
        {
          userID,
          jobTitle,
          formData,
        }
      );

      if (response.data.success) {
        setMessage("Application submitted successfully!");
        setError("");
      } else {
        setError("Submission failed. Try again.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setError("An error occurred while submitting.");
    }
  };

  return (
    <div className="application-form-container">
      <h2>Apply for {jobTitle}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="skills"
          placeholder="Skills (comma-separated)"
          value={formData.skills.join(", ")}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
        />
        <input
          type="text"
          name="resume"
          placeholder="Resume Link (URL)"
          value={formData.resume}
          onChange={handleChange}
        />
        <input
          type="text"
          name="education"
          placeholder="Education"
          value={formData.education}
          onChange={handleChange}
        />

        <button type="submit">Submit Application</button>
      </form>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default ApplicationForm;
