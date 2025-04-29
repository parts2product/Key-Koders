import React, { useEffect, useState } from "react";

const TrainerDetails = () => {
    const [trainers, setTrainers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [trainerData, setTrainerData] = useState({
        name: "",
        designation: "",
        mobile: "",
        email: "",
        area_of_expertise: "",
        total_experience: "",
        total_training_experience: "",
        linkedin_profile: "",
        fluency_english: "",
        fluency_tamil: "",
    });

    const [files, setFiles] = useState({
        photo: null,
        resume: null,
        certificate: null,
    });

    useEffect(() => {
        fetch('https://keykoder-backend.onrender.com/api/trainers')
          .then(res => res.json())
          .then(data => {
            console.log("Fetched trainers:", data);
            setTrainers(data); // ✅ use data directly, not data.trainers
          })
          .catch(err => console.error("Error fetching trainers", err));
    }, []);
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTrainerData(prev => {
            const updatedData = { ...prev, [name]: value };
            console.log('Updated form data:', updatedData);
            return updatedData;
        });
    };

    const handleFileChange = (e) => {
        const { name, files: selectedFiles } = e.target;
        setFiles(prev => ({ ...prev, [name]: selectedFiles[0] }));
    };

    const handleSubmit = () => {
        const formData = new FormData();
        Object.entries(trainerData).forEach(([key, value]) => {
            formData.append(key, value);
        });
        Object.entries(files).forEach(([key, value]) => {
            if (value) formData.append(key, value);
        });

        // Log formData to check if it's correctly formatted
        console.log('FormData being sent:', formData);

        
        fetch("https://keykoder-backend.onrender.com/api/trainers", {
            method: "POST",
            body: formData,
        })
            .then(res => res.json())
            .then(data => {
                console.log('Trainer added:', data);
                setTrainers(prev => [...prev, data]);
                setShowModal(false);
                setTrainerData({
                    name: "",
                    designation: "",
                    mobile: "",
                    email: "",
                    area_of_expertise: "",
                    total_experience: "",
                    total_training_experience: "",
                    linkedin_profile: "",
                    fluency_english: "",
                    fluency_tamil: "",
                });
                setFiles({ photo: null, resume: null, certificate: null });
            })
            .catch(err => console.error("Error adding trainer", err));
    };

    return (
        <div>
            <div style={styles.headerRow}>
                <h2 style={styles.heading}>Trainer Details</h2>
                <button style={styles.addButton} onClick={() => setShowModal(true)}>Add New Trainer</button>
            </div>

            <div style={{ overflowX: 'auto' }}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            {[
                                'S.No', 'Trainer Name', 'Designation', 'Mobile', 'Email',
                                'Area of Expertise', 'Total Experience', 'Total Training Experience',
                                'LinkedIn Profile', 'Trainer Photo', 'Trainer Resume',
                                'Trainer Certificates', 'Fluency in English', 'Fluency in Tamil', 'Action'
                            ].map((heading, index) => (
                                <th key={index} style={styles.th}>{heading}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {trainers.map((trainer, index) => (
                            <tr key={trainer.id} style={{ backgroundColor: '#fafafa' }}>
                                <td style={styles.td}>{index + 1}</td>
                                <td style={styles.td}>{trainer.name}</td>
                                <td style={styles.td}>{trainer.designation}</td>
                                <td style={styles.td}>{trainer.mobile}</td>
                                <td style={styles.td}>{trainer.email}</td>
                                <td style={styles.td}>{trainer.area_of_expertise}</td>
                                <td style={styles.td}>{trainer.total_experience}</td>
                                <td style={styles.td}>{trainer.total_training_experience}</td>
                                <td style={styles.td}><a href={trainer.linkedin_profile} target="_blank" rel="noopener noreferrer">LinkedIn</a></td>
                                <td style={styles.td}><a href={trainer.photo_url} target="_blank"><button>View</button></a></td>
                                <td style={styles.td}><a href={trainer.resume_url} target="_blank"><button>View</button></a></td>
                                <td style={styles.td}><a href={trainer.certificate_url} target="_blank"><button>View</button></a></td>
                                <td style={styles.td}>{trainer.fluency_english ? "Yes" : "No"}</td>
                                <td style={styles.td}>{trainer.fluency_tamil ? "Yes" : "No"}</td>
                                <td style={styles.td}><button>Edit</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal Form */}
            {showModal && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalContent}>
                        <h3 style={styles.modalTitle}>Add New Trainer</h3>
                        <form style={styles.modalForm}>
                            {[
                                { label: "Name", name: "name" },
                                { label: "Designation", name: "designation" },
                                { label: "Mobile", name: "mobile" },
                                { label: "Email", name: "email" },
                                { label: "Expertise", name: "area_of_expertise" },
                                { label: "Total Experience", name: "total_experience" },
                                { label: "Training Experience", name: "total_training_experience" },
                                { label: "LinkedIn", name: "linkedin_profile" },
                                { label: "Fluency English", name: "fluency_english" },
                                { label: "Fluency Tamil", name: "fluency_tamil" },
                            ].map((field, idx) => (
                                <div key={idx} style={styles.modalField}>
                                    <label>{field.label}</label>
                                    <input
                                        type="text"
                                        name={field.name}
                                        value={trainerData[field.name]}
                                        onChange={handleChange}
                                        style={styles.modalInput}
                                    />
                                </div>
                            ))}

                            <div style={styles.modalField}>
                                <label>Photo</label>
                                <input type="file" name="photo" onChange={handleFileChange} />
                            </div>
                            <div style={styles.modalField}>
                                <label>Resume</label>
                                <input type="file" name="resume" onChange={handleFileChange} />
                            </div>
                            <div style={styles.modalField}>
                                <label>Certificate</label>
                                <input type="file" name="certificate" onChange={handleFileChange} />
                            </div>

                            <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                                <button type="button" style={styles.button} onClick={handleSubmit}>Submit</button>
                                <button type="button" style={{ ...styles.button, backgroundColor: 'gray' }} onClick={() => setShowModal(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    headerRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
    },
    heading: {
        fontSize: '24px',
        fontWeight: 'bold',
        marginRight:"10px",
    },
    addButton: {
        padding: '10px',
        width:"300px",
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
        textAlign: 'left',
        border: '1px solid #ddd',
    },
    td: {
        padding: '10px',
        textAlign: 'left',
        border: '1px solid #ddd',
    },
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '10px',
        width: '600px',
        maxHeight: '90vh',
        overflowY: 'auto',
    },
    modalTitle: {
        marginBottom: '20px',
        fontSize: '20px',
        fontWeight: 'bold',
    },
    modalForm: {
        display: 'flex',
        flexDirection: 'column',
    },
    modalField: {
        marginBottom: '15px',
    },
    modalInput: {
        padding: '8px',
        width: '100%',
        border: '1px solid #ccc',
        borderRadius: '5px',
    },
};

export default TrainerDetails;
