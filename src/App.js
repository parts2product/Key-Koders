import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import JobPortal from './Components/JobPortal';
import Signup from './Components/Signup';
import Signin from './Components/Signin';
import ApplicationForm from './Components/ApplicationForm';
import About from './Components/About';
import Myapplication from './Components/Myapplication';
import CourseSubscribe from "./Components/CourseSubscribe";
import Admin from './Components/Admin';
import CourseAccess from "./Components/CourseAccess";
import NmDashboard from "./Components/NmDashboard";

function App() {
  return (
    <Router> {/* Wrap the entire component tree inside BrowserRouter */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<JobPortal />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/application-form/:jobTitle" element={<ApplicationForm />} />
        <Route path="/myapplication" element={<Myapplication />} />
        <Route path="/subscribe/:id" element={<CourseSubscribe />} />
        <Route path="/course-access/:id" element={<CourseAccess />} />
        <Route path="/Nm-Dashboard" element={<NmDashboard />} />
      </Routes>
    </Router> 
  );
}

export default App;
