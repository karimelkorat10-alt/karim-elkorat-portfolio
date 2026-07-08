import { Award, ExternalLink, Calendar, CheckCircle } from 'lucide-react';
import { CERTIFICATIONS } from '../data';

export default function Certifications() {
  return (
    <section id="certifications" className="py-20 md:py-28 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono font-bold text-indigo-600 uppercase tracking-widest block">
            Accreditation
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold font-display text-slate-900 tracking-tight">
            Certifications & Training
          </h2>
          <div className="h-1 w-12 bg-indigo-600 mx-auto rounded-full"></div>
          <p className="text-sm text-slate-500 max-w-lg mx-auto">
            Industry-standard qualifications showing my verified knowledge of business intelligence platforms, data query structures, and core analytical processes.
          </p>
        </div>

        {/* Certificate Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="certifications-grid">
          {CERTIFICATIONS.map((cert) => (
            <div
              key={cert.id}
              className="bg-white border border-slate-200/80 p-6 sm:p-8 rounded-xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-6"
              id={`cert-card-${cert.id}`}
            >
              
              <div className="space-y-4">
                {/* Visual Icon Badge */}
                <div className="w-12 h-12 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                  <Award className="w-6 h-6" />
                </div>

                {/* Content Block */}
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-slate-950 font-display leading-snug">
                    {cert.title}
                  </h3>
                  <div className="space-y-1">
                    <span className="block text-xs font-bold text-slate-700">
                      Issuer: {cert.issuer}
                    </span>
                    <span className="block text-xs text-slate-400 font-mono flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>Issued: {cert.date}</span>
                    </span>
                  </div>
                </div>

                {/* Credential ID */}
                {cert.credentialId && (
                  <div className="pt-2">
                    <span className="inline-flex items-center space-x-1 px-2.5 py-1 bg-slate-50 border border-slate-200 text-slate-600 text-[10px] font-mono rounded-lg">
                      <span className="font-bold text-slate-400">ID:</span>
                      <span>{cert.credentialId}</span>
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons: Displays verify credential link ONLY if link exists, hiding without leaving empty gaps */}
              {cert.link ? (
                <div className="pt-2">
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 border border-indigo-600 hover:border-indigo-500 text-white text-xs font-bold rounded-lg shadow-xs transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                    id={`cert-btn-verify-${cert.id}`}
                  >
                    <span>Verify Credential</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ) : (
                <div className="pt-2">
                  <span className="w-full py-2.5 px-4 bg-slate-50 text-slate-400 text-xs font-bold rounded-lg flex items-center justify-center space-x-1.5 border border-dashed border-slate-200 select-none">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500/80" />
                    <span>Verified Internally</span>
                  </span>
                </div>
              )}

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
