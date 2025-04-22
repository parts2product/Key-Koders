import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTachometerAlt, FaBook, FaSignOutAlt, FaUsers } from "react-icons/fa";
import CourseManagement from "../Admin/CourseManagement";
import SubscriptionRequests from "../Admin/SubscriptionRequests"; // Make sure this path is correct
import "./Admin.css";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard">
      {/* Left Sidebar */}
      <div className="left-side">
        <h1>Admin Panel</h1>
        <ul className="navigation">
          <li onClick={() => setActiveTab("Dashboard")}>
            <FaTachometerAlt className="nav-icon" /> Dashboard
          </li>
          <li onClick={() => setActiveTab("CourseAdd")}>
            <FaBook className="nav-icon" /> Course Add
          </li>
          <li onClick={() => setActiveTab("Subscriptions")}>
            <FaUsers className="nav-icon" /> Subscriptions
          </li>
          <li onClick={() => navigate("/")}>
            <FaSignOutAlt className="nav-icon" /> Logout
          </li>
        </ul>
      </div>

      {/* Right Content Section */}
      <div className="right-side">
        <div className="content-box">
          {activeTab === "Dashboard" && (
            <>
              <h2>Welcome to Admin Dashboard</h2>
              <p>Manage all the platform activities here.</p>
            </>
          )}
          {activeTab === "CourseAdd" && <CourseManagement />}
          {activeTab === "Subscriptions" && <SubscriptionRequests />}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
