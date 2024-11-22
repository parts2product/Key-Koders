import React from "react";
import { Link } from "react-router-dom";
import "../styles/JobPortal.css"; // Import the CSS file

const jobs = [
    {
      "id": 1,
      "title": "Frontend Developer",
      "salary": "80,000",
      "responsibilities": [
        "Build and maintain the user-facing elements of web applications.",
        "Work with HTML, CSS, JavaScript, and frameworks like React, Angular, or Vue.js.",
        "Ensure responsiveness and cross-browser compatibility."
      ],
      "skills": [
        "HTML", "CSS", "JavaScript", "React", "Angular", "SASS", "Git"
      ],
      "qualifications": [
        "Bachelor's degree in Computer Science or related field",
        "Experience in web development"
      ]
    },
    {
      "id": 2,
      "title": "Backend Developer",
      "salary": "95,000",
      "responsibilities": [
        "Develop server-side logic, databases, and APIs.",
        "Ensure database integration, optimize server performance, and handle data management.",
        "Work with technologies like Node.js, Java, Python, Ruby, PHP, etc."
      ],
      "skills": [
        "Node.js", "Java", "Python", "SQL", "NoSQL", "REST", "Docker", "AWS"
      ],
      "qualifications": [
        "Bachelor's degree in Computer Science or related field",
        "Experience with backend development and database management"
      ]
    },
    {
      "id": 3,
      "title": "Full Stack Developer",
      "salary": "90,000",
      "responsibilities": [
        "Build both the front-end and back-end of web applications.",
        "Collaborate with teams to design and implement solutions that span across both client and server sides."
      ],
      "skills": [
        "HTML", "CSS", "JavaScript", "React", "Node.js", "SQL", "NoSQL", "Git"
      ],
      "qualifications": [
        "Bachelor's degree in Computer Science or related field",
        "Experience with both front-end and back-end technologies"
      ]
    },
    {
      "id": 4,
      "title": "DevOps Engineer",
      "salary": "105,000",
      "responsibilities": [
        "Automate deployment processes and streamline development pipelines.",
        "Manage infrastructure, cloud services, and containerization (e.g., Docker, Kubernetes).",
        "Monitor system performance and ensure uptime."
      ],
      "skills": [
        "CI/CD", "Docker", "Kubernetes", "AWS", "Azure", "Linux", "Python", "Ansible"
      ],
      "qualifications": [
        "Bachelor's degree in Computer Science, Systems Engineering, or related field"
      ]
    },
    {
      "id": 5,
      "title": "Data Scientist",
      "salary": "115,000",
      "responsibilities": [
        "Analyze and interpret complex data to help companies make data-driven decisions.",
        "Build predictive models, run experiments, and use machine learning techniques."
      ],
      "skills": [
        "Python", "R", "SQL", "Machine Learning", "Tableau", "Hadoop"
      ],
      "qualifications": [
        "Master's or Ph.D. in Data Science, Statistics, Computer Science, or related field"
      ]
    },
    {
      "id": 6,
      "title": "Product Manager",
      "salary": "120,000",
      "responsibilities": [
        "Define the vision and strategy for a product, overseeing its development lifecycle.",
        "Collaborate with engineering, marketing, and sales teams to bring the product to market."
      ],
      "skills": [
        "Project Management", "Agile", "Communication"
      ],
      "qualifications": [
        "Bachelor's degree in Business, Marketing, or related field",
        "Experience in product management"
      ]
    },
    {
      "id": 7,
      "title": "UI/UX Designer",
      "salary": "85,000",
      "responsibilities": [
        "Design and create user interfaces and experiences that are intuitive and engaging.",
        "Conduct user research, usability testing, and collaborate with developers to implement designs."
      ],
      "skills": [
        "Adobe", "Figma", "Sketch", "Wireframing", "Prototyping", "User Testing"
      ],
      "qualifications": [
        "Bachelor's degree in Graphic Design, Interaction Design, or related field"
      ]
    }
]
  

const JobPortal = () => {
  return (
    <div className="jobportal">
      <h1>Job Openings</h1>
      <div className="container">
        {jobs.map((job) => (
          <div key={job.id} className="card">
            <h2 className="jobtitle">
              {job.title}
            </h2>
            <ul>{job.skills.map((skill,i) => {
                return (
                    <li key={i}>{skill}</li>
                )
            })}</ul>
            <div className="apply-button">
            <p >
              &#8377;
              {job.salary}
            </p>
            <Link to={`/application-form/${job.title}`}>Apply Now</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobPortal;
