import React, { useEffect, useState } from "react";
import "./NmDashboard.css"; // Import the external CSS
import StudentDetails from "../Components/StudentDetails";
import TrainerDetails from "../Components/TrainerDetails";
import TrainerSchedule from "../Components/TrainerSchedule";

const NmDashboard = () => {
    const [activeSection, setActiveSection] = useState("student");
    const [trainers, setTrainers] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        document.body.style.backgroundImage = 'none';
        document.body.style.backgroundColor = '#f5f5f5';
    }, []);

    useEffect(() => {
        if (activeSection === "trainer") {
            fetch('http://127.0.0.1:5000/api/trainers')
                .then(res => res.json())
                .then(data => setTrainers(data))
                .catch(err => console.error("Error fetching trainers", err));
        }
    }, [activeSection]);

    const handleLogin = (e) => {
        e.preventDefault();
        if (username === "Karyouns" && password === "Guest@123") {
            setIsAuthenticated(true);
        } else {
            setError("Invalid username or password");
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="full-page-background">
                <div className="login-card">
                    <form onSubmit={handleLogin}>
                        <h2 className="login-title">Login</h2>
                        {error && <p className="login-error">{error}</p>}
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="login-input"
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="login-input"
                            required
                        />
                        <button type="submit" className="login-button">Login</button>
                        <p className="footer-text">
                            For New Organization/Industry Job Registration <a href="#" className="login-link">Click here</a>
                        </p>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <>
            <nav style={styles.navbar}>
                <ul style={styles.navList}>
                    <li style={styles.navItem}>
                        <a href="#" style={styles.navLink} onClick={() => setActiveSection("student")}>Student Details</a>
                    </li>
                    <li style={styles.navItem}>
                        <a href="#" style={styles.navLink} onClick={() => setActiveSection("trainer")}>Trainer Details</a>
                    </li>
                    <li style={styles.navItem}>
                        <a href="#" style={styles.navLink} onClick={() => setActiveSection("schedule")}>Trainer Schedule</a>
                    </li>
                </ul>
            </nav>

            <div style={styles.container}>
                {activeSection === "student" && <StudentDetails styles={styles} />}
                {activeSection === "trainer" && <TrainerDetails trainers={trainers} />}
                {activeSection === "schedule" && <TrainerSchedule styles={styles} />}
            </div>
        </>
    );
};

const styles = {
    
    link: {
        color: '#0d6efd',
        textDecoration: 'none',
        fontWeight: 'bold',
    },
    navbar: {
        backgroundColor: '#2f4f4f',
        padding: '15px 30px',
    },
    navList: {
        listStyle: 'none',
        display: 'flex',
        gap: '30px',
        margin: 0,
        padding: 0,
    },
    navItem: {},
    navLink: {
        color: '#fff',
        textDecoration: 'none',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
    },
    container: {
        maxWidth: '1600px',
        margin: '40px auto',
        backgroundColor: '#fff',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    },
};

export default NmDashboard;
