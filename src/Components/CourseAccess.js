import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function CourseAccess() {
  const { id } = useParams(); // course_id from URL
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      course_id: id,
    };

    try {
      const res = await fetch('https://keykoder-backend.onrender.com/nm/api/course/access', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('✅ Course access granted!');
      } else {
        setMessage(`❌ Failed: ${data.message || 'Something went wrong'}`);
      }
    } catch (error) {
      console.error(error);
      setMessage('❌ Network error while trying to access the course.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Course Access</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        /><br /><br />
        <input
          name="email"
          type="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        /><br /><br />
        <button type="submit">Access Course</button>
      </form>
      {message && <p style={{ marginTop: '20px' }}>{message}</p>}
    </div>
  );
}

export default CourseAccess;
