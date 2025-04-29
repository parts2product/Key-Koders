import React, { useState } from "react";
import "./Admincs.css";

function CourseManagement() {
  const [courseId, setCourseId] = useState("");
  const [courseName, setCourseName] = useState("");
  const [coursePrice, setCoursePrice] = useState("");
  const [courseDuration, setCourseDuration] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseImage, setCourseImage] = useState(null);

  // Handle Image Upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCourseImage(file); // Store file for upload
    }
  };

  // Handle Form Submission
  const handleAddCourse = async () => {
    if (!courseId || !courseName || !coursePrice || !courseDuration || !courseDescription || !courseImage) {
      alert("Please fill in all fields and select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("courseId", courseId);
    formData.append("courseName", courseName);
    formData.append("coursePrice", coursePrice);
    formData.append("courseDuration", courseDuration);
    formData.append("courseDescription", courseDescription);
    formData.append("courseImage", courseImage);

    try {
      const response = await fetch("https://keykoder-backend.onrender.com/add-course", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        alert("Course added successfully!");
        setCourseId("");
        setCourseName("");
        setCoursePrice("");
        setCourseDuration("");
        setCourseDescription("");
        setCourseImage(null);
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error("Error adding course:", error);
      alert("Error adding course.");
    }
  };

  return (
    <div className="course-management">
      <h2>Add New Course</h2>

      <label htmlFor="courseId">Course ID:</label>
      <input
        id="courseId"
        type="text"
        placeholder="Enter Course ID"
        value={courseId}
        onChange={(e) => setCourseId(e.target.value)}
      />

      <label htmlFor="courseName">Course Name:</label>
      <input
        id="courseName"
        type="text"
        placeholder="Enter Course Name"
        value={courseName}
        onChange={(e) => setCourseName(e.target.value)}
      />

      <label htmlFor="coursePrice">Course Price (₹):</label>
      <input
        id="coursePrice"
        type="number"
        placeholder="Enter Course Price"
        value={coursePrice}
        onChange={(e) => setCoursePrice(e.target.value)}
      />

      <label htmlFor="courseDuration">Course Duration:</label>
      <input
        id="courseDuration"
        type="text"
        placeholder="Enter Duration (e.g. 3 months)"
        value={courseDuration}
        onChange={(e) => setCourseDuration(e.target.value)}
      />

      <label htmlFor="courseDescription">Course Description:</label>
      <textarea
        id="courseDescription"
        placeholder="Enter Course Description"
        value={courseDescription}
        onChange={(e) => setCourseDescription(e.target.value)}
      />

      <label htmlFor="courseImage">Upload Course Image:</label>
      <input id="courseImage" type="file" accept="image/*" onChange={handleImageChange} />

      <button onClick={handleAddCourse}>Add Course</button>
    </div>
  );
}

export default CourseManagement;
