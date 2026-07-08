import { BarChart3, Mail, Heart } from 'lucide-react';
import { PERSONAL_INFO } from '../data';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 py-12 md:py-16 border-t border-slate-900" id="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-8 border-b border-slate-900">
          
          {/* Logo Brand info */}
          <div className="flex items-center space-x-2.5 cursor-pointer group" onClick={handleScrollToTop}>
            <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-md">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-base font-bold font-display tracking-tight text-white group-hover:text-indigo-400 transition-colors">
                {PERSONAL_INFO.name}
              </span>
              <span className="block text-[9px] font-mono tracking-widest text-slate-500 uppercase">
                {PERSONAL_INFO.title} Portfolio
              </span>
            </div>
          </div>

          {/* Copyright, year, and trust statement */}
          <div className="text-center md:text-right space-y-1 text-xs">
            <p className="text-slate-500 font-medium">
              © {currentYear} Karim Elkorat. All Rights Reserved.
            </p>
            <p className="text-[10px] text-slate-600 font-mono">
              Designed with absolute precision & ATS-Friendly B2 English
            </p>
          </div>

        </div>

        {/* Bottom Credits line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-600">
          <div className="flex items-center space-x-1.5">
            <span>Powered by React, Tailwind v4 & Motion</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>Formulated for recruiters looking for excellence</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
