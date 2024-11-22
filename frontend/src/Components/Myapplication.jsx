import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/MyApplications.css";

const MyApplications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch applications from backend
    const userID = localStorage.getItem("userID");
    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/my-applications?userID=${userID}`);
                const myApplications = response.data.applications
                setApplications(myApplications); // Assuming data is an array of applications
                setLoading(false);
            } catch (err) {
                console.error("Error fetching applications:", err);
                setError("Failed to fetch applications. Please try again.");
                setLoading(false);
            }
        };

        fetchApplications();
    }, [userID]);

    if (loading) {
        return <div className="loading">Loading applications...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="my-applications-container">
            <h1>My Applications</h1>
            {applications.length === 0 ? (
                <p>You have not submitted any applications yet.</p>
            ) : (
                <div className="applications-list">
                    {applications?.map((application, index) => (
                        <div key={index} className="application-card">
                            <h2>{application.jobTitle}</h2>
                            <p>
                                <strong>Name:</strong> {application.name}
                            </p>
                            <p>
                                <strong>Email:</strong> {application.email}
                            </p>
                            <p>
                                <strong>Skills:</strong> {application.skills.join(", ")}
                            </p>
                            {application.resumeUrl && (
                                <p>
                                    <a
                                        href={application.resumeUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        View Resume
                                    </a>
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyApplications;
