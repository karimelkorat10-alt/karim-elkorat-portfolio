import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, ChevronRight, X, BarChart3, Database, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';
import { PROJECTS } from '../data';
import { Project } from '../types';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'KPI':
        return 'bg-violet-50 text-violet-700 border-violet-100';
      case 'SQL':
        return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      default:
        return 'bg-indigo-50 text-indigo-700 border-indigo-100';
    }
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'KPI':
        return <ShieldAlert className="w-4 h-4 text-violet-600" />;
      case 'SQL':
        return <Database className="w-4 h-4 text-emerald-600" />;
      default:
        return <BarChart3 className="w-4 h-4 text-indigo-600" />;
    }
  };

  return (
    <section id="projects" className="py-20 md:py-28 bg-slate-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono font-bold text-indigo-600 uppercase tracking-widest block">
            Portfolio Work
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold font-display text-slate-900 tracking-tight">
            Data Analysis Projects
          </h2>
          <div className="h-1 w-12 bg-indigo-600 mx-auto rounded-full"></div>
          <p className="text-sm text-slate-500 max-w-lg mx-auto">
            Practical, end-to-end analytical case studies designed to answer critical corporate questions. Click on any card to view detailed methodology.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="projects-grid">
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white border border-slate-200/80 rounded-xl overflow-hidden shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between group h-full"
              id={`project-card-${project.id}`}
            >
              
              {/* Upper Section */}
              <div className="p-6 sm:p-8 space-y-5">
                
                {/* Meta Row */}
                <div className="flex items-center justify-between">
                  <div className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold ${getCategoryColor(project.category)}`}>
                    {getCategoryIcon(project.category)}
                    <span>{project.category === 'KPI' ? 'Executive KPI' : project.category === 'SQL' ? 'Rapid Response' : 'Business Intelligence'}</span>
                  </div>
                  <span className="text-xs font-mono text-slate-400 font-bold">
                    {project.date}
                  </span>
                </div>

                {/* Title & Desc */}
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors font-display">
                    {project.title}
                  </h3>
                  {project.company && (
                    <p className="text-xs font-semibold text-slate-500">
                      Client: {project.company}
                    </p>
                  )}
                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>

                {/* Tools Badges */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-2.5 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md text-[10px] font-mono font-bold tracking-tight transition-colors"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

              </div>

              {/* Lower Section Action Row */}
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                
                {/* Cases Study Detailed Trigger */}
                <button
                  onClick={() => setSelectedProject(project)}
                  className="text-xs font-bold text-slate-800 hover:text-indigo-600 flex items-center space-x-1 cursor-pointer"
                  id={`btn-explore-case-${project.id}`}
                >
                  <span>Explore Case Study</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* External Links block - Auto-hides if no public link exists! */}
                <div className="flex items-center space-x-2">
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 border border-slate-200 hover:border-indigo-300 rounded-lg transition-all shadow-xs"
                      title="View Public Code"
                      id={`project-link-${project.id}`}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  ) : null}
                  {project.github ? (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 border border-slate-200 hover:border-indigo-300 rounded-lg transition-all shadow-xs"
                      title="View GitHub Repository"
                      id={`project-github-${project.id}`}
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  ) : null}
                  {!project.link && !project.github && (
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                      Confidential
                    </span>
                  )}
                </div>

              </div>

            </motion.div>
          ))}
        </div>

      </div>

      {/* Case Study Sliding Modal Overlay (Using AnimatePresence) */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-xl overflow-hidden shadow-2xl border border-slate-200 w-full max-w-3xl relative z-10 max-h-[85vh] flex flex-col"
              id="project-detail-modal"
            >
              
              {/* Modal Header */}
              <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono tracking-widest text-indigo-600 uppercase font-bold">
                    Project Case Study
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-display">
                    {selectedProject.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
                  id="modal-close-btn"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Contents */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-grow">
                
                {/* Meta Attributes Banner */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-indigo-50/50 rounded-xl border border-indigo-100">
                  <div>
                    <span className="block text-[10px] font-mono text-slate-400 uppercase font-bold">Date</span>
                    <span className="block text-xs font-bold text-slate-800 mt-0.5">{selectedProject.date}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono text-slate-400 uppercase font-bold">Duration</span>
                    <span className="block text-xs font-bold text-slate-800 mt-0.5">{selectedProject.duration || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono text-slate-400 uppercase font-bold">Category</span>
                    <span className="block text-xs font-bold text-slate-800 mt-0.5 capitalize">{selectedProject.category === 'KPI' ? 'HR KPI Analysis' : selectedProject.category === 'SQL' ? 'Pharma Inventory' : 'Sales Dashboard'}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono text-slate-400 uppercase font-bold">Company Scope</span>
                    <span className="block text-xs font-bold text-slate-800 mt-0.5 truncate">{selectedProject.company || 'Personal Portfolio'}</span>
                  </div>
                </div>

                {/* Narrative Summary */}
                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-display">
                    Project Narrative & Business Problem
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Key Achievements Bullets */}
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-display">
                    Technical Steps & Execution (ATS-Friendly)
                  </h4>
                  <ul className="space-y-2.5">
                    {selectedProject.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start space-x-2.5 text-slate-600 text-sm leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quantitative Data Insights Dashboard */}
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-display flex items-center space-x-1.5">
                    <Sparkles className="w-4 h-4 text-indigo-500" />
                    <span>Calculated KPI Outcomes</span>
                  </h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {selectedProject.insights.map((ins, idx) => (
                      <div key={idx} className="p-4 bg-slate-50 border border-slate-150 rounded-xl space-y-1">
                        <span className="block text-xs font-bold text-indigo-600 font-mono">
                          {ins.value}
                        </span>
                        <h5 className="font-bold text-slate-800 text-xs font-display">
                          {ins.metric}
                        </h5>
                        <p className="text-[11px] text-slate-400 leading-normal">
                          {ins.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack Employed */}
                <div className="space-y-2 pt-2">
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-display">
                    Technologies Employed
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tools.map((tool) => (
                      <span key={tool} className="px-3 py-1 bg-slate-100 text-slate-800 text-xs font-mono font-bold rounded-lg border border-slate-200">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2 text-slate-500 hover:text-slate-900 text-xs font-bold cursor-pointer"
                  id="modal-footer-close"
                >
                  Close Panel
                </button>

                {/* External buttons inside modal */}
                <div className="flex items-center space-x-2">
                  {selectedProject.link && (
                    <a
                      href={selectedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-all shadow-sm cursor-pointer"
                      id={`modal-btn-view-${selectedProject.id}`}
                    >
                      <span>View Live Code</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {selectedProject.github && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 hover:border-indigo-300 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer"
                      id={`modal-btn-github-${selectedProject.id}`}
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>GitHub</span>
                    </a>
                  )}
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
