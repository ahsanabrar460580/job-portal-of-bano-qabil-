
export type UserRole = 'STUDENT' | 'COMPANY' | 'ADMIN';

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: 'Full-time' | 'Part-time' | 'Remote' | 'Internship';
  category: string;
  description: string;
  requirements: string[];
  postedAt: string;
  logo: string;
}

export interface CourseProject {
  title: string;
  description: string;
  link?: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  number: string;
  address: string;
  campus: string;
  course: string;
  batch: string;
  skills: string[];
  experiences: string;
  courseProjects: CourseProject[];
  github?: string;
  portfolio?: string;
  otherDetails?: string;
}

export interface Company {
  id: string;
  name: string;
  industry: string;
  website: string;
  logo: string;
  requiredRoles: string[];
  description?: string;
}

export interface Interaction {
  id: string;
  type: 'APPLICATION' | 'HIRING';
  fromName: string;
  toName: string;
  itemName: string; // Job title or Student Course
  timestamp: string;
}

export enum ViewState {
  LOGIN = 'LOGIN',
  PROFILE_SETUP = 'PROFILE_SETUP',
  HOME = 'HOME',
  JOB_DETAILS = 'JOB_DETAILS',
  AI_ASSISTANT = 'AI_ASSISTANT',
  DASHBOARD = 'DASHBOARD',
  ADMIN = 'ADMIN',
  COMPANY_PORTAL = 'COMPANY_PORTAL',
  STUDENT_CV = 'STUDENT_CV'
}
