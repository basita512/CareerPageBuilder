import { Company, Job, Section } from '@/types';

export const sampleCompany: Company = {
  id: 'clxxx123456',
  slug: 'acme-corp',
  name: 'Acme Corporation',
  website: 'https://acme.com',
  logoUrl: '/placeholder.svg',
  description: 'Building the future of enterprise software, one innovation at a time.',
  primaryColor: '#059669',
  secondaryColor: '#fbbf24',
};

export const sampleJobs: Job[] = [
  {
    id: 'job-1',
    companyId: 'clxxx123456',
    title: 'Senior Frontend Engineer',
    department: 'Engineering',
    location: 'San Francisco, CA',
    jobType: 'full-time',
    description: 'We are looking for a Senior Frontend Engineer to join our team and help build the next generation of our product. You will work closely with designers and backend engineers to create beautiful, performant user interfaces.',
    requirements: [
      '5+ years of experience with React and TypeScript',
      'Strong understanding of modern CSS and design systems',
      'Experience with testing frameworks like Jest and React Testing Library',
      'Excellent communication and collaboration skills',
    ],
    benefits: [
      'Competitive salary and equity',
      'Health, dental, and vision insurance',
      'Flexible work arrangements',
      '401(k) matching',
    ],
    salaryRange: { min: 150000, max: 200000, currency: 'USD' },
    applyUrl: 'https://apply.acme.com/senior-frontend',
    isActive: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
  },
  {
    id: 'job-2',
    companyId: 'clxxx123456',
    title: 'Product Designer',
    department: 'Design',
    location: 'New York, NY',
    jobType: 'full-time',
    description: 'Join our design team to create intuitive and delightful user experiences. You will work on everything from user research to high-fidelity prototypes.',
    requirements: [
      '3+ years of product design experience',
      'Strong portfolio showcasing end-to-end design work',
      'Proficiency in Figma and design systems',
      'Experience conducting user research',
    ],
    benefits: [
      'Competitive salary and equity',
      'Unlimited PTO',
      'Learning and development budget',
      'Home office stipend',
    ],
    salaryRange: { min: 120000, max: 160000, currency: 'USD' },
    applyUrl: 'https://apply.acme.com/product-designer',
    isActive: true,
    createdAt: '2024-01-10',
    updatedAt: '2024-01-12',
  },
  {
    id: 'job-3',
    companyId: 'clxxx123456',
    title: 'Backend Engineer',
    department: 'Engineering',
    location: 'Remote',
    jobType: 'full-time',
    description: 'Build scalable backend systems that power our platform. Work with cutting-edge technologies and solve complex distributed systems challenges.',
    requirements: [
      '4+ years of backend development experience',
      'Proficiency in Node.js, Python, or Go',
      'Experience with PostgreSQL and Redis',
      'Knowledge of cloud platforms (AWS, GCP)',
    ],
    benefits: [
      'Fully remote position',
      'Competitive compensation',
      'Quarterly team offsites',
      'Equipment budget',
    ],
    salaryRange: { min: 140000, max: 180000, currency: 'USD' },
    applyUrl: 'https://apply.acme.com/backend-engineer',
    isActive: true,
    createdAt: '2024-01-08',
    updatedAt: '2024-01-08',
  },
  {
    id: 'job-4',
    companyId: 'clxxx123456',
    title: 'Engineering Manager',
    department: 'Engineering',
    location: 'San Francisco, CA',
    jobType: 'full-time',
    description: 'Lead a team of talented engineers to deliver high-impact projects. Foster a culture of growth, collaboration, and technical excellence.',
    requirements: [
      '7+ years of software development experience',
      '2+ years of people management experience',
      'Track record of shipping successful products',
      'Strong technical background and mentoring skills',
    ],
    benefits: [
      'Executive compensation package',
      'Leadership development programs',
      'Sabbatical program',
      'Extended parental leave',
    ],
    salaryRange: { min: 200000, max: 280000, currency: 'USD' },
    applyUrl: 'https://apply.acme.com/engineering-manager',
    isActive: true,
    createdAt: '2024-01-05',
    updatedAt: '2024-01-05',
  },
  {
    id: 'job-5',
    companyId: 'clxxx123456',
    title: 'Marketing Intern',
    department: 'Marketing',
    location: 'New York, NY',
    jobType: 'internship',
    description: 'Join our marketing team for a summer internship and gain hands-on experience in B2B marketing, content creation, and campaign management.',
    requirements: [
      'Currently pursuing a degree in Marketing or related field',
      'Strong written and verbal communication skills',
      'Interest in technology and B2B SaaS',
      'Creative mindset and attention to detail',
    ],
    benefits: [
      'Competitive hourly rate',
      'Mentorship program',
      'Networking opportunities',
      'Potential for full-time conversion',
    ],
    applyUrl: 'https://apply.acme.com/marketing-intern',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: 'job-6',
    companyId: 'clxxx123456',
    title: 'DevOps Contractor',
    department: 'Engineering',
    location: 'Remote',
    jobType: 'contract',
    description: 'Help us improve our CI/CD pipelines and infrastructure automation. This is a 6-month contract with potential for extension.',
    requirements: [
      'Strong experience with Kubernetes and Docker',
      'Proficiency in Terraform and Infrastructure as Code',
      'Experience with GitHub Actions or similar CI/CD tools',
      'AWS certifications preferred',
    ],
    benefits: [
      'Competitive contract rate',
      'Flexible schedule',
      'Work with modern tech stack',
      'Remote-first culture',
    ],
    applyUrl: 'https://apply.acme.com/devops-contractor',
    isActive: true,
    createdAt: '2024-01-03',
    updatedAt: '2024-01-03',
  },
];

