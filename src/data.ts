import { Project, Certificate, Experience, SkillGroup } from './types';

export const PERSONAL_INFO = {
  name: 'Karim Elkorat',
  title: 'Data Analyst',
  subTitle: 'Transforming complex data into clear, interactive insights',
  location: 'Egypt (Available for Remote / Hybrid Work)',
  email: 'karimelkorat10@gmail.com',
  github: 'https://github.com/karimelkorat',
  linkedin: 'https://linkedin.com/in/karim-elkorat',
  about: 'I am a passionate and detail-oriented Data Analyst. I love working with data to find patterns and help businesses make smarter choices. My technical focus is on building user-friendly dashboards in Power BI, writing clean SQL queries, and designing efficient data models with Star Schema. I pride myself on explaining complex findings in simple terms so stakeholders can take action. I am constantly learning new techniques to improve my analytical workflow.',
  summaryCards: [
    { label: 'Dashboards Built', value: '15+', description: 'Interactive visual reports' },
    { label: 'Data Cleaned', value: '1M+ Rows', description: 'Using Power Query & SQL' },
    { label: 'Project Speed', value: 'Rapid Delivery', description: 'Including 24-hour urgent reports' }
  ]
};

export const PROJECTS: Project[] = [
  {
    id: 'hr-kpi-analysis',
    title: 'HR Data KPI Analysis',
    company: 'Confidential Company Project',
    date: 'April 2026',
    duration: '2 Weeks',
    tools: ['Power BI', 'Power Query', 'DAX', 'Data Modeling', 'Microsoft Excel'],
    description: 'Designed and built a comprehensive HR KPI Dashboard for a confidential company to analyze employee retention, turnover, and headcount distribution.',
    bullets: [
      'Cleaned and anonymized sensitive employee records using Power Query and advanced Excel formulas.',
      'Developed core DAX measures to calculate Monthly Turnover Rate, Retention Percentage, and Headcount Growth.',
      'Designed executive visual layouts showing department-wise turnover and gender pay equity metrics.',
      'Provided insights that helped leadership spot high-turnover departments, saving prospective recruitment costs.'
    ],
    insights: [
      { metric: 'Manual Reporting', value: '-75%', description: 'Reduction in regular reporting effort' },
      { metric: 'Insights Found', value: '3 Key Areas', description: 'Identified departments needing culture reviews' },
      { metric: 'Data Quality', value: '100% Secure', description: 'Strict confidentiality standards maintained' }
    ],
    category: 'KPI',
    featured: true
    // No "link" or "github" provided, button will automatically be hidden
  },
  {
    id: 'maven-market',
    title: 'Maven Market Analysis',
    company: 'Maven Market Retail Chain',
    date: 'January 2026',
    duration: '3 Weeks',
    tools: ['Power BI', 'Power Query', 'DAX', 'Star Schema', 'Data Modeling'],
    description: 'Developed an interactive Business Intelligence solution for Maven Market, a multinational retail grocery chain, to analyze global transactions and store performance.',
    bullets: [
      'Connected, cleaned, and merged separate datasets (customers, products, transactions, and stores) using Power Query.',
      'Engineered an optimized star schema data model with defined primary/foreign relationships and a calendar dimension table.',
      'Created complex DAX measures including Total Profit YTD, Return Rate by Product, and Target Goal Achievement %.',
      'Added rich UX features like conditional formatting, dynamic drill-through filters, and hover tooltips for deeper exploration.'
    ],
    insights: [
      { metric: 'Transactions Modeled', value: '100k+', description: 'Smooth dashboard performance achieved' },
      { metric: 'Product Metrics', value: '12 Measures', description: 'Written for precise financial tracking' },
      { metric: 'Stakeholder Feedback', value: 'Excellent', description: 'Enabled regional managers to spot high-return items' }
    ],
    category: 'BI',
    featured: true,
    link: 'https://github.com/karimelkorat/maven-market-analysis',
    github: 'https://github.com/karimelkorat/maven-market-analysis'
  },
  {
    id: 'adventureworks',
    title: 'AdventureWorks Analysis',
    company: 'AdventureWorks Cycles',
    date: 'February 2026',
    duration: '2 Weeks',
    tools: ['Power BI', 'Power Query', 'DAX', 'Star Schema', 'Data Visualization'],
    description: 'Built an end-to-end data analysis solution for AdventureWorks, a global cycling manufacturer, to analyze sales trends and customer characteristics.',
    bullets: [
      'Imported and structured transactional sales data, regional territories, and customer information.',
      'Designed a robust, scalable data model to enable accurate cross-filtering and regional sales comparisons.',
      'Programmed DAX formulas for active customer counts, average revenue per customer, and regional rank comparisons.',
      'Developed visual sections for sales managers to track monthly targets and customer demographic attributes.'
    ],
    insights: [
      { metric: 'Data Sources Joined', value: '6 Tables', description: 'Perfect relational structure created' },
      { metric: 'Refresh Time', value: '< 3s', description: 'Highly optimized query loading speed' },
      { metric: 'Geographic Insights', value: 'Interactive Map', description: 'Visualized regional sales density' }
    ],
    category: 'BI',
    featured: true,
    link: 'https://github.com/karimelkorat/adventureworks-analysis',
    github: 'https://github.com/karimelkorat/adventureworks-analysis'
  },
  {
    id: 'egpi-pharma',
    title: 'EGPI Pharmaceutical Data Analysis',
    company: 'EGPI Pharmaceutical',
    date: 'March 2026',
    duration: 'One-day project',
    tools: ['Power BI', 'Power Query', 'Data Cleaning', 'KPI Dashboards'],
    description: 'Executed a rapid, high-intensity data analytics challenge in a single day to clean and visualize pharmaceutical inventory and sales datasets for EGPI.',
    bullets: [
      'Performed rapid ETL steps in Power Query to clean inventory tables, handle null values, and structure dates.',
      'Created essential inventory metrics to highlight distribution bottlenecks and low-stock indicators.',
      'Designed an intuitive, clear executive landing page to display critical drug stocks across regional clinics.',
      'Presented quick, actionable stock management recommendations within the strict 24-hour deadline.'
    ],
    insights: [
      { metric: 'Project Duration', value: '1 Day', description: 'Delivered robust findings under tight time pressure' },
      { metric: 'ETL Actions', value: '15+ Steps', description: 'Standardized dirty medical product names' },
      { metric: 'Key Focus', value: 'Stock Bottlenecks', description: 'Alerted management on critical item distribution' }
    ],
    category: 'SQL',
    featured: true,
    link: 'https://github.com/karimelkorat/egpi-pharma-analysis',
    github: 'https://github.com/karimelkorat/egpi-pharma-analysis'
  }
];

