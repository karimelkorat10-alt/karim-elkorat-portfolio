import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Github, Linkedin, Send, CheckCircle2, Copy, Check } from 'lucide-react';
import { PERSONAL_INFO } from '../data';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    purpose: 'Full-time Position',
    message: '',
  });

  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const validate = () => {
    const tempErrors: {[key: string]: string} = {};
    if (!formData.name.trim()) tempErrors.name = 'Please provide your name.';
    if (!formData.email.trim()) {
      tempErrors.email = 'Please provide an email address.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.message.trim()) tempErrors.message = 'Please type your message.';
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    // Simulate reliable API/form submission
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setFormData({ name: '', email: '', purpose: 'Full-time Position', message: '' });
      // Reset success state after 5 seconds
      setTimeout(() => setSuccess(false), 6000);
    }, 1200);
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono font-bold text-indigo-600 uppercase tracking-widest block">
            Let's Connect
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold font-display text-slate-900 tracking-tight">
            Get In Touch
          </h2>
          <div className="h-1 w-12 bg-indigo-600 mx-auto rounded-full"></div>
          <p className="text-sm text-slate-500 max-w-lg mx-auto">
            Hiring for a role or need an interactive analytics dashboard? Let's discuss how we can work together to turn your data into insights.
          </p>
        </div>

        {/* Contact Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto items-stretch">
          
          {/* Left Block: Personal info & channels (Col span 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8 bg-slate-50 border border-slate-200/80 p-8 rounded-xl">
            
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] font-mono tracking-widest text-indigo-600 uppercase font-bold">Contact Card</span>
                <h3 className="text-2xl font-bold text-slate-950 font-display">Karim Elkorat</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Available for Remote roles worldwide, or Hybrid positions. Open to both Full-time corporate positions and specialized freelance reporting dashboard commissions.
                </p>
              </div>

              {/* Channels List */}
              <div className="space-y-4">
                
                {/* Email Copy Box */}
                <div className="p-4 bg-white border border-slate-100 rounded-xl flex items-center justify-between shadow-xs">
                  <div className="flex items-center space-x-3 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[10px] font-mono text-slate-400 uppercase font-bold">Direct Email</span>
                      <span className="block text-xs sm:text-sm font-bold text-slate-800 truncate select-all">
                        {PERSONAL_INFO.email}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all cursor-pointer"
                    title="Copy Email Address"
                    id="btn-copy-email"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Social Networks Row */}
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 bg-white border border-slate-100 rounded-xl flex items-center space-x-3 hover:border-indigo-300 transition-all shadow-xs cursor-pointer group"
                    id="contact-linkedin"
                  >
                    <Linkedin className="w-5 h-5 text-[#0a66c2] group-hover:scale-110 transition-transform" />
                    <div>
                      <span className="block text-[9px] font-mono text-slate-400 uppercase font-bold">LinkedIn</span>
                      <span className="block text-xs font-bold text-slate-800">karim-elkorat</span>
                    </div>
                  </a>

                  <a
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 bg-white border border-slate-100 rounded-xl flex items-center space-x-3 hover:border-indigo-300 transition-all shadow-xs cursor-pointer group"
                    id="contact-github"
                  >
                    <Github className="w-5 h-5 text-slate-900 group-hover:scale-110 transition-transform" />
                    <div>
                      <span className="block text-[9px] font-mono text-slate-400 uppercase font-bold">GitHub</span>
                      <span className="block text-xs font-bold text-slate-800">karimelkorat</span>
                    </div>
                  </a>
                </div>

              </div>
            </div>

            {/* Recruiter trust statement */}
            <div className="p-4 bg-white/70 border border-slate-200/50 rounded-xl text-[11px] text-slate-500 leading-normal">
              <strong>Hiring Note:</strong> When you send a message, I am notified immediately. I typically respond to all recruiter inquiries within 24 hours. Let's build something together!
            </div>

          </div>

          {/* Right Block: Interactive Form (Col span 7) */}
          <div className="lg:col-span-7 bg-white border border-slate-200/80 p-8 rounded-xl shadow-xs relative">
            <AnimatePresence mode="wait">
              {success ? (
                <motion.div
                  key="success-message"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-white rounded-xl p-8 flex flex-col items-center justify-center text-center space-y-4 z-10"
                  id="contact-success-container"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border-4 border-emerald-100 flex items-center justify-center text-emerald-600 mx-auto animate-bounce">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-slate-900 font-display">Message Received!</h3>
                    <p className="text-slate-500 text-sm max-w-sm mx-auto">
                      Thank you for reaching out. I have received your message and will check the details shortly.
                    </p>
                  </div>
                  <button
                    onClick={() => setSuccess(false)}
                    className="px-5 py-2 border border-slate-200 hover:border-indigo-300 text-slate-700 hover:text-indigo-600 rounded-lg text-xs font-bold cursor-pointer transition-colors"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : null}
            </AnimatePresence>

            {/* main Form element */}
            <form onSubmit={handleSubmit} className="space-y-5" id="recruitment-contact-form">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-1.5">
                  <label htmlFor="form-name" className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="form-name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full bg-slate-50 border ${
                      errors.name ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-200 focus:ring-indigo-500'
                    } rounded-lg px-4 py-3 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:bg-white transition-all`}
                    placeholder="e.g. Jane Doe"
                  />
                  {errors.name && <span className="text-[10px] text-rose-500 font-mono font-bold block">{errors.name}</span>}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="form-email" className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="form-email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full bg-slate-50 border ${
                      errors.email ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-200 focus:ring-indigo-500'
                    } rounded-lg px-4 py-3 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:bg-white transition-all`}
                    placeholder="e.g. jane@company.com"
                  />
                  {errors.email && <span className="text-[10px] text-rose-500 font-mono font-bold block">{errors.email}</span>}
                </div>
              </div>

              {/* Purpose dropdown */}
              <div className="space-y-1.5">
                <label htmlFor="form-purpose" className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                  Purpose of Inquiry
                </label>
                <select
                  id="form-purpose"
                  value={formData.purpose}
                  onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white transition-all"
                >
                  <option value="Full-time Position">Full-time Position Interview</option>
                  <option value="Freelance Dashboard">Freelance Dashboard Project</option>
                  <option value="General Analytics">General Inquiry / Question</option>
                </select>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label htmlFor="form-message" className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                  Message Details
                </label>
                <textarea
                  id="form-message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`w-full bg-slate-50 border ${
                    errors.message ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-200 focus:ring-indigo-500'
                  } rounded-lg px-4 py-3 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:bg-white transition-all resize-none`}
                  placeholder="Describe your dataset, job requirements, or project deadlines..."
                />
                {errors.message && <span className="text-[10px] text-rose-500 font-mono font-bold block">{errors.message}</span>}
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-6 bg-slate-900 hover:bg-indigo-600 disabled:bg-slate-300 text-white font-semibold text-xs uppercase tracking-widest rounded-lg transition-all shadow-sm flex items-center justify-center space-x-2 cursor-pointer border border-slate-950 hover:border-indigo-600"
                id="contact-submit-btn"
              >
                <span>{loading ? 'Submitting Message...' : 'Send Message Now'}</span>
                {!loading && <Send className="w-4 h-4" />}
              </button>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
