import React, { useState } from 'react';

const TrainerSchedule = () => {
  const [formData, setFormData] = useState({
    academicYear: '',
    collegeType: '',
    semester: '',
    oddEven: '',
    course: '',
    trainerName: '',
  });

  const [errors, setErrors] = useState({});
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: '' });
  };

  const handleSearch = () => {
    setLoading(true);
    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value) newErrors[key] = 'Required';
    });


    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
    } else {
      const queryParams = new URLSearchParams(formData).toString();

      fetch(`https://keykoder-backend.onrender.com/api/trainer-schedules?${queryParams}`)
        .then((res) => res.json())
        .then((data) => {
          setTableData(data.length > 0 ? data : []);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching data:', err);
          setLoading(false);
        });
    }
  };

  const styles = {
    container: {
      padding: '30px',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '30px',
      marginTop: '10px',
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
    },
    button: {
      backgroundColor: '#364a45',
      color: '#fff',
      padding: '12px 24px',
      borderRadius: '10px',
      border: 'none',
      fontWeight: '600',
      fontSize: '14px',
      cursor: 'pointer',
      width: '250px',
      height: '50px',
    },
    filterRow: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '15px',
      marginBottom: '30px',
    },
    selectWrapper: {
      display: 'flex',
      flexDirection: 'column',
    },
    label: {
      marginBottom: '5px',
      fontSize: '14px',
      fontWeight: '500',
    },
    select: {
      padding: '10px',
      width: '180px',
      borderRadius: '6px',
      border: '1px solid #ccc',
      fontSize: '14px',
    },
    errorText: {
      color: 'red',
      fontSize: '12px',
    },
    actionBtnsWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px'
    },
    searchBtn: {
      padding: '10px',
      width: "400px",
      backgroundColor: '#2f4f4f',
      color: '#fff',
      border: 'none',
      cursor: 'pointer',
      borderRadius: '5px',
    },
    downloadBtn: {
      padding: '10px',
      width: "400px",
      marginLeft: "570px",
      backgroundColor: '#2f4f4f',
      color: '#fff',
      border: 'none',
      cursor: 'pointer',
      borderRadius: '5px',
    },
    noData: {
      marginTop: '40px',
      fontWeight: '500',
      color: '#333',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '30px',
      backgroundColor: '#fff',
    },
    th: {
      border: '1px solid #ddd',
      padding: '10px',
      backgroundColor: '#364a45',
      color: 'white',
      textAlign: 'left',
    },
    td: {
      border: '1px solid #ddd',
      padding: '10px',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Trainer Schedules</h2>
        <button style={styles.button}>Add New Trainer Schedule</button>
      </div>

      <div style={styles.filterRow}>
        {[
          { name: 'academicYear', label: 'Academic Year', options: ['2023-2024', '2024-2025'] },
          { name: 'collegeType', label: 'College Type', options: ['Engineering', 'Arts & Science', 'polytechnic', 'ITI'] },
          { name: 'oddEven', label: 'Odd/Even Semester', options: ['Odd', 'Even'] },
          { name: 'semester', label: 'Semester', options: ['4', '6'] },
          { name: 'course', label: 'Course Name', options: ['PCB Design', 'Mobile App Development'] },
          { name: 'trainerName', label: 'College Trainer', options: ['Lenin', 'Vinisha', 'Anton Feroz', 'Syed abbas', 'Mohamed Malik Badhusha', 'jayamathi', 'karuppu raj', 'Abdul Rahman'] },
        ].map((field) => (
          <div key={field.name} style={styles.selectWrapper}>
            <label style={styles.label}>{field.label}</label>
            <select
              style={styles.select}
              value={formData[field.name]}
              onChange={(e) => handleChange(field.name, e.target.value)}
            >
              <option value="">-- Select --</option>
              {field.options.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            {errors[field.name] && (
              <span style={styles.errorText}>{errors[field.name]}</span>
            )}
          </div>
        ))}
        
        <div style={styles.actionBtnsWrapper}>
          <button style={styles.searchBtn} onClick={handleSearch} disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
          <button style={styles.downloadBtn}>Download Report</button>
        </div>
      </div>

      {tableData.length > 0 ? (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Academic Year</th>
              <th style={styles.th}>College Type</th>
              <th style={styles.th}>Semester</th>
              <th style={styles.th}>Course ID</th>
              <th style={styles.th}>Course Name</th>
              <th style={styles.th}>College Name</th>
              <th style={styles.th}>Hub/Solo</th>
              <th style={styles.th}>Hub College List</th>
              <th style={styles.th}>Weeks Completed</th>
              <th style={styles.th}>Trainer Name</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, idx) => (
              <tr key={idx}>
                <td style={styles.td}>{row.academic_year}</td>
                <td style={styles.td}>{row.college_type}</td>
                <td style={styles.td}>{row.semester}</td>
                <td style={styles.td}>{row.course_id}</td>
                <td style={styles.td}>{row.course_name}</td>
                <td style={styles.td}>{row.college_name}</td>
                <td style={styles.td}>{row.hub_solo}</td>
                <td style={styles.td}>{row.hub_college_list || '—'}</td>
                <td style={styles.td}>{row.weeks_schedule_completed}</td>
                <td style={styles.td}>{row.trainer_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div style={styles.noData}>No data found</div>
      )}
    </div>
  );
};

export default TrainerSchedule;