export const sampleSections: Section[] = [
  {
    id: 'section-1',
    companyId: 'clxxx123456',
    type: 'hero',
    title: 'Build the Future With Us',
    content: {
      subtitle: 'Join a team of innovators, dreamers, and builders who are reshaping how enterprises operate.',
      ctaText: 'View Open Positions',
      ctaUrl: '#jobs',
    },
    orderIndex: 0,
    isVisible: true,
  },
  {
    id: 'section-2',
    companyId: 'clxxx123456',
    type: 'about',
    title: 'About Acme',
    content: {
      description: "We're on a mission to transform how businesses operate. Founded in 2018, we've grown from a small startup to a global team of 200+ passionate individuals. Our platform powers thousands of companies worldwide, and we're just getting started.",
      stats: [
        { label: 'Team Members', value: '200+' },
        { label: 'Countries', value: '15' },
        { label: 'Customers', value: '5,000+' },
        { label: 'Raised', value: '$50M' },
      ],
    },
    orderIndex: 1,
    isVisible: true,
  },
  {
    id: 'section-3',
    companyId: 'clxxx123456',
    type: 'values',
    title: 'Our Values',
    content: {
      values: [
        {
          icon: '🚀',
          title: 'Move Fast',
          description: 'We ship quickly, learn from feedback, and iterate. Speed is a feature.',
        },
        {
          icon: '🤝',
          title: 'Build Together',
          description: 'The best ideas come from collaboration. We win as a team.',
        },
        {
          icon: '💡',
          title: 'Think Big',
          description: "We tackle ambitious problems and don't shy away from challenges.",
        },
        {
          icon: '🎯',
          title: 'Customer First',
          description: 'Everything we do starts with understanding our customers.',
        },
      ],
    },
    orderIndex: 2,
    isVisible: true,
  },
  {
    id: 'section-4',
    companyId: 'clxxx123456',
    type: 'benefits',
    title: 'Why Join Us?',
    content: {
      benefits: [
        {
          icon: '💰',
          title: 'Competitive Compensation',
          description: 'Top-tier salary, equity, and performance bonuses.',
        },
        {
          icon: '🏥',
          title: 'Health & Wellness',
          description: 'Comprehensive health, dental, and vision coverage for you and your family.',
        },
        {
          icon: '🏠',
          title: 'Flexible Work',
          description: 'Remote-first culture with optional office hubs in major cities.',
        },
        {
          icon: '📚',
          title: 'Learning Budget',
          description: '$2,000 annual stipend for courses, conferences, and books.',
        },
        {
          icon: '✈️',
          title: 'Unlimited PTO',
          description: 'Take the time you need to recharge and come back refreshed.',
        },
        {
          icon: '👶',
          title: 'Parental Leave',
          description: '16 weeks paid leave for all new parents.',
        },
      ],
    },
    orderIndex: 3,
    isVisible: true,
  },
  {
    id: 'section-5',
    companyId: 'clxxx123456',
    type: 'testimonials',
    title: 'Life at Acme',
    content: {
      testimonials: [
        {
          quote: "Joining Acme was the best career decision I've made. The culture here is incredible, and I'm constantly learning from talented teammates.",
          author: 'Sarah Chen',
          role: 'Senior Engineer',
          avatar: '/placeholder.svg',
        },
        {
          quote: "What I love most is the ownership we get. From day one, I was trusted to make meaningful contributions to our product.",
          author: 'Marcus Johnson',
          role: 'Product Designer',
          avatar: '/placeholder.svg',
        },
        {
          quote: "The flexibility and support for personal growth is unmatched. Acme truly invests in its people.",
          author: 'Emily Rodriguez',
          role: 'Engineering Manager',
          avatar: '/placeholder.svg',
        },
      ],
    },
    orderIndex: 4,
    isVisible: true,
  },
  {
    id: 'section-6',
    companyId: 'clxxx123456',
    type: 'cta',
    title: 'Ready to Make an Impact?',
    content: {
      description: "We're always looking for talented people to join our team. Even if you don't see a perfect fit, reach out – we'd love to hear from you.",
      primaryCta: { text: 'View All Openings', url: '#jobs' },
      secondaryCta: { text: 'General Application', url: '#apply' },
    },
    orderIndex: 5,
    isVisible: true,
  },
];

// Helper function to get unique values for filters
export const getUniqueLocations = (jobs: Job[]): string[] => {
  return [...new Set(jobs.filter(j => j.isActive).map(j => j.location))];
};

export const getUniqueDepartments = (jobs: Job[]): string[] => {
  return [...new Set(jobs.filter(j => j.isActive).map(j => j.department))];
};

export const getUniqueJobTypes = (jobs: Job[]): string[] => {
  return [...new Set(jobs.filter(j => j.isActive).map(j => j.jobType))];
};
