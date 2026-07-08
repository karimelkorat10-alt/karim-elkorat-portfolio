import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import CinematicIntro from './components/CinematicIntro';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import DashboardExplorer from './components/DashboardExplorer';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [introComplete, setIntroComplete] = useState(false);
  const [visibleSectionsCount, setVisibleSectionsCount] = useState(-1);

  useEffect(() => {
    if (introComplete) {
      let currentSection = 0;
      const totalSections = 8; // Hero, About, Skills, DashboardExplorer, Projects, Experience, Certifications, Contact
      
      const interval = setInterval(() => {
        if (currentSection < totalSections) {
          setVisibleSectionsCount(currentSection);
          currentSection++;
        } else {
          clearInterval(interval);
        }
      }, 550); // Elegant staggered pace

      return () => clearInterval(interval);
    }
  }, [introComplete]);

  const getSectionStyle = (index: number) => {
    const isRevealed = visibleSectionsCount >= index;
    return {
      opacity: isRevealed ? 1 : 0,
      transform: isRevealed ? 'translateY(0px) scale(1)' : 'translateY(40px) scale(0.985)',
      pointerEvents: isRevealed ? 'auto' as const : 'none' as const,
      transition: 'opacity 1.4s cubic-bezier(0.16, 1, 0.3, 1), transform 1.4s cubic-bezier(0.16, 1, 0.3, 1)',
    };
  };

  return (
    <>
      {/* Luxury Cinematic Sequence Intro */}
      <AnimatePresence mode="wait">
        {!introComplete && (
          <CinematicIntro onComplete={() => setIntroComplete(true)} />
        )}
      </AnimatePresence>

      <div className={`relative min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-brand-100 selection:text-brand-900 overflow-x-hidden transition-opacity duration-1000 ${
        introComplete ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        {/* Dynamic Navigation Bar (Reveals smoothly with Hero) */}
        <div 
          style={{
            opacity: visibleSectionsCount >= 0 ? 1 : 0,
            transform: visibleSectionsCount >= 0 ? 'translateY(0px)' : 'translateY(-20px)',
            transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          className="relative z-50"
        >
          <Navbar />
        </div>

        {/* Main Content Layout Block */}
        <main className="relative z-10">
          
          {/* Typographic Hero Banner Section */}
          <div style={getSectionStyle(0)}>
            <Hero />
          </div>

          {/* Professional Biography Narrative & Principles */}
          <div style={getSectionStyle(1)}>
            <About />
          </div>

          {/* Categorized Skills Inventory & Syntax Showcases */}
          <div style={getSectionStyle(2)}>
            <Skills />
          </div>

          {/* Live Interactive Analytics Dashboard Simulator (Demo) */}
          <div style={getSectionStyle(3)}>
            <DashboardExplorer />
          </div>

          {/* Data Projects Case Studies & Modal Drawer Details */}
          <div style={getSectionStyle(4)}>
            <Projects />
          </div>

          {/* Chronological Work Experience & Technical Achievements */}
          <div style={getSectionStyle(5)}>
            <Experience />
          </div>

          {/* Verified Industry Certifications List */}
          <div style={getSectionStyle(6)}>
            <Certifications />
          </div>

          {/* Recruitment Form & Inquiry Selectors */}
          <div style={getSectionStyle(7)}>
            <Contact />
          </div>

        </main>

        {/* Corporate Professional Footer */}
        <div style={getSectionStyle(7)}>
          <Footer />
        </div>
      </div>
    </>
  );
}

