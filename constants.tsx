
import { Job } from './types';

export const MOCK_JOBS: Job[] = [
  {
    id: '1',
    title: 'Frontend React Developer',
    company: 'TechFlow Solutions',
    location: 'Karachi, PK',
    salary: 'Rs. 80,000 - 120,000',
    type: 'Full-time',
    category: 'Software Development',
    description: 'We are looking for a passionate React developer to join our growing team. You will be responsible for building high-quality web applications.',
    requirements: ['3+ years React experience', 'Tailwind CSS', 'TypeScript', 'State Management'],
    postedAt: '2 days ago',
    logo: 'https://picsum.photos/seed/tech1/100/100'
  },
  {
    id: '2',
    title: 'Digital Marketing Intern',
    company: 'Skyline Agency',
    location: 'Lahore, PK',
    salary: 'Rs. 20,000 - 30,000',
    type: 'Internship',
    category: 'Marketing',
    description: 'Learn the ropes of digital marketing in a fast-paced environment. Great opportunity for Bano Qabil graduates.',
    requirements: ['Social Media management', 'Basic SEO', 'Content Writing'],
    postedAt: 'Just now',
    logo: 'https://picsum.photos/seed/sky/100/100'
  },
  {
    id: '3',
    title: 'UI/UX Designer',
    company: 'Creative Labs',
    location: 'Remote',
    salary: 'Rs. 100,000 - 150,000',
    type: 'Remote',
    category: 'Design',
    description: 'Design beautiful interfaces for global clients. Proficiency in Figma is a must.',
    requirements: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
    postedAt: '5 hours ago',
    logo: 'https://picsum.photos/seed/creative/100/100'
  },
  {
    id: '4',
    title: 'Python Developer',
    company: 'DataGen Systems',
    location: 'Karachi, PK',
    salary: 'Rs. 90,000 - 140,000',
    type: 'Full-time',
    category: 'Data Science',
    description: 'Work on cutting-edge data pipelines and machine learning models.',
    requirements: ['Python', 'SQL', 'Pandas', 'API Development'],
    postedAt: '1 day ago',
    logo: 'https://picsum.photos/seed/data/100/100'
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
