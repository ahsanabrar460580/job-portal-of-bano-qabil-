
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

export interface UserProfile {
  name: string;
  email: string;
  bio: string;
  skills: string[];
}

export enum ViewState {
  HOME = 'HOME',
  JOB_DETAILS = 'JOB_DETAILS',
  AI_ASSISTANT = 'AI_ASSISTANT',
  DASHBOARD = 'DASHBOARD'
}
