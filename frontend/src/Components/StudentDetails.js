import React, { useState } from "react";
// Your enhanced styles object
const styles = {
  container: {
    maxWidth: '100px',
    margin: '40px auto',
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    fontFamily: 'Arial, sans-serif',
    background: '#f5f5f5',
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
},
  heading: {
    fontSize: '18px',
    marginBottom: '20px',
    fontWeight: '600',
},
formRow: {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '12px',
  marginBottom: '16px',
},
formGroup: {
  flex: 1,
  minWidth: '160px',
},
  select: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '16px',
  },
  buttonGroup: {
    display: 'flex',
    gap: '20px',
    marginTop: '20px',
},
button: {
  padding: '10px',
  width:"400px",
  backgroundColor: '#2f4f4f',
  color: '#fff',
  border: 'none',
  cursor: 'pointer',
  borderRadius: '5px',
}, addButton: {
  padding: '10px',
  width:"400px",
  backgroundColor: '#2f4f4f',
  color: '#fff',
  border: 'none',
  cursor: 'pointer',
  borderRadius: '5px',
},
table: {
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: '20px',
},
th: {
  padding: '10px',
  backgroundColor: '#2f4f4f',
  color: '#fff',
  fontSize:'12px',
  textAlign: 'left',
  border: '1px solid #ddd',
},
td: {
  padding: '10px',
  textAlign: 'left',
  fontSize:'12px',
  border: '1px solid #ddd',
},
};

