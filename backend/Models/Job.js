const mongoose = require('mongoose');


const JobSchema = new mongoose.Schema({
    
        fullName: { type: String, required: true }, // Applicant's full name
        email: { 
            type: String, 
            required: true, 
            unique: true, 
        },
        skills: { 
            type: [String], // Array of skills
            default: [] // Default to an empty array if not provided
        },
        uploadResume: { 
            type: String, // Stores the file path or URL
            required: true // Resume is mandatory
        },
    }, { timestamps: true });
    
const JobModel = new mongoose.model("Job", JobSchema)
module.exports = JobModel 