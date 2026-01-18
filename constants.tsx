
import { Job, Student, Company } from './types';

export const MOCK_JOBS: Job[] = [
  {
    id: '1',
    title: 'Frontend React Developer',
    company: 'TechFlow Solutions',
    location: 'Karachi, PK',
    salary: 'Rs. 80,000 - 120,000',
    type: 'Full-time',
    category: 'Software Development',
    description: 'We are looking for a passionate React developer to join our growing team.',
    requirements: ['3+ years React experience', 'Tailwind CSS', 'TypeScript'],
    postedAt: '2 days ago',
    logo: 'https://picsum.photos/seed/tech1/100/100'
  }
];

export const MOCK_STUDENTS: Student[] = [
  { 
    id: 's1', 
    name: 'Zaid Khan', 
    email: 'zaid@example.com', 
    number: '0300-1234567',
    address: 'Gulshan-e-Iqbal, Karachi',
    campus: 'Main Campus',
    course: 'Python Development', 
    batch: 'Batch 2',
    skills: ['Python', 'Django', 'SQL'],
    experiences: '6 months internship at a local startup.',
    github: 'https://github.com/zaidkhan',
    portfolio: 'https://zaid.dev',
    // Added missing required property
    courseProjects: []
  },
  { 
    id: 's2', 
    name: 'Sara Ahmed', 
    email: 'sara@example.com', 
    number: '0321-7654321',
    address: 'Johar Town, Lahore',
    campus: 'Lahore Campus',
    course: 'Graphic Design', 
    batch: 'Batch 1',
    skills: ['Figma', 'Photoshop'],
    experiences: 'Freelance designer for 1 year.',
    github: '',
    portfolio: 'https://behance.net/sara',
    // Added missing required property
    courseProjects: []
  }
];

export const MOCK_COMPANIES: Company[] = [
  { 
    id: 'c1', 
    name: 'TechFlow Solutions', 
    industry: 'IT Services', 
    website: 'techflow.pk', 
    logo: 'https://picsum.photos/seed/tech1/100/100',
    requiredRoles: ['Web Developer', 'UI/UX Designer']
  }
];

export const JOB_CATEGORIES = [
  'Software Development',
  'Marketing',
  'Design',
  'Data Science',
  'Customer Support',
  'Sales',
  'Finance'
];