export interface ProjectInsight {
  metric: string;
  value: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  company?: string;
  date: string;
  duration?: string;
  tools: string[];
  description: string;
  bullets: string[];
  insights: ProjectInsight[];
  category: 'BI' | 'SQL' | 'KPI';
  link?: string;
  github?: string;
  featured: boolean;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  link?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  duration: string;
  description: string;
  bullets: string[];
  skillsLearned: string[];
}

export interface SkillGroup {
  category: string;
  icon: string;
  skills: { name: string; level: number }[]; // Level out of 100 for visual bars
}
