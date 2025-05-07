import React, { useEffect, useRef } from 'react';
import { 
  Code, Database, Shield, Terminal, Server, Globe, 
  FileCode, Bug, Monitor, Lock, Wifi, Search
} from 'lucide-react';
import '../styles/Skills.css';

type Skill = {
  name: string;
  icon: React.ReactNode;
  category: string;
  proficiency: number;
};

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          
          const hexagons = document.querySelectorAll('.hexagon');
          hexagons.forEach((hexagon, index) => {
            setTimeout(() => {
              hexagon.classList.add('visible');
            }, index * 100);
          });
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

  const skills: Skill[] = [
    { name: 'Python', icon: <Code size={32} />, category: 'Programming', proficiency: 4 },
    { name: 'Java', icon: <FileCode size={32} />, category: 'Programming', proficiency: 3 },
    { name: 'C#', icon: <Code size={32} />, category: 'Programming', proficiency: 3 },
    { name: 'HTML/CSS', icon: <Globe size={32} />, category: 'Web Development', proficiency: 4 },
    { name: 'SQL', icon: <Database size={32} />, category: 'Programming', proficiency: 4 },
    { name: 'React', icon: <Monitor size={32} />, category: 'Web Development', proficiency: 3 },
    { name: 'Penetration Testing', icon: <Bug size={32} />, category: 'Security Tools', proficiency: 5 },
    { name: 'Malware Analysis', icon: <Search size={32} />, category: 'Security Tools', proficiency: 4 },
    { name: 'Network Security', icon: <Wifi size={32} />, category: 'Security Tools', proficiency: 5 },
    { name: 'Encryption', icon: <Lock size={32} />, category: 'Security Tools', proficiency: 4 },
    { name: 'Linux', icon: <Terminal size={32} />, category: 'Security Tools', proficiency: 4 },
    { name: 'Cloud Security', icon: <Server size={32} />, category: 'Security Tools', proficiency: 3 },
  ];

  // Group skills by category
  const categories = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <section id="skills" ref={sectionRef} className="skills section fade-in">
      <div className="container">
        <h2 className="section-title">Technical Skills</h2>
        
        {Object.entries(categories).map(([category, categorySkills]) => (
          <div key={category} className="skill-category">
            <h3 className="category-title">{category}</h3>
            <div className="hexagon-grid">
              {categorySkills.map((skill, index) => (
                <div key={index} className="hexagon-wrapper">
                  <div className="hexagon">
                    <div className="hexagon-content">
                      <div className="skill-icon">{skill.icon}</div>
                      <h4 className="skill-name">{skill.name}</h4>
                      <div className="proficiency-level">
                        {Array(5).fill(0).map((_, i) => (
                          <div 
                            key={i} 
                            className={`proficiency-dot ${i < skill.proficiency ? 'active' : ''}`}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;