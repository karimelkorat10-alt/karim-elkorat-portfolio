import { motion } from 'motion/react';
import { Target, CheckCircle, Lightbulb, Users, GraduationCap } from 'lucide-react';
import { PERSONAL_INFO, EDUCATION } from '../data';

const PRINCIPLES = [
  {
    icon: CheckCircle,
    title: 'Data Integrity First',
    description: 'I believe accurate findings start with spotless cleaning. I build rigorous Power Query and Excel verification steps so that stakeholders can trust every decimal point.',
    color: 'border-emerald-200 bg-emerald-50/50 text-emerald-700'
  },
  {
    icon: Target,
    title: 'Business-Driven KPIs',
    description: 'Data is useless without business context. I connect dashboards directly to financial and operational targets, ensuring every chart helps drive real decisions.',
    color: 'border-indigo-200 bg-indigo-50/50 text-indigo-700'
  },
  {
    icon: Lightbulb,
    title: 'Visual Simplicity',
    description: 'Clutter is the enemy of understanding. I design clean, minimalist dashboard layouts with structured hierarchies so stakeholders understand reports in under 5 seconds.',
    color: 'border-amber-200 bg-amber-50/50 text-amber-700'
  },
  {
    icon: Users,
    title: 'Clear Communication',
    description: 'As a B2 English speaker, I focus on presenting insights simply and clearly, avoiding unnecessary jargon and explaining data in practical business terms.',
    color: 'border-violet-200 bg-violet-50/50 text-violet-700'
  }
];

export default function About() {
  return (
    <section id="about" className="py-20 md:py-28 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono font-bold text-indigo-600 uppercase tracking-widest block">
            Profile & Values
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold font-display text-slate-900 tracking-tight">
            About Me
          </h2>
          <div className="h-1 w-12 bg-indigo-600 mx-auto rounded-full"></div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Block: Bio Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight font-display">
              Who is Karim Elkorat?
            </h3>
            
            <p className="text-slate-600 leading-relaxed text-sm md:text-base">
              {PERSONAL_INFO.about}
            </p>

            <p className="text-slate-600 leading-relaxed text-sm md:text-base">
              I love turning complex datasets from multiple departments (like Sales, Finance, or Human Resources) into structured, visual assets. I understand the importance of star-schema structures, standard relationships, and robust DAX calculations. My ultimate goal is to remove manual reporting fatigue and replace it with automated, real-time insights.
            </p>

            {/* Micro-Highlight: Education integrated into About for a dense, recruiter-friendly reading experience */}
            <div className="p-5 bg-slate-50 rounded-xl border border-slate-150 space-y-3 mt-8">
              <div className="flex items-center space-x-2.5 text-slate-900">
                <GraduationCap className="w-5 h-5 text-indigo-600" />
                <h4 className="font-bold text-sm md:text-base font-display">Educational Background</h4>
              </div>
              <div>
                <span className="block text-sm font-bold text-slate-800">{EDUCATION.degree}</span>
                <span className="block text-xs text-slate-500 mt-0.5">{EDUCATION.institution} • {EDUCATION.duration}</span>
              </div>
              <ul className="space-y-1.5 pt-1.5">
                {EDUCATION.details.slice(0, 2).map((detail, idx) => (
                  <li key={idx} className="text-xs text-slate-600 flex items-start space-x-1.5">
                    <span className="text-indigo-600 font-semibold">•</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Block: Core Professional Principles */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight font-display">
              My Core Analytical Principles
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PRINCIPLES.map((principle, index) => {
                const IconComponent = principle.icon;
                return (
                  <div
                    key={index}
                    className="p-5 bg-white border border-slate-100 rounded-xl shadow-xs space-y-3 hover:shadow-sm hover:border-slate-200 transition-all"
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${principle.color}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-slate-900 text-sm font-display">{principle.title}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">{principle.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
