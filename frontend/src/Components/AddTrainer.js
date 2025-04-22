import React, { useState } from 'react';

const collegeOptions = {
  default: ["-- Select --", "ABC College", "XYZ Institute"],
  pcb: [
    "Select College Name",
    "113 - GOVERNMENT POLYTECHNIC COLLEGE, ARANTHANGI, PUDUKKOTTAI",
    "227 - MOHAMMED SATHAK POLYTECHNIC COLLEGE, RAMANATHAPURAM",
    "229 - SANKAR POLYTECHNIC COLLEGE, TIRUNELVELI",
    "230 - KAMARAJ POLYTECHNIC COLLEGE, KANYAKUMARI",
    "331 - SUBRAMANIAN POLYTECHNIC COLLEGE, PUDUKKOTTAI",
    "352 - LAKSHMIAMMAL POLYTECHNIC COLLEGE, THOOTHUKUDI",
    "353 - S A RAJAS POLYTECHNIC COLLEGE, TIRUNELVELI",
    "355 - ST XAVIERS POLYTECHNIC COLLEGE, THOOTHUKUDI",
    "356 - MORNING STAR POLYTECHNIC COLLEGE, KANYAKUMARI",
    "357 - NOORUL ISLAM POLYTECHNIC COLLEGE, KANYAKUMARI",
    "363 - SRINIVASA POLYTECHNIC COLLEGE, PUDUKKOTTAI",
    "366 - ARULMIGU SENTHILANDAVAR POLYTECHNIC COLLEGE, TENKASI",
    "367 - MSP VELAYUTHANADAR LAKSHMITHAIAMMAL POLY.COLLEGE, TENKASI",
    "375 - MODERATOR GNANADASAN POLYTECHNIC COLLEGE, KANYAKUMARI",
    "381 - SREE KRISHNA POLYTECHNIC COLLEGE, KANYAKUMARI",
    "501 - JAYARAJ ANNAPACKIAM C S I POLYTECHNIC COLLEGE, THOOTHUKUDI",
    "516 - VENKATESWARA POLYTECHNIC COLLEGE, PUDUKKOTTAI",
    "529 - SCAD GRAMODHAYA POLYTECHNIC COLLEGE, TIRUNELVELI",
    "566 - PASTOR LENSSEN POLYTECHNIC COLLEGE, TIRUNELVELI",
    "568 - UDAYA POLYTECHNIC COLLEGE, KANYAKUMARI",
    "573 - GRACE POLYTECHNIC COLLEGE, THOOTHUKUDI",
    "580 - F X POLYTECHNIC COLLEGE, TIRUNELVELI",
    "582 - MOTHER TERASA POLYTECHNIC COLLEGE, PUDUKKOTTAI",
    "584 - SUDHARSAN POLYTECHNIC COLLEGE, PUDUKKOTTAI",
    "589 - CHENDHURAN POLYTECHNIC COLLEGE, PUDUKKOTTAI",
    "720 - P S N POLYTECHNIC COLLEGE, TIRUNELVELI",
    "722 - UDHAYAM POLYTECHNIC COLLEGE, RAMANATHAPURAM",
    "723 - CAPE POLYTECHNIC COLLEGE, KANYAKUMARI",
    "725 - THE INDIAN POLYTECHNIC COLLEGE, TIRUNELVELI",
    "726 - P S N INSTITUTE OF TECHNOLOGY, KANYAKUMARI",
    "752 - SASTHA POLYTECHNIC COLLEGE, PUDUKKOTTAI",
    "753 - MAHATH AMMA POLYTECHNIC COLLEGE, PUDUKKOTTAI",
    "754 - ST. JOSEPH POLYTECHNIC COLLEGE, PUDUKKOTTAI",
    "755 - SRI BHARATHI POLYTECHNIC COLLEGE FOR WOMEN, PUDUKKOTTAI",
    "756 - VIVEKANANDA POLYTECHNIC COLLEGE, SIVAGANGAI"
  ],flutter: [
    "Select College Name",
    "119 - GOVERNMENT POLYTECHNIC COLLEGE, KANYAKUMARI",
    "152 - GOVERNMENT POLYTECHNIC COLLEGE, TIRUNELVELI",
    "178 - B C M WOMENS POLYTECHNIC COLLEGE, THOOTHUKUDI",
    "229 - SANKAR POLYTECHNIC COLLEGE, TIRUNELVELI",
    "230 - KAMARAJ POLYTECHNIC COLLEGE, KANYAKUMARI",
    "353 - S A RAJAS POLYTECHNIC COLLEGE, TIRUNELVELI",
    "354 - GOMATHI AMBAL POLYTECHNIC COLLEGE, TENKASI",
    "356 - MORNING STAR POLYTECHNIC COLLEGE, KANYAKUMARI",
    "357 - NOORUL ISLAM POLYTECHNIC COLLEGE, KANYAKUMARI",
    "366 - ARULMIGU SENTHILANDAVAR POLYTECHNIC COLLEGE, TENKASI",
    "367 - MSP VELAYUTHANADAR LAKSHMITHAIAAMMAL POLY.COLLEGE, TENKASI",
    "368 - KALAIVANAR N S K POLYTECHNIC COLLEGE, KANYAKUMARI",
    "375 - MODERATOR GNANADASAN POLYTECHNIC COLLEGE, KANYAKUMARI",
    "381 - SREE KRISHNA POLYTECHNIC COLLEGE, KANYAKUMARI",
    "501 - JAYARAJ ANNAPACKIAM C S I POLYTECHNIC COLLEGE, THOOTHUKUDI",
    "519 - SCAD GRAMODHAYA POLYTECHNIC COLLEGE, TIRUNELVELI",
    "560 - SAMUEL POLYTECHNIC COLLEGE, THOOTHUKUDI",
    "568 - UDAYA POLYTECHNIC COLLEGE, KANYAKUMARI",
    "573 - GRACE POLYTECHNIC COLLEGE, THOOTHUKUDI",
    "580 - F X POLYTECHNIC COLLEGE, TIRUNELVELI",
    "581 - AMRITA POLYTECHNIC COLLEGE, KANYAKUMARI",
    "720 - P S N POLYTECHNIC COLLEGE, TIRUNELVELI",
    "723 - CAPE POLYTECHNIC COLLEGE, KANYAKUMARI",
    "725 - THE INDIAN POLYTECHNIC COLLEGE, TIRUNELVELI",
    "726 - P S N INSTITUTE OF TECHNOLOGY, KANYAKUMARI",
    "772 - PET POLYTECHNIC COLLEGE, TIRUNELVELI",
    "774 - UDAYA INSTITUTE OF TECHNOLOGY, KANYAKUMARI",
    "775 - UNION CHRISTIAN POLYTECHNIC COLLEGE, KANYAKUMARI",
    "780 - S.VEERASAMY CHETTIAR POLYTECHNIC COLLEGE, TENKASI",
    "795 - ST.MARIAM POLYTECHNIC COLLEGE, TENKASI",
    "801 - SRI RAMANA INSTITUTE OF POLYTECHNIC COLLEGE, TIRUNELVELI",
    "822 - U.S.P. POLYTECHNIC COLLEGE, TENKASI",
    "823 - BWDA POLYTECHNIC COLLEGE, KANYAKUMARI",
    "846 - HI-TECH POLYTECHNIC COLLEGE, TIRUNELVELI",
    "849 - JEYA POLYTECHNIC COLLEGE, THOOTHUKUDI",
    "855 - RECT POLYTECHNIC COLLEGE, TIRUNELVELI",
    "857 - V.K.P. POLYTECHNIC COLLEGE, TENKASI",
    "866 - VIVEKANANDA POLYTECHNIC COLLEGE, KANYAKUMARI",
    "874 - EVEREST POLYTECHNIC COLLEGE, TENKASI",
    "891 - THEVANESAM ERUDHAYA AMMAL POLYTECHNIC COLLEGE, THOOTHUKUDI",
    "895 - MARIA POLYTECHNIC COLLEGE, KANYAKUMARI",
    "899 - MERIT POLYTECHNIC COLLEGE, TIRUNELVELI",
    "919 - St. JUDES POLYTECHNIC COLLEGE, KANYAKUMARI",
    "923 - IMMANUEL ARASAR J.J COLLEGE OF ENGG. COLLEGE, KANYAKUMARI",
    "934 - VETHAMONICKAM MEMORIAL CSI POLYTECHNIC COLLEGE, KANYAKUMARI",
    "945 - AKY POLYTECHNIC COLLEGE, TIRUNELVELI",
    "958 - UDAYA SCHOOL OF ENGINEERING, KANYAKUMARI"

  ]
};

