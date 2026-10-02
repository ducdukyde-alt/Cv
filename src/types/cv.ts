export type Language = 'vi' | 'zh' | 'en';

export type MultilingualText = {
  vi: string;
  zh: string;
  en: string;
};

export interface PersonalInfo {
  fullName: MultilingualText;
  title: MultilingualText;
  summary: MultilingualText;
  email: string;
  phone: string;
  location: MultilingualText;
  avatarUrl: string;
  website: string;
  github: string;
  linkedin: string;
}

export interface ExperienceItem {
  id: string;
  role: MultilingualText;
  company: MultilingualText;
  location: MultilingualText;
  startDate: string;
  endDate: string;
  current: boolean;
  highlights: MultilingualText[];
  technologies: string[];
}

export interface EducationItem {
  id: string;
  degree: MultilingualText;
  institution: MultilingualText;
  location: MultilingualText;
  startYear: string;
  endYear: string;
  gpa?: string;
  details: MultilingualText;
}

export interface SkillGroup {
  id: string;
  category: MultilingualText;
  skills: string[];
}

export interface ProjectItem {
  id: string;
  title: MultilingualText;
  subtitle: MultilingualText;
  description: MultilingualText;
  technologies: string[];
  link?: string;
  github?: string;
}

export interface LanguageItem {
  id: string;
  name: MultilingualText;
  proficiency: MultilingualText;
  levelPercent: number; // 0 - 100
}

export interface CertificationItem {
  id: string;
  name: MultilingualText;
  issuer: MultilingualText;
  year: string;
  credentialUrl?: string;
}

export interface CVData {
  personal: PersonalInfo;
  experiences: ExperienceItem[];
  education: EducationItem[];
  skillGroups: SkillGroup[];
  projects: ProjectItem[];
  languages: LanguageItem[];
  certifications: CertificationItem[];
}

export type CVTheme = 'editorial' | 'executive' | 'minimal';
