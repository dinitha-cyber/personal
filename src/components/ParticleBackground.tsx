import React, { useEffect, useRef } from 'react';
import '../styles/ParticleBackground.css';

type Particle = {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  alpha: number;
};

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Handle mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY
      };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Create initial particles
    const initParticles = () => {
      particlesRef.current = [];
      const particleCount = Math.floor(canvas.width * canvas.height / 10000);
      
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          alpha: Math.random() * 0.5 + 0.1
        });
      }
    };

    initParticles();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around canvas edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(46, 160, 67, ${particle.alpha})`;
        ctx.fill();
        
        // Connect particles within distance
        connectParticles(particle, index);
      });
      
      // Add matrix-style falling effect for some particles
      matrixEffect();
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const connectParticles = (particle: Particle, index: number) => {
      const distance = 100;
      
      // Connect to mouse if close enough
      const dx = mouseRef.current.x - particle.x;
      const dy = mouseRef.current.y - particle.y;
      const mouseDistance = Math.sqrt(dx * dx + dy * dy);
      
      if (mouseDistance < distance * 2) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(46, 160, 67, ${0.2 * (1 - mouseDistance / (distance * 2))})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
        ctx.stroke();
      }
      
      // Connect to nearby particles
      for (let i = index + 1; i < particlesRef.current.length; i++) {
        const otherParticle = particlesRef.current[i];
        const dx = particle.x - otherParticle.x;
        const dy = particle.y - otherParticle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < distance) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(46, 160, 67, ${0.15 * (1 - dist / distance)})`;
          ctx.lineWidth = 0.3;
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(otherParticle.x, otherParticle.y);
          ctx.stroke();
        }
      }
    };

    // Create matrix-style falling characters effect
    const matrixCharacters: { x: number; y: number; speed: number; character: string; opacity: number }[] = [];
    
    const initMatrixEffect = () => {
      const columns = Math.floor(canvas.width / 20);
      for (let i = 0; i < columns; i++) {
        if (Math.random() > 0.9) { // Only add to some columns for a more natural effect
          matrixCharacters.push({
            x: i * 20,
            y: Math.random() * canvas.height - canvas.height,
            speed: Math.random() * 3 + 1,
            character: String.fromCharCode(Math.floor(Math.random() * 93) + 33),
            opacity: Math.random() * 0.5 + 0.1
          });
        }
      }
    };
    
    initMatrixEffect();
    
    const matrixEffect = () => {
      ctx.font = '14px monospace';
      
      matrixCharacters.forEach((char, index) => {
        char.y += char.speed;
        
        if (Math.random() > 0.98) {
          char.character = String.fromCharCode(Math.floor(Math.random() * 93) + 33);
        }
        
        ctx.fillStyle = `rgba(46, 160, 67, ${char.opacity})`;
        ctx.fillText(char.character, char.x, char.y);
        
        // Reset character when it goes offscreen
        if (char.y > canvas.height) {
          matrixCharacters[index].y = 0;
          matrixCharacters[index].x = Math.floor(Math.random() * canvas.width);
        }
      });
      
      // Add new characters occasionally
      if (Math.random() > 0.95 && matrixCharacters.length < 100) {
        matrixCharacters.push({
          x: Math.random() * canvas.width,
          y: 0,
          speed: Math.random() * 3 + 1,
          character: String.fromCharCode(Math.floor(Math.random() * 93) + 33),
          opacity: Math.random() * 0.5 + 0.1
        });
      }
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-background"></canvas>;
};

export default ParticleBackground;