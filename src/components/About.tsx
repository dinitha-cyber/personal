import React, { useEffect, useRef } from 'react';
import { Shield, Code, Server, Database, Lock, Globe } from 'lucide-react';
import '../styles/About.css';

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const skills = [
    { name: 'Penetration Testing', percentage: 85 },
    { name: 'Malware Analysis', percentage: 80 },
    { name: 'Network Security', percentage: 90 },
    { name: 'Python', percentage: 75 },
    { name: 'Java', percentage: 70 },
    { name: 'Security Tools', percentage: 85 },
  ];

  return (
    <section id="about" ref={sectionRef} className="about section fade-in">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p>Cybersecurity professional with a strong foundation in protecting digital assets and infrastructure. Recent graduate from Plymouth University with a focus on cybersecurity engineering and ethical hacking.</p>
            
            <ul className="security-bullets">
              <li>
                <Shield className="bullet-icon" size={20} />
                <span>Specialized in penetration testing and vulnerability assessment</span>
              </li>
              <li>
                <Code className="bullet-icon" size={20} />
                <span>Proficient in secure coding practices and software security</span>
              </li>
              <li>
                <Server className="bullet-icon" size={20} />
                <span>Experienced in securing network infrastructure and systems</span>
              </li>
              <li>
                <Database className="bullet-icon" size={20} />
                <span>Skilled in database security and data protection</span>
              </li>
              <li>
                <Lock className="bullet-icon" size={20} />
                <span>Knowledgeable in encryption and authentication systems</span>
              </li>
              <li>
                <Globe className="bullet-icon" size={20} />
                <span>Passionate about web application security</span>
              </li>
            </ul>
          </div>
          
          <div className="skills-progress">
            {skills.map((skill, index) => (
              <div key={index} className="skill">
                <div className="skill-info">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-percentage">{skill.percentage}%</span>
                </div>
                <div className="progress-container">
                  <div 
                    className="progress-bar" 
                    style={{ width: `${skill.percentage}%` }}
                    data-aos-delay={index * 100}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;