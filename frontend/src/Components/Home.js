import { BsGithub } from "react-icons/bs"; 
import { BsWhatsapp } from "react-icons/bs"; 
import { CgMail } from "react-icons/cg"; 
import { BsLinkedin } from "react-icons/bs"; 
import React, { useEffect, useState ,useRef} from "react";
import "../styles/Home.css";
import Slider from "react-slick"; // For sliders
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion"; // For animations

const Home = () => {
  // State for counters
  const [projects, setProjects] = useState(0);
  const [clients, setClients] = useState(0);
  const [team, setTeam] = useState(0);

  const statsRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false); // To prevent repeated animations

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true); // Prevent animation from running again
          let projectInterval = setInterval(
            () => setProjects((prev) => (prev < 15 ? prev + 1 : 15)),
            30
          );
          let clientInterval = setInterval(
            () => setClients((prev) => (prev < 10 ? prev + 1 : 10)),
            40
          );
          let teamInterval = setInterval(
            () => setTeam((prev) => (prev < 50 ? prev + 1 : 50)),
            50
          );

          return () => {
            clearInterval(projectInterval);
            clearInterval(clientInterval);
            clearInterval(teamInterval);
          };
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the element is visible
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, [hasAnimated]);

  // Testimonial Slider Settings
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="home">
      <motion.section
        className="banner"
        initial={{ opacity: 0, x: -20, rotateX: 20 }}
        animate={{
          opacity: 1,
          x: 0,
          rotateX: 0,
          transition: { duration: 1, ease: "easeOut" },
        }}
        
        whileInView={{
          opacity: 1,
          x: 0,
          rotateX: 8,
          transition: { duration: 5, ease: "easeOut" }
        }}
        viewport={{ once: true }}
      >
         <div className="banner">
      <motion.div
        className="banner-content"
        initial={{ opacity: 0, y: -100 }} // Initial state: transparent and moved up
        animate={{ opacity: 1, y: 10 }} // End state: fully visible and positioned normally
        transition={{ duration: 2, ease: "easeInOut" }} // Smooth transition
      >
        <h1 className="gradient-text">WELCOME TO KEYKODERS</h1>
        <p className="banner-description">
          Delivering innovative IT solutions to empower your business.
        </p>
        <button className="cta-button">
          <a href="/jobs">Apply for Jobs</a>
        </button>
      </motion.div>
    </div>
      </motion.section>

      {/* Stats Counter Section */}
      <motion.section
        className="stats"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <h2>Our Achievements</h2>
        <div ref={statsRef} className="stats-grid">
          <div className="stat-item">
            <h3>{projects}+</h3>
            <p>Projects Completed</p>
          </div>
          <div className="stat-item">
            <h3>{clients}+</h3>
            <p>Happy Clients</p>
          </div>
          <div className="stat-item">
            <h3>{team}+</h3>
            <p>Team Members</p>
          </div>
        </div>
      </motion.section>

      {/* Services Section */}
      <motion.section
        className="services"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <h2>Our Services</h2>
        <div className="services-grid">
          <div className="service-card">
            <h3>Full-Stack Development</h3>
            <p>
              Build robust web and mobile applications with scalable architecture tailored to your business goals.
            </p>
          </div>
          <div className="service-card">
            <h3>Digital Marketing</h3>
            <p>
              Drive growth and engagement with our cutting-edge digital marketing strategies.
            </p>
          </div>
          <div className="service-card">
            <h3>Home Automation</h3>
            <p>
              Automate and optimize your home with our advanced smart solutions.
            </p>
          </div>
          <div className="service-card">
            <h3>Power BI Projects</h3>
            <p>
              Empower your business with data visualization and analytics solutions.
            </p>
          </div>
          <div className="service-card">
            <h3>IoT Solutions</h3>
            <p>
              Develop smart devices to seamlessly connect and control your operations.
            </p>
          </div>
          <div className="service-card">
            <h3>Industrial IoT</h3>
            <p>
              Integrate IoT in industrial environments for real-time insights and operational efficiency.
            </p>
          </div>
          <div className="service-card">
            <h3>Manpower Solutions</h3>
            <p>
              Providing skilled professionals to meet your project requirements.
            </p>
          </div>
        </div>
        {/* <div className="services-img-wrapper">
          <img src={servicesImg} alt="Services" className="services-img" />
        </div> */}
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        className="testimonials"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <h2>What Our Clients Say</h2>
        <Slider {...sliderSettings} className="testimonial-slider">
          <div className="testimonial">
            <p>
              "KeyKoders exceeded our expectations with their seamless solutions and exceptional service. Highly recommend their expertise!"
            </p>
          </div>
          <div className="testimonial">
            <p>
              "The team at KeyKoders delivered high-quality work and were professional throughout the process. Great experience!"
            </p>
          </div>
        </Slider>
        
      </motion.section>

      {/* Call-to-Action Section */}
      <motion.section
        className="contact"
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <h2>Get in Touch</h2>
        <p>
          Ready to take your business to the next level? Let's build something amazing together.
        </p>
        <div className="social-icons-container">
          <BsLinkedin size={30} />
          <CgMail size={30} />
          <BsWhatsapp size={30} />
          <BsGithub size={30} />
        </div>

      </motion.section>
    </div>
  );
};

export default Home;
