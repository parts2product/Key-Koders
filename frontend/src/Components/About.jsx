import React, { useState } from 'react';

const About = () => {
  // Inline styles with responsiveness
  const sectionStyle = {
    padding: '60px 5%',
    backgroundColor: '#f9f9f9',
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    textAlign: 'center',
  };

  const blockStyle = {
    backgroundColor: '#ffffff',
    padding: '30px',
    marginBottom: '30px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
  };

  const headingStyle = {
    fontSize: '2.5rem',
    marginBottom: '20px',
    color: '#f38a00',
  };

  const subheadingStyle = {
    fontSize: '2rem',
    color: '#e17400',
    marginBottom: '15px',
  };

  const paragraphStyle = {
    fontSize: '1rem',
    lineHeight: '1.6',
    color: '#333',
  };

  const servicesStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '20px',
    marginTop: '40px',
  };

  const serviceTagBaseStyle = {
    backgroundColor: '#ffffff',
    padding: '25px',
    width: 'calc(33% - 20px)',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.12), 0 4px 15px rgba(0, 0, 0, 0.08)',
    borderRadius: '12px',
    transition: 'transform 0.3s ease, background-color 0.3s ease',
    textAlign: 'left',
  };

  // State for hover effect
  const [hoveredService, setHoveredService] = useState(null);

  // Responsive adjustments
  const responsiveServiceTagStyle = (isHovered) => ({
    ...serviceTagBaseStyle,
    transform: isHovered ? 'scale(1.1)' : 'scale(1)',
    backgroundColor: isHovered ? '#f38a00' : '#ffffff',
    color: isHovered ? '#fff' : '#333',
    width: '100%', // Mobile view
    maxWidth: '300px',
    margin: '0 auto',
  });

  const responsiveServicesStyle = {
    ...servicesStyle,
    flexDirection: 'column', // Stack on smaller screens
    alignItems: 'center',
  };

  return (
    <section id="about" style={sectionStyle}>
      <div style={containerStyle}>
        {/* About Section */}
        <div style={blockStyle}>
          <h2 style={headingStyle}>About KeyKoders</h2>
          <p style={paragraphStyle}>
            KeyKoders is a software development company committed to delivering top-notch web solutions.
            We take pride in offering innovative and scalable services, providing customized technology solutions for businesses worldwide.
          </p>
        </div>

        {/* Vision Section */}
        <div style={blockStyle}>
          <h3 style={subheadingStyle}>Our Vision</h3>
          <p style={paragraphStyle}>
            Our vision is to be a global leader in providing transformative and innovative technology solutions
            that empower businesses and enhance their potential for growth and success.
          </p>
        </div>

        {/* Mission Section */}
        <div style={blockStyle}>
          <h3 style={subheadingStyle}>Our Mission</h3>
          <p style={paragraphStyle}>
            At KeyKoders, we believe in turning ideas into reality. Our mission is to develop solutions that not only meet the current technological needs of businesses but also anticipate future trends and advancements.
          </p>
        </div>

        {/* Services Section */}
        <div style={{ ...blockStyle, marginTop: '40px' }}>
          <h3 style={subheadingStyle}>Our Services</h3>
          <div
            style={
              window.innerWidth < 768 ? responsiveServicesStyle : servicesStyle
            }
          >
            {['Digital Marketing', 'Home Automation', 'Power BI Projects', 'IoT (Internet of Things)', 'IIoT (Industrial IoT)'].map((service, index) => {
              const isHovered = hoveredService === index;
              return (
                <div
                  key={index}
                  style={
                    window.innerWidth < 768
                      ? responsiveServiceTagStyle(isHovered)
                      : {
                          ...serviceTagBaseStyle,
                          transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                          backgroundColor: isHovered ? '#f38a00' : '#ffffff',
                          color: isHovered ? '#fff' : '#333',
                        }
                  }
                  onMouseEnter={() => setHoveredService(index)}
                  onMouseLeave={() => setHoveredService(null)}
                >
                  <h4
                    style={{
                      fontSize: '1.6rem',
                      fontWeight: 'bold',
                      marginBottom: '10px',
                    }}
                  >
                    {service}
                  </h4>
                  <p style={paragraphStyle}>
                    {service === 'Digital Marketing' &&
                      'Boost your online presence with data-driven strategies, covering SEO, social media, and more.'}
                    {service === 'Home Automation' &&
                      'Transform your living spaces with intelligent automation and smart device integration.'}
                    {service === 'Power BI Projects' &&
                      'Unlock powerful data insights with custom Power BI dashboards and analytics.'}
                    {service === 'IoT (Internet of Things)' &&
                      'Connect devices and enhance your business operations with IoT solutions.'}
                    {service === 'IIoT (Industrial IoT)' &&
                      'Optimize industrial processes with IIoT to improve efficiency, safety, and reduce costs.'}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
