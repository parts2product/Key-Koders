import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/ApplicationForm.css";
import axios from "axios";

const ApplicationForm = () => {
  const { jobTitle } = useParams();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    skills: [],
    phone: "",
    address: "",
    education: "",
    resume: "",
  });
  const [skillInput, setSkillInput] = useState(""); // State for the skills input field
  const [success, setSuccess] = useState(false); // State for tracking successful submission

  // Handle changes to text input fields (name, email)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle changes to the skills input field
  const handleSkillInputChange = (e) => {
    setSkillInput(e.target.value);
  };

  // Add skill to the skills array in formData
  const handleAddSkill = (e) => {
    e.preventDefault();
    if (skillInput.trim() && !formData.skills.includes(skillInput)) {
      setFormData({ ...formData, skills: [...formData.skills, skillInput] });
      setSkillInput(""); // Clear input after adding
    }
  };

  // Remove skill from the skills array
  const handleRemoveSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((skill) => skill !== skillToRemove),
    });
  };

  // Handle form submission and send data to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userID = localStorage.getItem("userID");
    if(!userID) {
      alert("Sign in to apply for a job.");
      window.location.href = "/login";
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/application-form`,
        { formData, userID, jobTitle },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        alert("Application submitted successfully!");
        setSuccess(true);
      } else {
        alert("Failed to submit the application.");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error submitting application:", error);
      alert(
        error.message
      );
      setLoading(false);
    }
  };

  return (
    <div className="application-form-container">
      {success ? (
        <div>
          <h2>
            Successfully applied for the <strong>{jobTitle}</strong> position!
          </h2>
          <button>
            <a href="/">Go to Home</a>
          </button>
        </div>
      ) : (
        <>
          <h1>Application Form for {jobTitle}</h1>
          <form
            onSubmit={handleSubmit}
            method="post"
            className="application-form"
            encType="multipart/form-data"
          >
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                placeholder="Enter your email address"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Mobile Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                pattern="^[0-9]{10}$" // Adjust the pattern as per the mobile format
                placeholder="Enter your mobile number"
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                placeholder="Enter your full address"
              />
            </div>

            <div className="form-group">
              <label htmlFor="education">Education</label>
              <input
                type="text"
                id="education"
                name="education"
                value={formData.education}
                onChange={handleChange}
                required
                placeholder="Enter your highest qualification"
              />
            </div>
            <div className="form-group">
              <label htmlFor="skills">Skills</label>
              <div className="skills-input-container">
                <input
                  type="text"
                  id="skills"
                  value={skillInput}
                  onChange={handleSkillInputChange}
                  placeholder="Enter a skill and press Add"
                />
                <button
                  onClick={handleAddSkill}
                  type="button"
                  className="add-skill-btn"
                >
                  Add Skill
                </button>
              </div>
              <div className="skills-tags">
                {formData.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="remove-skill-btn"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="resume">Resume</label>
              <input
                type="text"
                id="resume"
                name="resume"
                value={formData.resume}
                onChange={handleChange}
                required
                placeholder="Place your resume drive link"
              />
            </div>
            <button type="submit" className="submit-btn">
            {loading ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default ApplicationForm;
