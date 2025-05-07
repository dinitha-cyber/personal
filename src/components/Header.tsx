import React, { useEffect, useState } from 'react';
import { Github, Linkedin, Menu, X } from 'lucide-react';
import TypedText from './TypedText';
import '../styles/Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className="header">
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container nav-container">
          <div className="logo" onClick={() => scrollToSection('hero')}>
            DS
          </div>
          <div className="desktop-nav">
            <ul className="nav-links">
              <li onClick={() => scrollToSection('about')}>About</li>
              <li onClick={() => scrollToSection('skills')}>Skills</li>
              <li onClick={() => scrollToSection('contact')}>Contact</li>
            </ul>
          </div>
          <div className="mobile-menu-button" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <ul className="mobile-nav-links">
            <li onClick={() => scrollToSection('about')}>About</li>
            <li onClick={() => scrollToSection('skills')}>Skills</li>
            <li onClick={() => scrollToSection('contact')}>Contact</li>
          </ul>
        </div>
      )}

      <section id="hero" className="hero">
        <div className="container hero-container">
          <div className="hero-content">
            <div className="profile-image-container">
              <div className="profile-image">
                {/* Placeholder for profile image */}
                <div className="profile-placeholder">DS</div>
              </div>
            </div>
            <h1 className="name">Dinitha Serasinghe</h1>
            <div className="title">
              <TypedText texts={['Cybersecurity Engineer', 'Penetration Tester', 'Security Analyst']} />
            </div>
            <p className="tagline">Securing Digital Frontiers | Recent Plymouth University Graduate</p>
            <div className="social-links">
              <a href="https://github.com/dinitha-cyber" target="_blank" rel="noopener noreferrer" className="social-icon">
                <Github size={24} />
              </a>
              <a href="https://linkedin.com/in/dinitha123" target="_blank" rel="noopener noreferrer" className="social-icon">
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </header>
  );
};

export default Header;