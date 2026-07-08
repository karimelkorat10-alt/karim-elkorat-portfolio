import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, TrendingUp, AlertTriangle, Users, DollarSign, Filter, RefreshCcw, Layers, Code, Award } from 'lucide-react';

interface ProjectDemoData {
  title: string;
  subtitle: string;
  filters: string[];
  metrics: {
    [key: string]: {
      kpi1: { label: string; value: string; color: string; icon: any };
      kpi2: { label: string; value: string; color: string; icon: any };
      kpi3: { label: string; value: string; color: string; icon: any };
      chartData: { label: string; val: number; pct: string }[];
      daxSnippet: string;
    };
  };
}

const DEMO_PROJECTS: { [key: string]: ProjectDemoData } = {
  maven: {
    title: 'Maven Market Analytics',
    subtitle: 'Multinational Retail Chain',
    filters: ['All Territories', 'North America', 'Europe', 'Asia'],
    metrics: {
      'All Territories': {
        kpi1: { label: 'Total Revenue YTD', value: '$234,500', color: 'text-indigo-600 bg-indigo-50 border-indigo-100', icon: DollarSign },
        kpi2: { label: 'YTD Profit Margin', value: '37.2%', color: 'text-emerald-600 bg-emerald-50 border-emerald-100', icon: TrendingUp },
        kpi3: { label: 'Product Return Rate', value: '2.1%', color: 'text-rose-600 bg-rose-50 border-rose-100', icon: AlertTriangle },
        chartData: [
          { label: 'Groceries', val: 92, pct: '92%' },
          { label: 'Snack Foods', val: 78, pct: '78%' },
          { label: 'Dairy', val: 64, pct: '64%' },
          { label: 'Beverages', val: 45, pct: '45%' },
        ],
        daxSnippet: `Total Revenue YTD = 
CALCULATE(
    SUM('Transaction_Data'[Sales_Amount]),
    DATESYTD('Calendar'[Date])
)`
      },
      'North America': {
        kpi1: { label: 'Total Revenue YTD', value: '$142,000', color: 'text-indigo-600 bg-indigo-50 border-indigo-100', icon: DollarSign },
        kpi2: { label: 'YTD Profit Margin', value: '38.5%', color: 'text-emerald-600 bg-emerald-50 border-emerald-100', icon: TrendingUp },
        kpi3: { label: 'Product Return Rate', value: '1.8%', color: 'text-rose-600 bg-rose-50 border-rose-100', icon: AlertTriangle },
        chartData: [
          { label: 'Groceries', val: 95, pct: '95%' },
          { label: 'Snack Foods', val: 82, pct: '82%' },
          { label: 'Dairy', val: 58, pct: '58%' },
          { label: 'Beverages', val: 38, pct: '38%' },
        ],
        daxSnippet: `NA Revenue = 
CALCULATE(
    [Total Revenue YTD],
    'Store_Lookup'[Store_Region] = "North America"
)`
      },
      'Europe': {
        kpi1: { label: 'Total Revenue YTD', value: '$61,500', color: 'text-indigo-600 bg-indigo-50 border-indigo-100', icon: DollarSign },
        kpi2: { label: 'YTD Profit Margin', value: '35.1%', color: 'text-emerald-600 bg-emerald-50 border-emerald-100', icon: TrendingUp },
        kpi3: { label: 'Product Return Rate', value: '2.8%', color: 'text-rose-600 bg-rose-50 border-rose-100', icon: AlertTriangle },
        chartData: [
          { label: 'Groceries', val: 88, pct: '88%' },
          { label: 'Snack Foods', val: 70, pct: '70%' },
          { label: 'Dairy', val: 69, pct: '69%' },
          { label: 'Beverages', val: 50, pct: '50%' },
        ],
        daxSnippet: `EU Return Check = 
CALCULATE(
    [Product Return Rate],
    'Store_Lookup'[Country] IN {"France", "Germany", "UK"}
)`
      },
      'Asia': {
        kpi1: { label: 'Total Revenue YTD', value: '$31,000', color: 'text-indigo-600 bg-indigo-50 border-indigo-100', icon: DollarSign },
        kpi2: { label: 'YTD Profit Margin', value: '36.8%', color: 'text-emerald-600 bg-emerald-50 border-emerald-100', icon: TrendingUp },
        kpi3: { label: 'Product Return Rate', value: '1.6%', color: 'text-rose-600 bg-rose-50 border-rose-100', icon: AlertTriangle },
        chartData: [
          { label: 'Groceries', val: 90, pct: '90%' },
          { label: 'Snack Foods', val: 75, pct: '75%' },
          { label: 'Dairy', val: 65, pct: '65%' },
          { label: 'Beverages', val: 40, pct: '40%' },
        ],
        daxSnippet: `Asia Profit = 
CALCULATE(
    [YTD Profit Margin],
    'Store_Lookup'[Store_Region] = "Asia"
)`
      }
    }
  },
  adventure: {
    title: 'AdventureWorks Cycle Analysis',
    subtitle: 'Bicycle Equipment Manufacturer',
    filters: ['All Territories', 'North America', 'Europe', 'Asia'],
    metrics: {
      'All Territories': {
        kpi1: { label: 'Total Sales Revenue', value: '$450,200', color: 'text-indigo-600 bg-indigo-50 border-indigo-100', icon: DollarSign },
        kpi2: { label: 'Year-over-Year Growth', value: '+14.5%', color: 'text-emerald-600 bg-emerald-50 border-emerald-100', icon: TrendingUp },
        kpi3: { label: 'Active Customers Count', value: '3,240', color: 'text-violet-600 bg-violet-50 border-violet-100', icon: Users },
        chartData: [
          { label: 'Mountain Bikes', val: 88, pct: '88%' },
          { label: 'Road Bikes', val: 76, pct: '76%' },
          { label: 'Accessories', val: 52, pct: '52%' },
          { label: 'Clothing', val: 33, pct: '33%' },
        ],
        daxSnippet: `Active Customers = 
DISTINCTCOUNT(
    'Sales_Data'[Customer_Key]
)`
      },
      'North America': {
        kpi1: { label: 'Total Sales Revenue', value: '$280,000', color: 'text-indigo-600 bg-indigo-50 border-indigo-100', icon: DollarSign },
        kpi2: { label: 'Year-over-Year Growth', value: '+12.1%', color: 'text-emerald-600 bg-emerald-50 border-emerald-100', icon: TrendingUp },
        kpi3: { label: 'Active Customers Count', value: '1,980', color: 'text-violet-600 bg-violet-50 border-violet-100', icon: Users },
        chartData: [
          { label: 'Mountain Bikes', val: 92, pct: '92%' },
          { label: 'Road Bikes', val: 70, pct: '70%' },
          { label: 'Accessories', val: 48, pct: '48%' },
          { label: 'Clothing', val: 30, pct: '30%' },
        ],
        daxSnippet: `NA Active Users = 
CALCULATE(
    [Active Customers],
    'Territory_Lookup'[Country] IN {"USA", "Canada"}
)`
      },
      'Europe': {
        kpi1: { label: 'Total Sales Revenue', value: '$120,500', color: 'text-indigo-600 bg-indigo-50 border-indigo-100', icon: DollarSign },
        kpi2: { label: 'Year-over-Year Growth', value: '+18.2%', color: 'text-emerald-600 bg-emerald-50 border-emerald-100', icon: TrendingUp },
        kpi3: { label: 'Active Customers Count', value: '860', color: 'text-violet-600 bg-violet-50 border-violet-100', icon: Users },
        chartData: [
          { label: 'Mountain Bikes', val: 80, pct: '80%' },
          { label: 'Road Bikes', val: 85, pct: '85%' },
          { label: 'Accessories', val: 55, pct: '55%' },
          { label: 'Clothing', val: 40, pct: '40%' },
        ],
        daxSnippet: `EU Bikes Sales = 
CALCULATE(
    SUM('Sales_Data'[Sales_Amount]),
    'Product_Lookup'[Category] = "Bikes",
    'Territory_Lookup'[Continent] = "Europe"
)`
      },
      'Asia': {
        kpi1: { label: 'Total Sales Revenue', value: '$49,700', color: 'text-indigo-600 bg-indigo-50 border-indigo-100', icon: DollarSign },
        kpi2: { label: 'Year-over-Year Growth', value: '+21.4%', color: 'text-emerald-600 bg-emerald-50 border-emerald-100', icon: TrendingUp },
        kpi3: { label: 'Active Customers Count', value: '400', color: 'text-violet-600 bg-violet-50 border-violet-100', icon: Users },
        chartData: [
          { label: 'Mountain Bikes', val: 85, pct: '85%' },
          { label: 'Road Bikes', val: 62, pct: '62%' },
          { label: 'Accessories', val: 60, pct: '60%' },
          { label: 'Clothing', val: 28, pct: '28%' },
        ],
        daxSnippet: `APAC YoY Sales = 
VAR PrevYearSales = CALCULATE([Total Sales Revenue], SAMEPERIODLASTYEAR('Calendar'[Date]))
RETURN
DIVIDE([Total Sales Revenue] - PrevYearSales, PrevYearSales, 0)`
      }
    }
  },
  egpi: {
    title: 'EGPI Pharma Inventory',
    subtitle: 'One-Day Rapid Analytics Project',
    filters: ['General Stock', 'Regional Clinics', 'Main Warehouse'],
    metrics: {
      'General Stock': {
        kpi1: { label: 'Clinic Stockouts', value: '12 Locations', color: 'text-rose-600 bg-rose-50 border-rose-100', icon: AlertTriangle },
        kpi2: { label: 'Inventory Turnover Rate', value: '8.4x', color: 'text-emerald-600 bg-emerald-50 border-emerald-100', icon: TrendingUp },
        kpi3: { label: 'Urgent Bottlenecks Spot', value: '4 Districts', color: 'text-amber-600 bg-amber-50 border-amber-100', icon: Filter },
        chartData: [
          { label: 'Antibiotics', val: 90, pct: '90%' },
          { label: 'Cardiac Care', val: 75, pct: '75%' },
          { label: 'Analgesics', val: 40, pct: '40%' },
          { label: 'Vaccines', val: 20, pct: '20%' },
        ],
        daxSnippet: `Clinic Stockout Count = 
COUNTROWS(
    FILTER(
        'Clinic_Inventory',
        'Clinic_Inventory'[Units_In_Stock] = 0 && 'Clinic_Inventory'[Urgent_Demand] > 0
    )
)`
      },
      'Regional Clinics': {
        kpi1: { label: 'Clinic Stockouts', value: '8 Locations', color: 'text-rose-600 bg-rose-50 border-rose-100', icon: AlertTriangle },
        kpi2: { label: 'Inventory Turnover Rate', value: '9.1x', color: 'text-emerald-600 bg-emerald-50 border-emerald-100', icon: TrendingUp },
        kpi3: { label: 'Urgent Bottlenecks Spot', value: '3 Districts', color: 'text-amber-600 bg-amber-50 border-amber-100', icon: Filter },
        chartData: [
          { label: 'Antibiotics', val: 85, pct: '85%' },
          { label: 'Cardiac Care', val: 68, pct: '68%' },
          { label: 'Analgesics', val: 45, pct: '45%' },
          { label: 'Vaccines', val: 15, pct: '15%' },
        ],
        daxSnippet: `Regional Shortage = 
CALCULATE(
    [Clinic Stockout Count],
    'Clinic_Lookup'[Type] = "Rural Clinic"
)`
      },
      'Main Warehouse': {
        kpi1: { label: 'Clinic Stockouts', value: '4 Locations', color: 'text-rose-600 bg-rose-50 border-rose-100', icon: AlertTriangle },
        kpi2: { label: 'Inventory Turnover Rate', value: '7.2x', color: 'text-emerald-600 bg-emerald-50 border-emerald-100', icon: TrendingUp },
        kpi3: { label: 'Urgent Bottlenecks Spot', value: '1 District', color: 'text-amber-600 bg-amber-50 border-amber-100', icon: Filter },
        chartData: [
          { label: 'Antibiotics', val: 95, pct: '95%' },
          { label: 'Cardiac Care', val: 82, pct: '82%' },
          { label: 'Analgesics', val: 35, pct: '35%' },
          { label: 'Vaccines', val: 25, pct: '25%' },
        ],
        daxSnippet: `Warehouse Safety Stock = 
AVERAGEX(
    'Warehouse_Inventory',
    'Warehouse_Inventory'[Units] - 'Warehouse_Inventory'[Reorder_Threshold]
)`
      }
    }
  },
  hr: {
    title: 'HR Data KPI Analysis',
    subtitle: 'Confidential Executive Report',
    filters: ['Overall Company', 'Sales Department', 'Engineering', 'Customer Support'],
    metrics: {
      'Overall Company': {
        kpi1: { label: 'Active Headcount', value: '340 Employees', color: 'text-indigo-600 bg-indigo-50 border-indigo-100', icon: Users },
        kpi2: { label: 'Overall Retention Rate', value: '91.2%', color: 'text-emerald-600 bg-emerald-50 border-emerald-100', icon: TrendingUp },
        kpi3: { label: 'High-Turnover Depts', value: '2 Departments', color: 'text-rose-600 bg-rose-50 border-rose-100', icon: AlertTriangle },
        chartData: [
          { label: 'Engineering', val: 96, pct: '95.8%' },
          { label: 'Operations', val: 90, pct: '90.2%' },
          { label: 'Sales', val: 84, pct: '84.5%' },
          { label: 'Support', val: 82, pct: '82.1%' },
        ],
        daxSnippet: `Retention Rate % = 
VAR TotalCount = COUNTROWS('Employees_Lookup')
VAR ResignedCount = CALCULATE(
    COUNTROWS('Employees_Lookup'),
    'Employees_Lookup'[Exit_Status] = "Terminated"
)
RETURN
DIVIDE(TotalCount - ResignedCount, TotalCount, 1)`
      },
      'Sales Department': {
        kpi1: { label: 'Active Headcount', value: '85 Employees', color: 'text-indigo-600 bg-indigo-50 border-indigo-100', icon: Users },
        kpi2: { label: 'Overall Retention Rate', value: '84.5%', color: 'text-emerald-600 bg-emerald-50 border-emerald-100', icon: TrendingUp },
        kpi3: { label: 'High-Turnover Depts', value: '1 Department', color: 'text-rose-600 bg-rose-50 border-rose-100', icon: AlertTriangle },
        chartData: [
          { label: 'Engineering', val: 0, pct: 'N/A' },
          { label: 'Operations', val: 0, pct: 'N/A' },
          { label: 'Sales', val: 84, pct: '84.5%' },
          { label: 'Support', val: 0, pct: 'N/A' },
        ],
        daxSnippet: `Sales Dept Turnover = 
CALCULATE(
    [Retention Rate %],
    'Employees_Lookup'[Department] = "Sales"
)`
      },
      'Engineering': {
        kpi1: { label: 'Active Headcount', value: '120 Employees', color: 'text-indigo-600 bg-indigo-50 border-indigo-100', icon: Users },
        kpi2: { label: 'Overall Retention Rate', value: '95.8%', color: 'text-emerald-600 bg-emerald-50 border-emerald-100', icon: TrendingUp },
        kpi3: { label: 'High-Turnover Depts', value: '0 Departments', color: 'text-rose-600 bg-rose-50 border-rose-100', icon: AlertTriangle },
        chartData: [
          { label: 'Engineering', val: 96, pct: '95.8%' },
          { label: 'Operations', val: 0, pct: 'N/A' },
          { label: 'Sales', val: 0, pct: 'N/A' },
          { label: 'Support', val: 0, pct: 'N/A' },
        ],
        daxSnippet: `Engineering Resigned = 
CALCULATE(
    COUNTROWS('Employees_Lookup'),
    'Employees_Lookup'[Department] = "Engineering",
    'Employees_Lookup'[Exit_Status] = "Terminated"
)`
      },
      'Customer Support': {
        kpi1: { label: 'Active Headcount', value: '135 Employees', color: 'text-indigo-600 bg-indigo-50 border-indigo-100', icon: Users },
        kpi2: { label: 'Overall Retention Rate', value: '82.1%', color: 'text-emerald-600 bg-emerald-50 border-emerald-100', icon: TrendingUp },
        kpi3: { label: 'High-Turnover Depts', value: '1 Department', color: 'text-rose-600 bg-rose-50 border-rose-100', icon: AlertTriangle },
        chartData: [
          { label: 'Engineering', val: 0, pct: 'N/A' },
          { label: 'Operations', val: 0, pct: 'N/A' },
          { label: 'Sales', val: 0, pct: 'N/A' },
          { label: 'Support', val: 82, pct: '82.1%' },
        ],
        daxSnippet: `Support Exit Rate = 
1 - CALCULATE(
    [Retention Rate %],
    'Employees_Lookup'[Department] = "Customer Support"
)`
      }
    }
  }
};

