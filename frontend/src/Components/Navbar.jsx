import React, { useState, useEffect } from "react";
import { CgClose } from "react-icons/cg";
import { RxHamburgerMenu } from "react-icons/rx";
import "../styles/Navbar.css";
import Logo from "../assets/Logo.svg";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const navigate = useNavigate(); // useNavigate hook for client-side navigation

  const handleProfile = () => {
    navigate("/myapplication");
  };

  const handleToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const userID = localStorage.getItem("userID");

  useEffect(() => {
    if (userID) {
      const fetchUser = async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/getuser/${userID}`
          );
          console.log(response.data);
          const email = response.data.user.email;
          setUserEmail(email);
        } catch (err) {
          console.error("Error fetching user:", err);
        }
      };

      fetchUser();
    }
  }, [userID]);

  const handleLogout = () => {
    localStorage.removeItem("userID");
    setUserEmail(null);
    navigate("/"); // Use navigate instead of window.location.href
  };

  return (
    <nav className="navbar">
      {/* Logo Section */}
      <div className="navbar__logo">
        <img src={Logo} alt="KeyKoders Logo" width={30} />
        <a href="/" className="navbar__brand">
          KeyKoders
        </a>
      </div>

      {/* Mobile Menu Toggle */}
      <button
        className="navbar__toggle"
        aria-expanded={isMenuOpen}
        onClick={handleToggle}
      >
        {!isMenuOpen ? <RxHamburgerMenu size={25} /> : <CgClose size={25} />}
      </button>

      {/* Links Section */}
      <ul
        className={`navbar__links ${isMenuOpen ? "navbar__links--active" : ""}`}
        style={{ gap: `${isMenuOpen ? "" : "1.5rem"}` }}
      >
        <li>
          <a href="/about" className="navbar__link">
            About
          </a>
        </li>
        
        <li>
          <a href="/jobs" className="navbar__link">
            Career
          </a>
        </li>
        <li>
          <a
            href="/course-access/:id"
            className="navbar__link"
            onClick={() => navigate(`/course-access/1`)} // Use navigate for client-side routing
          >
            Courses
          </a>
        </li>
        {userEmail ? (
          <>
            <button
              className="navbar__link navbar__user-icon"
              onClick={handleProfile}
            >
              {userEmail.charAt(0).toUpperCase()}
            </button>
            <li>
              <a
                onClick={handleLogout}
                className="navbar__link navbar__link--logout"
                style={{ borderBottom: "transparent" }}
              >
                Logout
              </a>
            </li>
          </>
        ) : (
          <>
            <li>
              <a href="/login" className="navbar__link">
                Login
              </a>
            </li>
            <li>
              <a
                href="/register"
                className="navbar__link"
                style={{ borderBottom: "transparent" }}
              >
                Register
              </a>
            </li>
            <li>
          <a
            href="/Nm-Dashboard"
            className="navba__link"
          >
            Nm Dashboard
          </a>
        </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
