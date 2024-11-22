import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import JobPortal from './Components/JobPortal';
import Signup from './Components/Signup';
import Signin from './Components/Signin';
import ApplicationForm from './Components/ApplicationForm';
import About from './Components/About';
import Myapplication from './Components/Myapplication';
function App() {
  return (
    <>
    <Navbar/>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/jobs" element={<JobPortal/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/register" element={<Signup/>}/>
        <Route path="/login" element={<Signin/>}/>
        <Route path="/application-form/:jobTitle" element={<ApplicationForm />} />   
        <Route path="/myapplication" element={<Myapplication/>}/>
     </Routes>
    </Router>
    </>

  );
}

export default App;