export const CERTIFICATIONS: Certificate[] = [
  {
    id: 'pl-300',
    title: 'Microsoft Certified: Power BI Data Analyst Associate (PL-300)',
    issuer: 'Microsoft',
    date: 'May 2026',
    credentialId: 'MS-99238-PL300',
    link: 'https://learn.microsoft.com/credentials/certifications/power-bi-data-analyst-associate'
  },
  {
    id: 'google-data-analytics',
    title: 'Google Data Analytics Professional Certificate',
    issuer: 'Google (via Coursera)',
    date: 'December 2025',
    credentialId: 'COURSERA-GDA-88329',
    link: 'https://coursera.org/verify/professional-cert/google-data-analytics'
  },
  {
    id: 'sql-fundamentals',
    title: 'SQL Database Querying and Fundamentals Certification',
    issuer: 'DataCamp',
    date: 'October 2025',
    credentialId: 'DC-SQL-55104'
    // No link provided - button will automatically be hidden
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'exp-1',
    role: 'Freelance Data Analyst',
    company: 'Self-Employed',
    location: 'Remote',
    duration: 'December 2025 - Present',
    description: 'Helping local businesses and clients turn raw data into interactive visual reports to drive growth.',
    bullets: [
      'Consulted with small business clients to define key performance metrics (KPIs) and business requirements.',
      'Automated messy monthly Excel spreadsheets into structured Power Query processes, saving clients 10+ hours per month.',
      'Created custom dashboards in Power BI, enabling clients to view real-time sales performance and customer trends.'
    ],
    skillsLearned: ['Power Query', 'Power BI Dashboard Design', 'Client Requirements Gatherings', 'Data Transformation']
  },
  {
    id: 'exp-2',
    role: 'Academic & Personal Data Projects',
    company: 'Portfolio Development',
    location: 'Egypt',
    duration: 'June 2025 - December 2025',
    description: 'Dedicated 6 months to intensive professional development, completing certifications and building real-world projects.',
    bullets: [
      'Developed end-to-end data pipelines involving data extraction, cleaning, star-schema modeling, and DAX implementation.',
      'Built realistic projects modeled after real-world scenarios in retail (Maven Market) and manufacturing (AdventureWorks).',
      'Tested and optimized dashboard query performance, ensuring high usability and fast data refresh rates.'
    ],
    skillsLearned: ['Data Modeling', 'Star Schema Design', 'DAX Measures', 'SQL Queries', 'Business Intelligence']
  }
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: 'Business Intelligence & Reporting',
    icon: 'BarChart3',
    skills: [
      { name: 'Power BI Desktop', level: 90 },
      { name: 'Power Query / ETL', level: 85 },
      { name: 'DAX Formulas', level: 80 },
      { name: 'Microsoft Excel (Advanced)', level: 85 },
      { name: 'Dashboard Design & UX', level: 85 }
    ]
  },
  {
    category: 'Databases & Query Languages',
    icon: 'Database',
    skills: [
      { name: 'SQL Querying (SELECT, JOINS)', level: 80 },
      { name: 'Data Aggregations & CTEs', level: 75 },
      { name: 'PostgreSQL & MySQL', level: 75 },
      { name: 'Data Modeling (Star Schema)', level: 80 }
    ]
  },
  {
    category: 'Methodologies & Communication',
    icon: 'Briefcase',
    skills: [
      { name: 'Data Cleaning & Validation', level: 90 },
      { name: 'KPI and Metric Definition', level: 85 },
      { name: 'Technical Documentation', level: 80 },
      { name: 'Stakeholder Explanations (B2 English)', level: 85 }
    ]
  }
];

export const EDUCATION = {
  degree: 'Bachelor of Science in Business Information Systems',
  institution: 'Helwan University, Cairo',
  duration: 'September 2021 - June 2025',
  details: [
    'Specialized in Database Management, Systems Analysis, and Business Intelligence.',
    'Completed graduation project focused on building predictive analytics models using database systems.',
    'Acquired deep knowledge of enterprise data systems and business operations.'
  ]
};