export default function DashboardExplorer() {
  const [activeProjectKey, setActiveProjectKey] = useState<'maven' | 'adventure' | 'egpi' | 'hr'>('maven');
  const [activeFilter, setActiveFilter] = useState<string>('All Territories');

  const project = DEMO_PROJECTS[activeProjectKey];
  const data = project.metrics[activeFilter] || project.metrics[project.filters[0]];

  const handleProjectChange = (key: 'maven' | 'adventure' | 'egpi' | 'hr') => {
    setActiveProjectKey(key);
    setActiveFilter(DEMO_PROJECTS[key].filters[0]);
  };

  const KPI1Icon = data.kpi1.icon;
  const KPI2Icon = data.kpi2.icon;
  const KPI3Icon = data.kpi3.icon;

  return (
    <section id="explorer" className="py-20 md:py-28 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono font-bold text-indigo-600 uppercase tracking-widest block">
            Live Showcase
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold font-display text-slate-900 tracking-tight">
            Interactive BI Dashboard Demo
          </h2>
          <div className="h-1 w-12 bg-indigo-600 mx-auto rounded-full"></div>
          <p className="text-sm text-slate-500 max-w-xl mx-auto">
            Experience how I design dashboards! Select a project below and use filters to dynamically recalculate KPIs, update visuals, and reveal my core DAX models instantly.
          </p>
        </div>

        {/* Dashboard Shell Frame */}
        <div className="bg-slate-900/5 p-4 md:p-6 rounded-xl border border-slate-200/80 shadow-sm max-w-5xl mx-auto">
          
          {/* Controls Panel */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center mb-6 bg-white p-4 rounded-xl border border-slate-200/60 shadow-xs">
            
            {/* Project Selector Tab Links */}
            <div className="md:col-span-7 flex flex-wrap gap-1.5" id="explorer-project-selector">
              {Object.keys(DEMO_PROJECTS).map((key) => (
                <button
                  key={key}
                  onClick={() => handleProjectChange(key as any)}
                  className={`px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeProjectKey === key
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                  id={`explorer-proj-btn-${key}`}
                >
                  {DEMO_PROJECTS[key].title.split(' ')[0]} {DEMO_PROJECTS[key].title.split(' ')[1] || ''}
                </button>
              ))}
            </div>

            {/* Region / Segment Dropdown filter selector */}
            <div className="md:col-span-5 flex items-center justify-end space-x-2 w-full">
              <span className="text-xs font-mono text-slate-400 flex items-center space-x-1 shrink-0">
                <Filter className="w-3.5 h-3.5" />
                <span>Filter Scope:</span>
              </span>
              <select
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg px-3 py-2 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none w-full max-w-[200px]"
                id="explorer-filter-select"
              >
                {project.filters.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Interactive Work Area */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Block: BI Dashboard Representation (KPIs and SVG Chart) - Col span 7 */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Dynamic KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" id="explorer-kpis">
                
                {/* KPI 1 */}
                <motion.div
                  key={`${activeProjectKey}-${activeFilter}-kpi1`}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`p-4 rounded-xl border shadow-xs flex items-center space-x-3 bg-white`}
                >
                  <div className={`p-2.5 rounded-lg ${data.kpi1.color.split(' ').slice(0, 2).join(' ')}`}>
                    <KPI1Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[10px] font-bold text-slate-400 font-sans uppercase tracking-tight truncate">
                      {data.kpi1.label}
                    </span>
                    <span className="block text-lg font-extrabold text-slate-900 font-mono">
                      {data.kpi1.value}
                    </span>
                  </div>
                </motion.div>

                {/* KPI 2 */}
                <motion.div
                  key={`${activeProjectKey}-${activeFilter}-kpi2`}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.05 }}
                  className={`p-4 rounded-xl border shadow-xs flex items-center space-x-3 bg-white`}
                >
                  <div className={`p-2.5 rounded-lg ${data.kpi2.color.split(' ').slice(0, 2).join(' ')}`}>
                    <KPI2Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[10px] font-bold text-slate-400 font-sans uppercase tracking-tight truncate">
                      {data.kpi2.label}
                    </span>
                    <span className="block text-lg font-extrabold text-slate-900 font-mono">
                      {data.kpi2.value}
                    </span>
                  </div>
                </motion.div>

                {/* KPI 3 */}
                <motion.div
                  key={`${activeProjectKey}-${activeFilter}-kpi3`}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className={`p-4 rounded-xl border shadow-xs flex items-center space-x-3 bg-white`}
                >
                  <div className={`p-2.5 rounded-lg ${data.kpi3.color.split(' ').slice(0, 2).join(' ')}`}>
                    <KPI3Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[10px] font-bold text-slate-400 font-sans uppercase tracking-tight truncate">
                      {data.kpi3.label}
                    </span>
                    <span className="block text-lg font-extrabold text-slate-900 font-mono">
                      {data.kpi3.value}
                    </span>
                  </div>
                </motion.div>

              </div>

              {/* Dynamic Visualized Chart Canvas */}
              <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 font-display uppercase tracking-wide">
                    Category Metrics Distribution ({activeFilter})
                  </span>
                  <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
                    Interactive State Active
                  </span>
                </div>

                {/* Simulated Chart Bars */}
                <div className="space-y-4 py-2">
                  <AnimatePresence mode="popLayout">
                    {data.chartData.map((item, idx) => (
                      <motion.div 
                        key={`${activeProjectKey}-${activeFilter}-${item.label}`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.04 }}
                        className="space-y-1"
                        id={`explorer-chart-bar-${idx}`}
                      >
                        <div className="flex justify-between text-xs font-semibold text-slate-700">
                          <span>{item.label}</span>
                          <span className="font-mono text-slate-500">{item.pct}</span>
                        </div>
                        {item.pct === 'N/A' ? (
                          <div className="h-5 flex items-center text-[10px] font-mono text-slate-400 italic bg-slate-50 px-3 rounded-lg border border-dashed border-slate-200">
                            Category filtered out for this department selection
                          </div>
                        ) : (
                          <div className="h-5 w-full bg-slate-50 rounded-lg border border-slate-100 overflow-hidden relative flex items-center">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${item.val}%` }}
                              transition={{ duration: 0.6, type: 'spring' }}
                              className={`h-full rounded-r-md ${
                                activeProjectKey === 'maven' 
                                  ? 'bg-indigo-500' 
                                  : activeProjectKey === 'adventure'
                                  ? 'bg-indigo-600'
                                  : activeProjectKey === 'egpi'
                                  ? 'bg-emerald-500'
                                  : 'bg-violet-500'
                              }`}
                            />
                            {/* Inner percentage indicator */}
                            <span className="absolute left-2.5 text-[9px] font-bold text-slate-700">
                              Product Contribution Rating
                            </span>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                <div className="pt-2 flex justify-between items-center text-[10px] text-slate-400 font-mono">
                  <span>Data Model Type: Star Schema Relational</span>
                  <span>Interactive Drill-Down Included</span>
                </div>

              </div>

            </div>

            {/* Right Block: Dynamic DAX Calculations - Col span 5 */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              
              <div className="bg-indigo-950 p-5 rounded-xl border border-indigo-950 shadow-md flex flex-col justify-between h-full space-y-4">
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-indigo-400">
                    <Code className="w-4 h-4" />
                    <span className="text-[10px] font-mono uppercase tracking-widest font-bold">
                      Calculated DAX Logic
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white font-display">
                    {project.title} Formulas
                  </h3>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    This custom DAX measure was programmed to answer stakeholder queries. Try switching the filter scope to see how calculations change!
                  </p>
                </div>

                {/* DAX Display Pre */}
                <div className="bg-indigo-900 p-4 rounded-xl border border-indigo-950 overflow-x-auto my-1">
                  <pre className="font-mono text-xs text-indigo-200 leading-relaxed whitespace-pre select-all">
                    <code>{data.daxSnippet}</code>
                  </pre>
                </div>

                {/* Recruiter Alert Info */}
                <div className="p-4 rounded-xl bg-indigo-900 border border-indigo-950 space-y-2">
                  <div className="flex items-center space-x-1.5 text-xs font-semibold text-white">
                    <Award className="w-4 h-4 text-amber-400" />
                    <span>Hiring Manager Insight</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-normal">
                    This represents standard DAX code used in Power BI. By structuring variables (VAR/RETURN), I optimize calculation speeds over large tables.
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
