import React, { useState, useEffect } from 'react';
import './App.css';
import faceshot from './images/faceshot.jpg'; // Import the image
import githubLogo from './images/github.png';
import linkedInLogo from './images/linkedIn.png';

function App() {

	const [activeSection, setActiveSection] = useState('top'); // Initialize with 'top' for the Home link

  // Function to scroll to the top of the page or a specific section
	const scrollToSection = (event, sectionId) => {
    event.preventDefault();

    if (sectionId === 'top') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } else {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }
  };

	useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section'); // Get all section elements
      const scrollPos = window.scrollY; // Current scroll position
      const windowHeight = window.innerHeight; // Height of the viewport
      const documentHeight = document.body.offsetHeight; // Total height of the document
      const offset = 50; // Offset to check above the section

      // Check if scrolled to the top
      if (scrollPos < 500) {
        setActiveSection('top'); // Set active section to 'top' (Home)
        return;
      }
			
      // Check if scrolled to the bottom
      if (scrollPos + windowHeight >= documentHeight -20) {
        setActiveSection('contact'); // Set active section to 'contact'
        return;
      }

			else {
				// Check which section is currently in view
				sections.forEach((section) => {
					const sectionTop = section.offsetTop; // Section top position
					const sectionHeight = section.offsetHeight; // Section height
	
					// Check if the current scroll position is within the section with offset
					if (scrollPos + offset >= sectionTop && scrollPos < sectionTop + sectionHeight) {
						setActiveSection(section.id); // Update active section
					}
				});
			}


    };

    window.addEventListener('scroll', handleScroll); // Add scroll event listener

    return () => {
      window.removeEventListener('scroll', handleScroll); // Clean up on unmount
    };
  }, []);

  return (
    <div className="App">
       <header>
        <nav className="navbar">
          <ul className="nav-links centered">
					<li>
							<a href="#" onClick={(e) => scrollToSection(e, 'top')} className={activeSection === 'top' ? 'active' : ''}>Home</a>
					</li>
					<li>
							<a href="#desc" onClick={(e) => scrollToSection(e, 'desc')} className={activeSection === 'desc' ? 'active' : ''}>Description</a>
					</li>
					<li>
							<a href="#documentation" onClick={(e) => scrollToSection(e, 'documentation')} className={activeSection === 'documentation' ? 'active' : ''}>Documentation</a>
					</li>
					<li>
							<a href="#machineLearning" onClick={(e) => scrollToSection(e, 'machineLearning')} className={activeSection === 'machineLearning' ? 'active' : ''}>Machine Learning</a>
					</li>
					<li>
							<a href="#projects" onClick={(e) => scrollToSection(e, 'projects')} className={activeSection === 'projects' ? 'active' : ''}>Projects</a>
					</li>
					<li>
							<a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className={activeSection === 'contact' ? 'active' : ''}>Contact</a>
					</li>
          </ul>
        </nav>
      </header>

      <main>
			<section className="main-section">
				<section id="profile" className="profile-section">
					{/* <img src={faceshot} alt="Profile" className="profile-image" /> */}
					<div className="profile-content">
						<h1 className="welcome-message">Welcome</h1>
						<p className="job-description">
							Hi, my name is Tomas Smitas. I am a Full Stack Software Developer & Data Scientist.
						</p>
						<p className="job-description">
								<a 
										href="#desc" 
										className="scroll-link" 
										id="scroll-link" 
										onClick={(e) => scrollToSection(e, 'desc')} // Call the scroll function with 'desc'
								>
										Scroll down for more
								</a>
						</p>
					</div>
				</section>
        <section id="desc">
					<h2>Project Summary</h2>
          <p>This project aims to enhance safety and compliance on construction sites by using AI to monitor workers and ensure they are wearing essential safety gear, such as helmets and high-visibility jackets, at all times. The system leverages real-time video feeds, which are processed by an object detection model based on YOLO (You Only Look Once), a high-performance deep learning model for image recognition and object detection.</p>
						
					<p>The solution is designed to automatically detect personnel within the camera’s view, assess whether they are equipped with the required safety attire, and alert supervisors if any safety violations are detected. By integrating OpenCV for live video processing, Flask for backend web infrastructure, and React for the user interface, the system provides a seamless and user-friendly experience.</p>

					<h3>Features:</h3>
					<ul>
							<li><strong>Real-Time Detection:</strong> Continuously monitors video streams to detect workers and assess safety compliance.</li><br></br>
							<li><strong>Automated Alerts:</strong> Utilises SMTP to send email alerts to designated safety personnel when safety violations are identified.</li><br></br>
							<li><strong>Data Logging and Reporting:</strong> Logs incidents and generates reports, using SQLite, to provide insights on compliance patterns and areas for safety improvement.</li><br></br>
							<li><strong>Scalability:</strong> Deployed on cloud platforms (e.g., Google Colab) for high processing power, allowing for scaling and multi-camera support.</li>
					</ul>

					<h3>Technologies:</h3>
					<ul>
							<li><strong>Machine Learning/AI:</strong> YOLOv11 , Ultralytics</li><br></br>
							<li><strong>Video Processing:</strong> OpenCV</li><br></br>
							<li><strong>Web Framework:</strong> Flask (backend), React (frontend)</li><br></br>
							<li><strong>Database:</strong> SQLite</li><br></br>
							<li><strong>Alerts:</strong> SMTP for email notifications</li>
					</ul>

					<p>This AI-powered monitoring system offers a proactive approach to safety, reducing human error and ensuring compliance with safety regulations, ultimately helping to create a safer construction environment.</p>

        </section>

        <section id="documentation">
						<h2>Documentation</h2>
						
						<div className="button-container">
								<button onClick={() => window.location.href='path/to/specifications.pdf'} download="Specifications.pdf">
										<img src="path/to/specifications-icon.png" alt="Specifications Icon" />
										Download Specifications
								</button>
								
								<button onClick={() => window.location.href='path/to/poster.pdf'} download="Poster.pdf">
										<img src="path/to/poster-icon.png" alt="Poster Icon" />
										Download Poster
								</button>
								
								<button onClick={() => window.location.href='path/to/design.pdf'} download="Design.pdf">
										<img src="path/to/design-icon.png" alt="Design Icon" />
										Download Design
								</button>
						</div>
				</section>

				<section id="machineLearning">
    
        </section>
			</section>
      </main>
      <footer>
        <section id="contact">
        <p>Contact Information:</p>
        <p>Email: <a href="mailto:tomassmitas@yahoo.com">tomassmitas@yahoo.com</a></p>
        <p>Phone: 083 358 8363</p>
        <div className="social-media-linear">
          <a href="https://github.com/C00276177Tomas" target="_blank" rel="noopener noreferrer">
            <img src={githubLogo} alt="GitHub" className="social-logo-linear" />
          </a>
          <a href="https://www.linkedin.com/in/tomas-smitas-a43aa2104/" target="_blank" rel="noopener noreferrer">
            <img src={linkedInLogo} alt="GitHub" className="social-logo-linear" />
          </a>
        </div>
        </section>
      </footer>
    </div>
  );
}

export default App;