import React from 'react';
import Header from './components/Header';
import About from './components/About';
import Skills from './components/Skills';
import Contact from './components/Contact';
import ParticleBackground from './components/ParticleBackground';
import './styles/App.css';

function App() {
  return (
    <div className="app">
      <ParticleBackground />
      <Header />
      <main>
        <About />
        <Skills />
        <Contact />
      </main>
      <footer className="footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Dinitha Serasinghe. All rights reserved.</p>
          <p className="security-note">
            <span className="lock-icon">🔒</span> This site is protected with SSL encryption
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;