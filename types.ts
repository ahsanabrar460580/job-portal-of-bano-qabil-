
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
  type: 'APPLICATION' | 'HIRING' | 'LOGIN' | 'MESSAGE';
  fromId: string;
  fromName: string;
  toId?: string;
  toName?: string;
  itemName: string; 
  timestamp: string;
}

export interface Notification {
  id: string;
  recipientId: string;
  senderName: string;
  message: string;
  type: 'HIRE_OFFER' | 'APPLICATION_ALERT' | 'NEW_MESSAGE';
  timestamp: string;
  isRead: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
}

export interface ChatThread {
  id: string;
  participants: { id: string, name: string, role: UserRole }[];
  lastMessage: string;
  messages: Message[];
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
  STUDENT_CV = 'STUDENT_CV',
  MESSAGES = 'MESSAGES'
}
