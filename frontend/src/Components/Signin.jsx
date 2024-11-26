import React, { useState } from 'react';
import '../styles/Signin.css';
import axios from 'axios';

const Signin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError('');

        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, formData);
            // console.log(response);

            if (response.data.success) {
                // Store email or token in localStorage
                localStorage.setItem('userID', response.data.userDoc._id);
                window.location.href = '/jobs';
            } else {
                setError(response.data.message || 'Signin failed');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signin-container">
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit} className="signin-form">
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit" className="signin-btn" disabled={loading}>
                    {loading ? 'Signing In...' : 'Sign In'}
                </button>
            </form>
            <div className="signup-link">
                <p>Don't have an account? <a href="/register">Sign Up</a></p>
            </div>
        </div>
    );
};

export default Signin;
