"use client";
import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto'; // Using auto for simpler imports

// Component for the main application
const App = () => {
  // Resume Data
  const resumeData = {
    name: "Aishvarya Tiwari",
    title: "Senior UI/Frontend Developer",
    specialties: "Angular | React | TypeScript",
    contact: {
      phone: "+91-9986896759",
      email: "aishvaryatiwari123@gmail.com",
      linkedin: "https://linkedin.com/in/aishvaryatiwari16",
      github: "https://github.com/aishvarya779",
      portfolio: "[Your Personal Portfolio Website URL, if you have one]",
      location: "Gurgaon, India"
    },
    summary: "Highly accomplished Senior Web/UI Developer with 8+ years of extensive experience specializing in Angular, React, NextJS, JavaScript, HTML5, CSS3, and TypeScript. Proven expertise in designing, developing, and deploying scalable, user-centric front-end applications that prioritize intuitive user experiences. Adept at leveraging modern front-end frameworks, UI libraries (Angular Material, ShadCN), and state management (NGRX, RXJS). Committed to Agile/Scrum methodologies, efficient code practices, and continuous learning to solve complex UI/UX challenges. Possessing foundational knowledge in Node.js backend solutions and cross-platform mobile development with Ionic, I bring a well-rounded perspective to complex projects.",
    skills: {
      frontend: {
        labels: ['Angular', 'ReactJS', 'NextJS', 'JavaScript', 'TypeScript'],
        data: [95, 85, 75, 95, 90]
      },
      ecosystem: {
        labels: ['HTML5/CSS3', 'UI Libraries', 'Testing (Jasmine/Jest)', 'Node.js (Foundational)', 'Ionic Framework', 'Git', 'Cloud (Azure/GCP)'],
        data: [95, 90, 80, 70, 80, 95, 75]
      },
      categorized: {
        "Frontend Frameworks": ["Angular", "ReactJS", "NextJS"],
        "Languages": ["JavaScript", "TypeScript", "HTML5", "CSS3"],
        "State Management": ["NGRX", "RXJS"],
        "UI Libraries/Styling": ["Angular Material", "Flexbox", "Bootstrap", "ShadCN", "Tailwind CSS"],
        "Testing Frameworks": ["Jasmine", "Karma", "Jest"],
        "Backend Concepts": ["NodeJS (foundational)", "Restful API development"],
        "Mobile Development": ["Ionic Framework"],
        "Cloud Platforms": ["Azure", "GCP"],
        "Tools & Methodologies": ["CoPilot", "Google Gemini", "Git", "Visual Studio Code", "Agile (Scrum)", "Progressive Web Applications (PWA)", "Single Page Applications (SPA)"]
      }
    },
    experience: [
      {
        company: 'GlobalLogic, Gurgaon',
        role: 'Associate Consultant',
        period: 'August 2020 – Present',
        points: [
          'Led front-end development for a large-scale healthcare application focused on pet care, utilizing Angular and NGRX for complex state management, enhancing overall UI/UX.',
          'Collaborated closely with backend (.NET) and Azure cloud teams to integrate robust APIs, ensuring seamless data flow and optimal front-end application functionality.',
          'Contributed significantly to the delivery of high-quality, user-centric features within an Agile/Scrum development environment.'
        ]
      },
      {
        company: 'Sapient Consulting Pvt. Ltd., Bangalore',
        role: 'Sr. Associate Experience Technology L1',
        period: 'August 2019 – July 2020',
        points: [
          'Developed enterprise-grade web applications for diverse domains including E-commerce and Banking, with a strong focus on intuitive user interfaces for reward management systems.',
          'Contributed to critical front-end architecture and implementation, ensuring application stability and responsiveness across various platforms.'
        ]
      },
      {
        company: 'Appiness Interactive Pvt. Ltd., Bangalore',
        role: 'Software Developer',
        period: 'November 2018 – August 2019',
        points: [
          'Developed intuitive user interfaces for a Cloud Database Manager (DM) platform, significantly enhancing usability and simplifying cluster database management for end-users.',
          'Integrated real-time monitoring and diagnostic features, enabling users to efficiently track database health and receive alerts for issues.'
        ]
      },
      {
        company: 'Octrax Systems Pvt. Ltd., Bangalore',
        role: 'Software Engineer',
        period: 'April 2016 – November 2018',
        points: [
          'Developed and maintained responsive web applications, and engineered mobile solutions across multiple verticals including Finance, Pet Care Management, and Food Delivery.',
          'Built a full-featured mobile application using the Ionic framework, enhancing user ordering experience and operational efficiency through effective UI design.'
        ]
      },
      {
        company: 'Aramies Web Solutions., Delhi',
        role: 'Software Engineer',
        period: 'February 2014 – March 2016',
        points: [
          'Developed and maintained user interfaces for an e-commerce platform and its associated admin dashboard using HTML, CSS, and JavaScript.',
          'Ensured cross-browser compatibility and optimized front-end performance for improved user engagement.',
          'Utilized Git for version control in a collaborative development environment.'
        ]
      }
    ],
    projects: [
      {
        name: "[Project Name 1]",
        description: "[Brief description: e.g., Developed a responsive SaaS dashboard for data visualization.]",
        technologies: "[ReactJS, NextJS, ShadCN, D3.js (if applicable), etc.]",
        contributions: "[Your specific role and key UI features developed, e.g., Designed and implemented interactive data tables, created custom chart components for key metrics, optimized rendering performance.]",
        liveDemo: "#", // Replace with actual link
        github: "#" // Replace with actual link
      },
      {
        name: "[Project Name 2]",
        description: "[Brief description: e.g., Revamped a client-facing portal focusing on accessibility and modern UI practices.]",
        technologies: "[Angular, TypeScript, Angular Material, Jest, Restful APIs]",
        contributions: "[Your specific role and key UI features developed, e.g., Led the migration of legacy UI components to Angular Material, ensured WCAG compliance, integrated with new backend APIs.]",
        liveDemo: "#", // Replace with actual link
        github: "#" // Replace with actual link
      }
    ],
    education: [
      { degree: "B. Tech", institution: "PSIT, Kanpur", date: "June 2010", score: "71%" },
      { degree: "HSC", institution: "BNSD, Kanpur", date: "June 2005", score: "71%" },
      { degree: "SSC", institution: "SVM, Kanpur", date: "June 2003", score: "74%" }
    ]
  };

  // State for expanded timeline items
  const [expandedItem, setExpandedItem] = useState<number | null>(null);

  // Refs for Chart.js canvases
  const frontendChartRef = useRef(null);
  const ecosystemChartRef = useRef(null);
  const frontendChartInstance = useRef<Chart | null>(null);
  const ecosystemChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    // Destroy existing chart instances before creating new ones
    if (frontendChartInstance.current) frontendChartInstance.current.destroy();
    if (ecosystemChartInstance.current) ecosystemChartInstance.current.destroy();

    const chartBaseOptions = {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#1e293b', // slate-900 for dark tooltip background
          titleFont: { size: 14, weight: 'bold' },
          bodyFont: { size: 12 },
          callbacks: {
            label: function (context: any) {
              return `${context.label}: ${context.raw}% proficiency`;
            }
          }
        }
      },
      scales: {
        x: {
          beginAtZero: true,
          max: 100,
          grid: { display: false, drawBorder: false },
          ticks: { display: false }
        },
        y: {
          grid: { display: false, drawBorder: false },
          ticks: {
            font: { size: 14, weight: '500' },
            color: '#334155', // slate-700
            callback: function (value: string | number, index: number, ticks: any, context: any) {
              const label = context.chart.getLabelForValue(value);
              // Wrap labels longer than 16 characters
              if (label.length > 16) {
                return label.split(' ').map((word: string, i: number) => i % 2 === 0 ? word : word + '\n');
              }
              return label;
            }
          }
        }
      }
    };

    // Frontend Skills Chart
    if (frontendChartRef.current) {
      frontendChartInstance.current = new Chart(frontendChartRef.current, {
        type: 'bar',
        data: {
          labels: resumeData.skills.frontend.labels,
          datasets: [{
            label: 'Proficiency',
            data: resumeData.skills.frontend.data,
            backgroundColor: 'rgba(66, 153, 225, 0.8)', // Tailwind blue-500 with alpha
            borderColor: 'rgba(49, 130, 206, 1)', // Tailwind blue-600
            borderWidth: 1,
            borderRadius: 4
          }]
        },
        options: chartBaseOptions as any
      });
    }

    // Ecosystem Skills Chart
    if (ecosystemChartRef.current) {
      ecosystemChartInstance.current = new Chart(ecosystemChartRef.current, {
        type: 'bar',
        data: {
          labels: resumeData.skills.ecosystem.labels,
          datasets: [{
            label: 'Proficiency',
            data: resumeData.skills.ecosystem.data,
            backgroundColor: 'rgba(72, 187, 120, 0.8)', // Tailwind green-500 with alpha
            borderColor: 'rgba(56, 161, 105, 1)', // Tailwind green-600
            borderWidth: 1,
            borderRadius: 4
          }]
        },
        options: chartBaseOptions as any
      });
    }

    // Cleanup on component unmount
    return () => {
      if (frontendChartInstance.current) frontendChartInstance.current.destroy();
      if (ecosystemChartInstance.current) ecosystemChartInstance.current.destroy();
    };
  }, []);

  const handleTimelineClick = (index: number | null) => {
    setExpandedItem(expandedItem === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-700">
      {/* Tailwind CSS CDN script is assumed to be loaded in the head outside of React context for canvas environment */}

      {/* Sticky Navigation */}
      <header className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-50">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-bold text-gray-900">
            {resumeData.name}
          </div>
          <div className="hidden md:flex space-x-8 text-gray-700">
            <a href="#summary" className="hover:text-blue-600 transition-colors font-semibold">Summary</a>
            <a href="#skills" className="hover:text-blue-600 transition-colors font-semibold">Skills</a>
            <a href="#experience" className="hover:text-blue-600 transition-colors font-semibold">Experience</a>
            <a href="#projects" className="hover:text-blue-600 transition-colors font-semibold">Projects</a>
            <a href="#education" className="hover:text-blue-600 transition-colors font-semibold">Education</a>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-12">

        {/* Hero Section */}
        <section id="hero" className="text-center py-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900">{resumeData.name}</h1>
          <p className="text-2xl mt-4 text-blue-600 font-extrabold">{resumeData.title}</p>
          <p className="text-xl text-gray-600 font-medium">{resumeData.specialties}</p>
          <div className="mt-8 flex justify-center space-x-6 text-2xl">
            <a href={`mailto:${resumeData.contact.email}`} className="text-blue-600 hover:text-blue-700 transition-colors transform hover:scale-110" title="Email">
              <span>&#9993;</span>
            </a>
            <a href={resumeData.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 transition-colors transform hover:scale-110" title="LinkedIn">
              <span>&#x1F464;</span>
            </a>
            <a href={resumeData.contact.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 transition-colors transform hover:scale-110" title="GitHub">
              <span>&#128187;</span>
            </a>
          </div>
        </section>

        {/* Professional Summary Section */}
        <section id="summary" className="py-12 scroll-mt-20">
          <h2 className="text-3xl font-bold text-center border-b-4 border-blue-500 pb-2 mb-8 inline-block text-gray-800">Professional Summary</h2>
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto border border-gray-100">
            <p className="text-lg leading-relaxed text-gray-700">
              {resumeData.summary}
            </p>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-12 scroll-mt-20">
          <h2 className="text-3xl font-bold text-center border-b-4 border-blue-500 pb-2 mb-8 inline-block text-gray-800">Technical Skills</h2>
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-lg max-w-4xl mx-auto border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Frontend Core</h3>
              <div className="chart-container">
                <canvas ref={frontendChartRef}></canvas>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg max-w-4xl mx-auto border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Development Ecosystem</h3>
              <div className="chart-container">
                <canvas ref={ecosystemChartRef}></canvas>
              </div>
            </div>
          </div>
        </section>

        {/* Work Experience Section */}
        <section id="experience" className="py-12 scroll-mt-20">
          <h2 className="text-3xl font-bold text-center border-b-4 border-blue-500 pb-2 mb-8 inline-block text-gray-800">Work Experience</h2>
          <div className="timeline-container">
            <div className="timeline-line"></div>
            {resumeData.experience.map((job, index) => (
              <div key={index} className={`timeline-item ${index % 2 === 0 ? 'md:self-start' : 'md:self-end'} ${expandedItem === index ? 'active' : ''} relative`}>
                <div className="timeline-dot"></div>
                <div className={`timeline-content-wrapper max-w-md ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`} onClick={() => handleTimelineClick(index)}>
                  <p className="text-sm text-gray-500">{job.period}</p>
                  <h3 className="text-lg font-bold text-gray-800 mt-1">{job.role}</h3>
                  <p className="text-md font-semibold text-blue-600">{job.company}</p>
                  <div className="timeline-details text-left">
                    <ul className="list-disc list-inside text-gray-700 mt-4 space-y-2 text-sm">
                      {job.points.map((point, pIdx) => (
                        <li key={pIdx}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-12 scroll-mt-20">
          <h2 className="text-3xl font-bold text-center border-b-4 border-blue-500 pb-2 mb-8 inline-block text-gray-800">Projects</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {resumeData.projects.map((project, index) => (
              <div key={index} className="card border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800">{project.name}</h3>
                <p className="mt-2 text-gray-700">{project.description}</p>
                <p className="mt-4 text-sm font-medium text-gray-500">Technologies: {project.technologies}</p>
                <ul className="list-disc list-inside text-gray-700 mt-2 text-sm">
                  <li><strong>Contributions:</strong> {project.contributions}</li>
                </ul>
                <div className="mt-4 flex space-x-4">
                  <a href={project.liveDemo} className="text-blue-600 hover:text-blue-700 font-semibold transform hover:scale-105" target="_blank" rel="noopener noreferrer">Live Demo &rarr;</a>
                  <a href={project.github} className="text-blue-600 hover:text-blue-700 font-semibold transform hover:scale-105" target="_blank" rel="noopener noreferrer">GitHub &rarr;</a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="py-12 scroll-mt-20">
          <h2 className="text-3xl font-bold text-center border-b-4 border-blue-500 pb-2 mb-8 inline-block text-gray-800">Education</h2>
          <div className="card max-w-xl mx-auto text-center border border-gray-100">
            {resumeData.education.map((edu, index) => (
              <div key={index} className={index < resumeData.education.length - 1 ? 'mb-4' : ''}>
                <h3 className="text-xl font-bold text-gray-800">{edu.degree}</h3>
                <p className="text-gray-700">{edu.institution} - {edu.date}</p>
                <p className="text-sm text-gray-500">Score: {edu.score}</p>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-6 mt-12">
        <p>&copy; 2025 Aishvarya Tiwari. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
