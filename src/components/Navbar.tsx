import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, BarChart3, Mail, FileText } from 'lucide-react';
import { PERSONAL_INFO } from '../data';

const NAV_ITEMS = [
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Interactive Demo', id: 'explorer' },
  { label: 'Projects', id: 'projects' },
  { label: 'Experience', id: 'experience' },
  { label: 'Certificates', id: 'certifications' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Simple intersection observer behavior for active navigation item
      const sections = ['about', 'skills', 'explorer', 'projects', 'experience', 'certifications', 'contact'];
      const scrollPosition = window.scrollY + 150;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-sm border-b border-slate-100 dark:border-slate-800'
          : 'bg-transparent'
      }`}
      id="navbar"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo / Brand Name */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center space-x-2 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-brand-600 flex items-center justify-center text-white shadow-md shadow-brand-500/15 group-hover:bg-brand-500 transition-colors">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-bold font-display tracking-tight text-slate-900 group-hover:text-brand-600 transition-colors">
                {PERSONAL_INFO.name}
              </span>
              <span className="block text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                {PERSONAL_INFO.title}
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? 'text-brand-600 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
                id={`nav-link-${item.id}`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-2 right-2 h-[2px] bg-brand-600 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Call-to-Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <button
              onClick={() => scrollToSection('contact')}
              className="flex items-center space-x-1.5 px-4 py-2 bg-slate-900 hover:bg-brand-600 text-white text-xs font-semibold uppercase tracking-wider rounded-lg shadow-sm transition-all duration-300 cursor-pointer"
              id="cta-contact-nav"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Hire Karim</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-950 focus:outline-none"
              aria-label="Toggle Menu"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-100 shadow-lg"
          >
            <div className="px-4 pt-2 pb-6 space-y-1.5">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left px-4 py-3 rounded-lg text-base font-medium ${
                    activeSection === item.id
                      ? 'bg-brand-50 text-brand-600 font-semibold border-l-4 border-brand-600'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                  id={`mobile-nav-link-${item.id}`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
                <button
                  onClick={() => scrollToSection('contact')}
                  className="flex items-center justify-center space-x-2 w-full px-4 py-3 bg-brand-600 text-white rounded-lg text-sm font-semibold hover:bg-brand-700 transition-all cursor-pointer"
                  id="mobile-nav-contact"
                >
                  <Mail className="w-4 h-4" />
                  <span>Get In Touch</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
