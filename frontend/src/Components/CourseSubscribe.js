import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const CourseSubscribe = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/courses/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCourse(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching course:", err);
        setLoading(false);
      });
  }, [id]);

  const handleConfirm = () => {
    navigate(`/subscribe-form/${id}`);
  };

  return (
    <div className="container">
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <h2 className="title">Subscribe to Course</h2>
          <div className="breadcrumb">
            <span>Home</span> &gt; <span>Subscribe</span>
          </div>

          <div className="content-box">

          <h3 className="course-title">{course.courseName}</h3>
<p>
  <strong>Price:</strong>{" "}
  <span style={{ textDecoration: "line-through", color: "#888" }}>
    ₹{course.coursePrice}
  </span>{" "}
  <span style={{ color: "#28a745", fontWeight: "bold" }}>
    Free to Subscribe
  </span>
</p>
<p><strong>Duration:</strong> {course.courseDuration}</p>
<p>{course.courseDescription}</p>


            <p style={{ marginTop: "20px" }}>
              Are you sure you want to subscribe?
            </p>
            <div className="button-container">
              <button className="subscribe-button" onClick={handleConfirm}>
                Confirm
              </button>
              <button className="back-button" onClick={() => navigate(-1)}>
                Cancel
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CourseSubscribe;
