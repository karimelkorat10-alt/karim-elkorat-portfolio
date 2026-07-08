import { useState } from 'react';
import { motion } from 'motion/react';
import { BarChart3, Database, FileText, Code, Check } from 'lucide-react';
import { SKILL_GROUPS } from '../data';

const CODE_EXAMPLES = {
  dax: {
    title: 'Custom DAX Measure',
    tool: 'Power BI / Analysis Services',
    description: 'Calculates the year-to-date profit while validating product return rates.',
    code: `YTD Profit Margins = 
VAR TotalRevenue = SUM('Sales_Data'[Revenue])
VAR TotalReturns = CALCULATE(
    SUM('Sales_Data'[Return_Value]),
    FILTER('Sales_Data', 'Sales_Data'[Status] = "Returned")
)
RETURN
DIVIDE(
    TotalRevenue - TotalReturns, 
    TotalRevenue, 
    0
)`
  },
  sql: {
    title: 'Relational Database Query',
    tool: 'PostgreSQL / SQL Server',
    description: 'Retrieves top high-turnover departments for HR KPI validation.',
    code: `SELECT 
    d.department_name,
    COUNT(e.id) as total_employees,
    SUM(CASE WHEN e.status = 'Terminated' THEN 1 ELSE 0 END) as turnover_count,
    ROUND((SUM(CASE WHEN e.status = 'Terminated' THEN 1.0 ELSE 0.0 END) / COUNT(e.id)) * 100, 1) as turnover_rate
FROM departments d
LEFT JOIN employees e ON d.id = e.department_id
GROUP BY d.department_name
HAVING COUNT(e.id) > 5
ORDER BY turnover_rate DESC;`
  }
};

export default function Skills() {
  const [activeGroup, setActiveGroup] = useState(0);
  const [activeCodeTab, setActiveCodeTab] = useState<'dax' | 'sql'>('dax');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'BarChart3':
        return <BarChart3 className="w-5 h-5 text-indigo-600" />;
      case 'Database':
        return <Database className="w-5 h-5 text-emerald-600" />;
      default:
        return <FileText className="w-5 h-5 text-violet-600" />;
    }
  };

  return (
    <section id="skills" className="py-20 md:py-28 bg-slate-50/50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono font-bold text-indigo-600 uppercase tracking-widest block">
            Technical Stack
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold font-display text-slate-900 tracking-tight">
            Skills & Competencies
          </h2>
          <div className="h-1 w-12 bg-indigo-600 mx-auto rounded-full"></div>
          <p className="text-sm text-slate-500 max-w-lg mx-auto">
            Practical skills in Power BI dashboards, dimensional modeling, and databases, built through intensive certification and project delivery.
          </p>
        </div>

        {/* main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Block: Interactive Skills Category Tabs and Rating Meters (Col span 7) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Tab Switches */}
            <div className="flex flex-col sm:flex-row gap-2" id="skills-tabs">
              {SKILL_GROUPS.map((group, idx) => (
                <button
                   key={idx}
                   onClick={() => setActiveGroup(idx)}
                   className={`flex items-center space-x-2.5 px-4 py-3 rounded-lg text-left border text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    activeGroup === idx
                      ? 'bg-white text-slate-900 border-indigo-600 shadow-sm ring-1 ring-indigo-500/20'
                      : 'bg-white/50 text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-white'
                   }`}
                   id={`skill-tab-btn-${idx}`}
                >
                  <span className="p-1 rounded-md bg-slate-100">
                    {getIcon(group.icon)}
                  </span>
                  <span>{group.category}</span>
                </button>
              ))}
            </div>

            {/* Skills Progress Meters */}
            <div className="bg-white border border-slate-200/80 p-6 sm:p-8 rounded-xl shadow-sm space-y-5">
              <h3 className="text-base font-bold text-slate-900 font-display">
                {SKILL_GROUPS[activeGroup].category}
              </h3>
              
              <div className="space-y-4">
                {SKILL_GROUPS[activeGroup].skills.map((skill, index) => (
                  <div key={index} className="space-y-1.5" id={`skill-meter-${index}`}>
                    <div className="flex items-center justify-between text-xs sm:text-sm font-medium">
                      <span className="text-slate-800 font-semibold">{skill.name}</span>
                      <span className="font-mono text-indigo-600">{skill.level}%</span>
                    </div>
                    {/* The Meter Base */}
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 0.8, delay: index * 0.05 }}
                        className={`h-full rounded-full ${
                          activeGroup === 0 
                            ? 'bg-indigo-600' 
                            : activeGroup === 1 
                            ? 'bg-emerald-600' 
                            : 'bg-violet-600'
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Verified Badge / Highlights */}
              <div className="pt-4 border-t border-slate-100 flex items-center space-x-2 text-xs text-slate-500 font-medium">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Competency verified through practical project testing. No inflated scales.</span>
              </div>
            </div>

          </div>

          {/* Right Block: Live Syntax Code Examples (Col span 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            
            <div className="bg-indigo-900 border border-indigo-950 rounded-xl shadow-xl flex flex-col h-full overflow-hidden">
              
              {/* Code Tab Header */}
              <div className="px-4 py-3 bg-indigo-950 border-b border-indigo-950 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  <span className="text-xs font-mono text-slate-400 ml-2">syntax_editor.txt</span>
                </div>
                <div className="flex space-x-1 bg-indigo-900 p-0.5 rounded-lg border border-indigo-950">
                  <button
                    onClick={() => setActiveCodeTab('dax')}
                    className={`px-2 py-1 text-[10px] font-bold font-mono uppercase rounded-md cursor-pointer ${
                      activeCodeTab === 'dax' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                    id="code-tab-dax"
                  >
                    DAX
                  </button>
                  <button
                    onClick={() => setActiveCodeTab('sql')}
                    className={`px-2 py-1 text-[10px] font-bold font-mono uppercase rounded-md cursor-pointer ${
                      activeCodeTab === 'sql' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                    id="code-tab-sql"
                  >
                    SQL
                  </button>
                </div>
              </div>

              {/* Code Box Content */}
              <div className="p-5 flex-grow space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-indigo-300 uppercase">
                    {CODE_EXAMPLES[activeCodeTab].tool}
                  </span>
                  <h4 className="text-white text-sm font-bold font-display">
                    {CODE_EXAMPLES[activeCodeTab].title}
                  </h4>
                  <p className="text-slate-300 text-xs">
                    {CODE_EXAMPLES[activeCodeTab].description}
                  </p>
                </div>

                <div className="bg-indigo-950 p-4 rounded-xl border border-indigo-950 overflow-x-auto">
                  <pre className="font-mono text-xs text-indigo-200 leading-relaxed whitespace-pre select-all">
                    <code>{CODE_EXAMPLES[activeCodeTab].code}</code>
                  </pre>
                </div>
              </div>

              {/* Syntax Indicator Footer */}
              <div className="px-4 py-2 bg-indigo-950 border-t border-indigo-950 flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span className="flex items-center space-x-1">
                  <Code className="w-3 h-3 text-indigo-400" />
                  <span>Interactive Code Snippet</span>
                </span>
                <span>Lines: {CODE_EXAMPLES[activeCodeTab].code.split('\n').length}</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
