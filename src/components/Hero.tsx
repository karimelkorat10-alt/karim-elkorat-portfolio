import { motion } from 'motion/react';
import { FileText, ArrowDown, Sparkles, ShieldCheck, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../data';

export default function Hero() {
  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elRect = el.getBoundingClientRect().top;
      const position = elRect - bodyRect - offset;
      window.scrollTo({ top: position, behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero"
      className="relative min-h-screen pt-24 pb-16 md:pt-32 md:pb-24 flex items-center overflow-hidden bg-gradient-to-b from-indigo-50/20 via-white to-slate-50"
    >
      {/* Background Graphic Accents */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Decorative Blur Circles */}
      <div className="absolute top-1/4 left-1/10 w-72 h-72 rounded-full bg-indigo-200/20 blur-3xl pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 rounded-full bg-slate-100/40 blur-3xl pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-1.5 px-3 py-1 bg-indigo-50 border border-indigo-100 text-indigo-700 rounded-full text-xs font-semibold font-mono uppercase tracking-wider shadow-sm"
              id="hero-badge"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Microsoft PL-300 Certified</span>
            </motion.div>

            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-display text-slate-950 tracking-tight leading-tight"
                id="hero-title"
              >
                Hi, I'm <span className="text-indigo-600 relative inline-block">
                  {PERSONAL_INFO.name}
                </span>
                <span className="block text-2xl sm:text-3xl md:text-4xl mt-3 font-semibold text-slate-700 font-sans tracking-normal font-normal">
                  Professional {PERSONAL_INFO.title}
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 font-sans leading-relaxed"
                id="hero-description"
              >
                {PERSONAL_INFO.subTitle}. I clean dirty data, engineer optimized Star-Schema models, write complex DAX calculations, and build intuitive reports that recruiters and businesses love.
              </motion.p>
            </div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
              id="hero-actions"
            >
              <button
                onClick={() => scrollToId('projects')}
                className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl shadow-sm transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer border border-indigo-600"
                id="hero-btn-explore"
              >
                <span>View Analytics Projects</span>
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </button>
              
              <button
                onClick={() => scrollToId('explorer')}
                className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-slate-50 text-slate-800 hover:text-indigo-600 border border-slate-200 hover:border-indigo-300 font-medium rounded-xl shadow-sm transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
                id="hero-btn-interactive"
              >
                <span>Try Live Dashboard Demo</span>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
              </button>
            </motion.div>

            {/* Value Trust Statement */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="pt-2 flex items-center justify-center lg:justify-start space-x-2 text-xs text-slate-500 font-medium"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>ATS-Optimized Content • Solid B2 Upper-Intermediate Professional English</span>
            </motion.div>
          </div>

          {/* Hero Right Content (Bento Visual Cards or Metrics) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none">
              
              {/* Card Container Grid */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
                {PERSONAL_INFO.summaryCards.map((card, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                    className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-all group flex items-start space-x-4"
                    id={`hero-stat-card-${idx}`}
                  >
                    <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                      <span className="text-xl font-bold font-mono">0{idx + 1}</span>
                    </div>
                    <div>
                      <span className="block text-3xl font-extrabold font-display text-slate-900 tracking-tight">
                        {card.value}
                      </span>
                      <span className="block text-sm font-semibold text-slate-800 mt-1">
                        {card.label}
                      </span>
                      <span className="block text-xs text-slate-500 mt-0.5 font-sans leading-normal">
                        {card.description}
                      </span>
                    </div>
                  </motion.div>
                ))}

                {/* Microsoft Verification Micro-Card */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="bg-indigo-900 border border-indigo-950 p-6 rounded-xl shadow-md flex items-center justify-between sm:col-span-2 lg:col-span-1"
                  id="hero-micro-card"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono tracking-widest text-indigo-300 uppercase font-semibold">Credential Badge</span>
                    <h3 className="text-sm font-bold text-white font-display">Microsoft Certified</h3>
                    <p className="text-xs text-indigo-200">Power BI Associate PL-300</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z"/>
                    </svg>
                  </div>
                </motion.div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
