import React, { useState, useEffect } from "react";
import { CgClose } from "react-icons/cg";
import { RxHamburgerMenu } from "react-icons/rx";
import "../styles/Navbar.css";
import Logo from "../assets/Logo.svg";
import axios from "axios";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userEmail, setUserEmail] = useState(null);

  // Toggle menu state

const handleProfile = ()=>{
  window.location.href = "/myapplication";
}

  const handleToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Check if user is logged in
  const userID = localStorage.getItem("userID");
  useEffect(() => {
    if (userID) {
      // Fetch user details
      const fetchUser = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/getuser/${userID}`);
          console.log(response.data);
          const email = response.data.user.email; // Assuming the API returns the user data in the `data` field
          setUserEmail(email); // Update userEmail state
        } catch (err) {
          console.error("Error fetching user:", err);
        }
      };
    
      fetchUser();
    }
  }, [userID]);

  // Handle logout functionality
  const handleLogout = () => {
    localStorage.removeItem("userID");
    setUserEmail(null);
    window.location.href = "/";
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
        style={{gap: `${isMenuOpen ? '' : '1.5rem'}`}}
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
        {userEmail ? (
          <>
            <button className="navbar__link navbar__user-icon" onClick={handleProfile}>
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
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
