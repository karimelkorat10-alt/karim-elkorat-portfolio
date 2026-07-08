import { motion } from 'motion/react';
import { Briefcase, Calendar, MapPin, CheckSquare, Sparkles } from 'lucide-react';
import { EXPERIENCES } from '../data';

export default function Experience() {
  return (
    <section id="experience" className="py-20 md:py-28 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono font-bold text-indigo-600 uppercase tracking-widest block">
            Career Timeline
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold font-display text-slate-900 tracking-tight">
            Professional Experience
          </h2>
          <div className="h-1 w-12 bg-indigo-600 mx-auto rounded-full"></div>
          <p className="text-sm text-slate-500 max-w-lg mx-auto">
            Practical business intelligence and data optimization roles, focused on delivering immediate value to business clients and stakeholders.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="max-w-3xl mx-auto relative" id="experience-timeline">
          
          {/* Vertical Center Line */}
          <div className="absolute left-4 sm:left-1/2 top-2 bottom-2 w-[1.5px] bg-slate-200 -translate-x-1/2 hidden sm:block"></div>

          {/* Timeline Items */}
          <div className="space-y-12 sm:space-y-16">
            {EXPERIENCES.map((exp, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: isEven ? -25 : 25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`relative flex flex-col sm:flex-row items-stretch ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                  id={`experience-item-${exp.id}`}
                >
                  
                  {/* Bullet Node on center line */}
                  <div className="absolute left-4 sm:left-1/2 top-6 w-5 h-5 rounded-full bg-white border-4 border-indigo-600 -translate-x-1/2 z-10 hidden sm:block"></div>

                  {/* Spacer for side balance */}
                  <div className="w-full sm:w-1/2 hidden sm:block"></div>

                  {/* Content Card Panel */}
                  <div className="w-full sm:w-[46%] pl-10 sm:pl-0">
                    <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-6 sm:p-8 hover:shadow-md hover:border-slate-300 transition-all space-y-4">
                      
                      {/* Meta Header */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <h3 className="text-lg font-bold text-slate-950 font-display">
                            {exp.role}
                          </h3>
                          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-bold border border-indigo-100 uppercase tracking-tight">
                            {exp.company}
                          </span>
                        </div>

                        {/* Sub headers details */}
                        <div className="flex items-center space-x-4 text-xs text-slate-500 font-medium font-mono flex-wrap gap-y-1">
                          <span className="flex items-center space-x-1">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            <span>{exp.duration}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                            <span>{exp.location}</span>
                          </span>
                        </div>
                      </div>

                      <p className="text-slate-600 text-xs leading-relaxed">
                        {exp.description}
                      </p>

                      {/* Achievements Bullets */}
                      <ul className="space-y-2 pt-1">
                        {exp.bullets.map((bullet, bIdx) => (
                          <li key={bIdx} className="flex items-start space-x-2 text-xs text-slate-600 leading-relaxed">
                            <CheckSquare className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Skills Learned Tag Box */}
                      <div className="pt-3 border-t border-slate-200/60 space-y-1.5">
                        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center space-x-1">
                          <Sparkles className="w-3 h-3 text-indigo-500" />
                          <span>Key Tools Mastered</span>
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {exp.skillsLearned.map((skill) => (
                            <span key={skill} className="px-2 py-0.5 bg-white text-slate-700 text-[9px] font-mono font-bold border border-slate-200 rounded-md">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