// College data
const collegeOptions = {
  pcb: [
    "Select College Name",
    "113 - GOVERNMENT POLYTECHNIC COLLEGE, ARANTHANGI, PUDUKKOTTAI",
    "227 - MOHAMMED SATHAK POLYTECHNIC COLLEGE, RAMANATHAPURAM",
    "229 - SANKAR POLYTECHNIC COLLEGE, TIRUNELVELI",
    "230 - KAMARAJ POLYTECHNIC COLLEGE, KANYAKUMARI",
    "331 - SUBRAMANIAN POLYTECHNIC COLLEGE, PUDUKKOTTAI",
    "352 - LAKSHMIAMMAL POLYTECHNIC COLLEGE, THOOTHUKUDI",
    "355 - ST XAVIERS POLYTECHNIC COLLEGE, THOOTHUKUDI",
    "356 - MORNING STAR POLYTECHNIC COLLEGE, KANYAKUMARI",
    "363 - SRINIVASA POLYTECHNIC COLLEGE, PUDUKKOTTAI",
    "366 - ARULMIGU SENTHILANDAVAR POLYTECHNIC COLLEGE, TENKASI",
    "367 - MSP VELAYUTHANADAR LAKSHMITHAIAMMAL  POLY.COLLEGE, TENKASI",
    "375 - MODERATOR GNANADASAN POLYTECHNIC COLLEGE, KANYAKUMARI",
    "381 - SREE KRISHNA POLYTECHNIC COLLEGE, KANYAKUMARI",
    "501 - JAYARAJ ANNAPACKIAM C S I POLYTECHNIC COLLEGE, THOOTHUKUDI",
    "519 - SCAD GRAMODHAYA POLYTECHNIC COLLEGE, TIRUNELVELI",
    "566 - PASTOR LENSSEN POLYTECHNIC COLLEGE, TIRUNELVELI",
    "568 - UDAYA POLYTECHNIC COLLEGE, KANYAKUMARI",
    "573 - GRACE POLYTECHNIC COLLEGE. THOOTHUKUDI",
    "580 - F X POLYTECHNIC COLLEGE, TIRUNELVELI",
    "584 - SUDHARSAN POLYTECHNIC COLLEGE, PUDUKKOTTAI",
    "589 - CHENDHURAN POLYTECHNIC COLLEGE, PUDUKKOTTAI",
    "720 - P S N POLYTECHNIC COLLEGE, TIRUNELVELI",
    "722 - UDHAYAM POLYTECHNIC COLLEGE, RAMANATHAPURAM",
    "723 - CAPE POLYTECHNIC COLLEGE, KANYAKUMARI",
    "725 - THE INDIAN POLYTECHNIC COLLEGE, TIRUNELVELI",
    "726 - P S N INSTITUTE OF TECHNOLOGY, KANYAKUMARI",
    "753 - MAHATH AMMA POLYTECHNIC COLLEGE, PUDUKKOTTAI",
    "754 - ST. JOSEPH POLYTECHNIC COLLEGE, PUDUKKOTTAI",
    "768 - VIVEKANANDA POLYTECHNIC COLLEGE, SIVAGANGAI",
    "769 - ST. MICHEAL POLYTECHNIC COLLEGE, SIVAGANGAI",
    "772 - PET POLYTECHNIC COLLEGE, TIRUNELVELI",
    "774 - UDAYA INSTITUTE OF TECHNOLOGY, KANYAKUMARI",
    "775 - UNION CHRISTIAN POLYTECHNIC COLLEGE, KANYAKUMARI",
    "780 - S.VEERASAMY CHETTIAR POLYTECHNIC COLLEGE, TENKASI",
    "820 - JESU POLYTECHNIC COLLEGE, PUDUKKOTTAI",
    "822 - U.S.P. POLYTECHNIC COLLEGE, TENKASI",
    "824 - NACHIAPPA SWAMIGAL POLYTECHNIC COLLEGE, SIVAGANGAI",
    "836 - S. THANGAPAZHAM POLYTECHNIC COLLEGE, TENKASI",
    "846 - HI-TECH POLYTECHNIC COLLEGE, TIRUNELVELI",
    "848 - KUMARAN POLYTECHNIC COLLEGE, PUDUKKOTTAI",
    "849 - JEYA POLYTECHNIC COLLEGE, THOOTHUKUDI",
    "855 - RECT POLYTECHNIC COLLEGE, TIRUNELVELI",
    "861 - ST. XAVIERS POLYTECHNIC COLLEGE, SIVAGANGAI",
    "863 - SREE VAIKUNDAR POLYTECHNIC COLLEGE, KANYAKUMARI",
    "866 - VIVEKANANDA POLYTECHNIC COLLEGE, KANYAKUMARI",
    "870 - PSV POLYTECHNIC COLLEGE, PUDUKKOTTAI",
    "874 - EVEREST POLYTECHNIC COLLEGE, TENKASI",
    "891 - THEVANESAM ERUDHAYA AMMAL POLYTECHNIC COLLEGE, THOOTHUKUDI",
    "895 - MARIA POLYTECHNIC COLLEGE, KANYAKUMARI",
    "899 - MERIT POLYTECHNIC COLLEGE, TIRUNELVELI",
    "919 - St. JUDES POLYTECHNIC COLLEGE, KANYAKUMARI",
    "923 - IMMANUEL ARASAR J.J COLLEGE OF ENGG. COLLEGE, KANYAKUMARI",
    "927 - R V REHA POLYTECHNIC COLLEGE, TENKASI",
    "934 - VETHAMONICKAM MEMORIAL CSI POLYTECHNIC COLLEGE, KANYAKUMARI",
    "945 - AKY POLYTECHNIC COLLEGE, TIRUNELVELI",
    "958 - UDAYA SCHOOL OF ENGINEERING, KANYAKUMARI"
  ],
  flutter: [
    "Select College Name",
    "119 - GOVERNMENT POLYTECHNIC COLLEGE, KANYAKUMARI",
    "152 - GOVERNMENT POLYTECHNIC COLLEGE, TIRUNELVELI",
    "178 - B C M WOMENS POLYTECHNIC COLLEGE, THOOTHUKUDI",
    "229 - SANKAR POLYTECHNIC COLLEGE, TIRUNELVELI",
    "230 - KAMARAJ POLYTECHNIC COLLEGE, KANYAKUMARI",
    "354 - GOMATHI AMBAL POLYTECHNIC COLLEGE, TENKASI",
    "356 - MORNING STAR POLYTECHNIC COLLEGE, KANYAKUMARI",
    "366 - ARULMIGU SENTHILANDAVAR POLYTECHNIC COLLEGE, TENKASI",
    "MSP VELAYUTHANADAR LAKSHMITHAIAMMAL POLY.COLLEGE, TENKASI",
    "368 - KALAIVANAR N S K POLYTECHNIC COLLEGE, KANYAKUMARI",
    "375 - MODERATOR GNANADASAN POLYTECHNIC COLLEGE, KANYAKUMARI",
    "381 - SREE KRISHNA POLYTECHNIC COLLEGE, KANYAKUMARI",
    "501 - JAYARAJ ANNAPACKIAM C S I POLYTECHNIC COLLEGE, THOOTHUKUDI",
    "519 - SCAD GRAMODHAYA POLYTECHNIC COLLEGE, TIRUNELVELI",
    "568 - UDAYA POLYTECHNIC COLLEGE, KANYAKUMARI",
    "573 - GRACE POLYTECHNIC COLLEGE. THOOTHUKUDI",
    "580 - F X POLYTECHNIC COLLEGE, TIRUNELVELI",
    "720 - P S N POLYTECHNIC COLLEGE, TIRUNELVELI",
    "723 - CAPE POLYTECHNIC COLLEGE, KANYAKUMARI",
    "725 - THE INDIAN POLYTECHNIC COLLEGE, TIRUNELVELI",
    "726 - P S N INSTITUTE OF TECHNOLOGY, KANYAKUMARI",
    "772 - PET POLYTECHNIC COLLEGE, TIRUNELVELI",
    "774 - UDAYA INSTITUTE OF TECHNOLOGY, KANYAKUMARI",
    "775 - UNION CHRISTIAN POLYTECHNIC COLLEGE, KANYAKUMARI",
    "780 - S.VEERASAMY CHETTIAR POLYTECHNIC COLLEGE, TENKASI",
    "795 - ST.MARIAM POLYTECHNIC COLLEGE, TENKASI",
    "822 - U.S.P. POLYTECHNIC COLLEGE, TENKASI",
    "823 - BWDA POLYTECHNIC COLLEGE, KANYAKUMARI",
    "846 - HI-TECH POLYTECHNIC COLLEGE, TIRUNELVELI",
    "849 - JEYA POLYTECHNIC COLLEGE, THOOTHUKUDI",
    "855 - RECT POLYTECHNIC COLLEGE, TIRUNELVELI",
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



function StudentDetails() {
  const [filters, setFilters] = useState({
    branch: "",
    university: "",
    district: "",
    college: "",
  });

  const [selectedCourse, setSelectedCourse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [students, setStudents] = useState([]); // ✅ Safe to use .map()


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleCourseChange = (e) => {
    const course = e.target.value;
    setSelectedCourse(course);
    setFilters((prev) => ({ ...prev, course, college: "" }));
  };

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {

      const queryString = new URLSearchParams(filters).toString(); // Convert the filters to a query string
      const response = await fetch(`http://localhost:5000/api/students/search?${queryString}`, {
        method: "GET", // Use GET instead of POST
        headers: { "Content-Type": "application/json" }, // Optional, as it's a GET request
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data.");
      }

      const data = await response.json();
      console.log("Search Results:", data);
      setStudents(data); // Update students list
    } catch (err) {
      console.error("Search failed:", err);
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  const renderColleges = () => {
    if (!selectedCourse || !collegeOptions[selectedCourse]) {
      return <option value="">-- Select a course first --</option>;
    }

    return collegeOptions[selectedCourse].map((college, index) => (
      <option key={index} value={college}>
        {college}
      </option>
    ));
  };

  return (
    <div>
      <h2 style={styles.heading}>Students Attendance Report</h2>
      <form>
        <div style={styles.formRow}>
          {/* Academic Year */}
          <div style={styles.formGroup}>
            <label>Academic Year <span style={{ color: 'red' }}>*</span></label>
            <select name="academicYear" style={styles.select} onChange={handleChange}>
              <option value="">Select Year</option>
              <option value="2024-2025">2024-2025</option>
              <option value="2023-2024">2023-2024</option>
              <option value="2022-2023">2022-2023</option>
            </select>
          </div>

          {/* College Type */}
          <div style={styles.formGroup}>
            <label>College Type <span style={{ color: 'red' }}>*</span></label>
            <select name="collegeType" style={styles.select} onChange={handleChange}>
              <option value="">Select College Type</option>
              <option>Arts & Science</option>
              <option>Engineering</option>
              <option>Polytechnic</option>
              <option>ITI</option>
            </select>
          </div>

          {/* Semester */}
          <div style={styles.formGroup}>
            <label>Semester<span style={{ color: 'red' }}>*</span></label>
            <select name="semester" style={styles.select} onChange={handleChange}>
              <option value="">Select Semester</option>
              <option value="4">4</option>
            </select>
          </div>

          {/* Course Name */}
          <div style={styles.formGroup}>
            <label>Course Name <span style={{ color: 'red' }}>*</span></label>
            <select
              id="course"
              onChange={handleCourseChange}
              style={styles.select}
              value={filters.course}
            >
              <option value="">-- Select Course --</option>
              <option value="pcb">PCB Design</option>
              <option value="flutter">Flutter Development</option>
            </select>
          </div>

          {/* College Name */}
          <div style={styles.formGroup}>
            <label>College Name<span style={{ color: 'red' }}>*</span></label>
            <select
              name="college"
              style={styles.select}
              value={filters.college}
              onChange={handleChange}
            >
              {renderColleges()}
            </select>
          </div>

          {/* Branch Name */}
          <div style={styles.formGroup}>
            <label>Branch Name<span style={{ color: 'red' }}>*</span></label>
            <select name="branch" style={styles.select} onChange={handleChange}>
              <option value="">Select Branch</option>
              <option value="ARTIFICIAL INTELLIGENCE AND MACHINE LEARNING">ARTIFICIAL INTELLIGENCE AND MACHINE LEARNING</option>
              <option value="COMPUTER ENGINEERING (FULL TIME)">COMPUTER ENGINEERING (FULL TIME)</option>
              <option value="COMPUTER SCIENCE AND ENGINEERING (FULL TIME)">COMPUTER SCIENCE AND ENGINEERING (FULL TIME)</option>
              <option value="COMPUTER SCIENCE AND INFORMATION TECHNOLOGY">COMPUTER SCIENCE AND INFORMATION TECHNOLOGY</option>
              <option value="INFORMATION TECHNOLOGY (FULL TIME)">INFORMATION TECHNOLOGY (FULL TIME)</option>
              <option value="MEDICAL LABORATORY TECHNOLOGY">MEDICAL LABORATORY TECHNOLOGY</option>
              <option value="ELECTRONICS AND COMMUNICATION ENGINEERING (FULL TIME)">ELECTRONICS AND COMMUNICATION ENGINEERING (FULL TIME)</option>
            </select>
          </div>

          {/* University */}
          <div style={styles.formGroup}>
            <label>University<span style={{ color: 'red' }}>*</span></label>
            <select name="university" style={styles.select} onChange={handleChange}>
              <option value="">Select University</option>
              <option>Directorate of Technical Education (DOTE)</option>
            </select>
          </div>

          {/* District */}
          <div style={styles.formGroup}>
            <label>District<span style={{ color: 'red' }}>*</span></label>
            <select name="district" style={styles.select} onChange={handleChange}>
              <option value="">Select District</option>
              <option value="Pudukkottai">Pudukkottai</option>
              <option value="Kanyakumari">Kanyakumari</option>
              <option value="Thoothukudi">Thoothukudi</option>
              <option value="Tirunelveli">Tirunelveli</option>
              <option value="Tenkasi">Tenkasi</option>
              <option value="Ramanathapuram">Ramanathapuram</option>
              <option value="Sivagangai">Sivagangai</option>
              {/* Add more if needed */}
            </select>
          </div>
        </div>

        <div style={styles.headerRow}>
          
            <button type="button" style={styles.button} onClick={handleSearch}>
              Search
            </button>
            <button type="button" style={styles.addButton}>Download</button>
          


        </div>
      </form>
      {students.length > 0 ? (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>S.No</th>
              <th style={styles.th}>Student Name</th>
              <th style={styles.th}>Roll No</th>
              <th style={styles.th}>NM ID</th>
              <th style={styles.th}>Mark(Max:70)</th>
              <th style={styles.th}>Internal Mark Available</th>
              <th style={styles.th}>AvgMark=50</th>
              <th style={styles.th}>No Of Days Present</th>
              <th style={styles.th}>College</th>
              <th style={styles.th}>University</th>
              <th style={styles.th}>District</th>
              <th style={styles.th}>Branch</th>
              <th style={styles.th}>sem</th>

            </tr>
          </thead>
          <tbody>
            {students.map((student, idx) => (
              <tr key={idx}>
                <td style={styles.td}>{student.SNo}</td>
                <td style={styles.td}>{student.StudentName}</td>
                <td style={styles.td}>{student.RollNo}</td>
                <td style={styles.td}>{student.NMID}</td>
                <td style={styles.td}>{student.Mark}</td>
                <td style={styles.td}>No</td>
                <td style={styles.td}>No</td>
                <td style={styles.td}>{student.NoOfDaysPresent}</td>
                <td style={styles.td}>{student.College}</td>
                <td style={styles.td}>{student.University}</td>
                <td style={styles.td}>{student.District}</td>
                <td style={styles.td}>{student.Branch}</td>
                <td style={styles.td}>{student.Sem}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !loading && <p style={{ textAlign: "center" }}>No students found.</p>
      )}

    </div>
  );
}




export default StudentDetails;