const TrainerSchedule = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    academicYear: '',
    collegeType: '',
    oddEven: '',
    semester: '',
    course: '',
    collegeName: '',
    hubSolo: 'Hub',
    hubCollege: '',
    trainer: '',
    date: '',
    fromTime: '',
    toTime: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
      ...(field === 'course' && value !== 'PCB Design' ? { collegeName: '' } : {}),
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [field]: '' }));
  };

  const validateStepOne = () => {
    const requiredFields = [
      'academicYear',
      'collegeType',
      'oddEven',
      'semester',
      'course',
      'collegeName',
      'hubSolo',
      ...(formData.hubSolo === 'Hub' ? ['hubCollege'] : []),
    ];

    const newErrors = {};
    requiredFields.forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = 'Required';
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setStep(2);
    }
  };

  const validateStepTwo = () => {
    const requiredFields = ['trainer', 'date', 'fromTime', 'toTime'];
    const newErrors = {};
    requiredFields.forEach((key) => {
      if (!formData[key]) newErrors[key] = 'Required';
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      console.log('Submitted Data:', formData);
      alert('Trainer Schedule Saved Successfully!');
    }
  };

  const styles = {
    section: {
      background: '#f4f4f4',
      padding: '20px',
      borderRadius: '12px',
      marginBottom: '20px'
    },
    row: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '20px',
      marginBottom: '15px',
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
      flex: '1',
      minWidth: '220px',
    },
    label: {
      fontWeight: 'bold',
      marginBottom: '6px',
    },
    select: {
      padding: '8px',
      borderRadius: '6px',
      border: '1px solid #ccc',
    },
    radioGroup: {
      display: 'flex',
      gap: '20px',
      alignItems: 'center',
      marginTop: '5px'
    },
    error: {
      fontSize: '12px',
      color: 'red',
    },
    button: {
      backgroundColor: '#1c3c34',
      color: '#fff',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '6px',
      fontWeight: 'bold',
      cursor: 'pointer'
    }
  };

  const getCollegesByCourse = () => {
    if (formData.course === 'PCB Design') return collegeOptions.pcb;
    if (formData.course === 'Flutter Development') return collegeOptions.flutter;
    return collegeOptions.default;
  };

  return (
    <div style={{ padding: '30px' }}>
      <h2>Add New Trainer Schedule</h2>

      {step === 1 && (
        <div style={styles.section}>
          <div style={styles.row}>
            {/* Academic Year */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Academic Year *</label>
              <select
                style={styles.select}
                value={formData.academicYear}
                onChange={(e) => handleChange('academicYear', e.target.value)}
              >
                <option value="">-- Select --</option>
                <option value="2022-23">2022-2023</option>
                <option value="2023-24">2023-2024</option>
                <option value="2024-25">2024-2025</option>
                <option value="2025-26">2025-2026</option>
              </select>
              {errors.academicYear && <span style={styles.error}>{errors.academicYear}</span>}
            </div>

            {/* College Type */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>College Type *</label>
              <select
                style={styles.select}
                value={formData.collegeType}
                onChange={(e) => handleChange('collegeType', e.target.value)}
              >
                <option value="">-- Select --</option>
                <option value="Arts & Science">Arts & Science</option>
                <option value="Engineering">Engineering</option>
                <option value="Polytechnic">Polytechnic</option>
                <option value="ITI">ITI</option>
              </select>
              {errors.collegeType && <span style={styles.error}>{errors.collegeType}</span>}
            </div>

            {/* Odd/Even Semester */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Odd/Even Semester *</label>
              <select
                style={styles.select}
                value={formData.oddEven}
                onChange={(e) => handleChange('oddEven', e.target.value)}
              >
                <option value="">-- Select --</option>
                <option value="Odd">Odd</option>
                <option value="Even">Even</option>
              </select>
              {errors.oddEven && <span style={styles.error}>{errors.oddEven}</span>}
            </div>

            {/* Semester */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Semester *</label>
              <select
                style={styles.select}
                value={formData.semester}
                onChange={(e) => handleChange('semester', e.target.value)}
              >
                <option value="">-- Select --</option>
                <option value="4">4</option>
                <option value="6">6</option>
              </select>
              {errors.semester && <span style={styles.error}>{errors.semester}</span>}
            </div>

            {/* Course */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Course Name *</label>
              <select
                style={styles.select}
                value={formData.course}
                onChange={(e) => handleChange('course', e.target.value)}
              >
                <option value="">-- Select --</option>
                <option value="Flutter Development">Flutter Development</option>
                <option value="PCB Design">PCB Design</option>
              </select>
              {errors.course && <span style={styles.error}>{errors.course}</span>}
            </div>

            {/* College Name */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>College Name *</label>
              <select
                style={styles.select}
                value={formData.collegeName}
                onChange={(e) => handleChange('collegeName', e.target.value)}
              >
                {getCollegesByCourse().map((college, idx) => (
                  <option key={idx} value={college}>{college}</option>
                ))}
              </select>
              {errors.collegeName && <span style={styles.error}>{errors.collegeName}</span>}
            </div>
          </div>

          <div style={styles.row}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Hub or Solo *</label>
              <div style={styles.radioGroup}>
                <label>
                  <input
                    type="radio"
                    value="Hub"
                    checked={formData.hubSolo === 'Hub'}
                    onChange={(e) => handleChange('hubSolo', e.target.value)}
                  /> Hub
                </label>
                <label>
                  <input
                    type="radio"
                    value="Solo"
                    checked={formData.hubSolo === 'Solo'}
                    onChange={(e) => handleChange('hubSolo', e.target.value)}
                  /> Solo
                </label>
              </div>
              {errors.hubSolo && <span style={styles.error}>{errors.hubSolo}</span>}
            </div>

            {formData.hubSolo === 'Hub' && (
              <div style={styles.inputGroup}>
                <label style={styles.label}>Hub College List *</label>
                <select
                  style={styles.select}
                  value={formData.hubCollege}
                  onChange={(e) => handleChange('hubCollege', e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="Hub A">Hub A</option>
                  <option value="Hub B">Hub B</option>
                </select>
                {errors.hubCollege && <span style={styles.error}>{errors.hubCollege}</span>}
              </div>
            )}
          </div>

          <button style={styles.button} onClick={validateStepOne}>Next</button>
        </div>
      )}

      {step === 2 && (
        <div style={styles.section}>
          <h4>Week 2 - Session One</h4>
          <div style={styles.row}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Trainer *</label>
              <select
                style={styles.select}
                value={formData.trainer}
                onChange={(e) => handleChange('trainer', e.target.value)}
              >
                <option value="">-- Select --</option>
                <option value="Trainer 1">Trainer 1</option>
                <option value="Trainer 2">Trainer 2</option>
              </select>
              {errors.trainer && <span style={styles.error}>{errors.trainer}</span>}
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Date *</label>
              <input
                type="date"
                style={styles.select}
                value={formData.date}
                onChange={(e) => handleChange('date', e.target.value)}
              />
              {errors.date && <span style={styles.error}>{errors.date}</span>}
            </div>
          </div>

          <div style={styles.row}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>From Time *</label>
              <input
                type="time"
                style={styles.select}
                value={formData.fromTime}
                onChange={(e) => handleChange('fromTime', e.target.value)}
              />
              {errors.fromTime && <span style={styles.error}>{errors.fromTime}</span>}
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>To Time *</label>
              <input
                type="time"
                style={styles.select}
                value={formData.toTime}
                onChange={(e) => handleChange('toTime', e.target.value)}
              />
              {errors.toTime && <span style={styles.error}>{errors.toTime}</span>}
            </div>
          </div>

          <button style={styles.button} onClick={validateStepTwo}>Save Schedule</button>
        </div>
      )}
    </div>
  );
};

export default TrainerSchedule;