import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from './generated/prisma/client';
import { Pool } from 'pg';

const connectionString = `${process.env.DATABASE_URL}`;

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('🌱 Seeding database...');

    // Clear existing data
    await prisma.analyticsEvent.deleteMany();
    await prisma.job.deleteMany();
    await prisma.section.deleteMany();
    await prisma.user.deleteMany();
    await prisma.company.deleteMany();

    // Company 1: TechCorp - A modern tech company
    const techCorp = await prisma.company.create({
        data: {
            name: 'TechCorp Solutions',
            slug: 'techcorp',
            website: 'https://techcorp.example.com',
            email: 'careers@techcorp.example.com',
            logoUrl: 'https://via.placeholder.com/200x200/4F46E5/ffffff?text=TechCorp',
            bannerUrl: 'https://via.placeholder.com/1200x400/4F46E5/ffffff?text=TechCorp+Banner',
            colors: {
                primary: "#451952", // Sunset Vibes
                secondary: "#F59F59",
                accent: "#AF445A",
                background: "#1D1A39",
                surface: "#662549",
                muted: "#E8BCB9",
            },
            themeMode: 'light',
            fontFamily: 'Inter',
            metaTitle: 'Join TechCorp - Build the Future',
            metaDescription: 'Join our team of innovators building cutting-edge software solutions',
            faviconUrl: 'https://via.placeholder.com/32x32/4F46E5/ffffff?text=TC',
            isActive: true,
            publishedAt: new Date(),
        },
    });

    // Company 2: GreenEnergy - Sustainable energy company
    const greenEnergy = await prisma.company.create({
        data: {
            name: 'GreenEnergy Inc',
            slug: 'greenenergy',
            website: 'https://greenenergy.example.com',
            email: 'jobs@greenenergy.example.com',
            logoUrl: 'https://via.placeholder.com/200x200/10B981/ffffff?text=GreenEnergy',
            bannerUrl: 'https://via.placeholder.com/1200x400/10B981/ffffff?text=GreenEnergy+Banner',
            colors: {
                primary: "#5f7674", // Industrial Earth
                secondary: "#b94d22",
                accent: "#3f5252",
                background: "#293131",
                surface: "#1e201e",
                muted: "#afb3b1",
            },
            themeMode: 'light',
            fontFamily: 'Roboto',
            metaTitle: 'GreenEnergy Careers - Power the Future',
            metaDescription: 'Help us build a sustainable future with renewable energy solutions',
            faviconUrl: 'https://via.placeholder.com/32x32/10B981/ffffff?text=GE',
            isActive: true,
            publishedAt: new Date(),
        },
    });

    console.log('✅ Created companies');

    // Create admin users (password: Admin123!)
    const passwordHash = await bcrypt.hash('Admin@123', 10);

    await prisma.user.create({
        data: {
            email: 'admin@techcorp.example.com',
            name: 'John Smith',
            passwordHash,
            companyId: techCorp.id,
            role: 'admin',
        },
    });

    await prisma.user.create({
        data: {
            email: 'admin@greenenergy.example.com',
            name: 'Sarah Johnson',
            passwordHash,
            companyId: greenEnergy.id,
            role: 'admin',
        },
    });

    console.log('✅ Created admin users');

    // TechCorp Career Page Sections
    await prisma.section.createMany({
        data: [
            {
                companyId: techCorp.id,
                type: 'hero',
                title: 'Build the Future with Us',
                orderIndex: 0,
                isVisible: true,
                content: {
                    heading: 'Join TechCorp Solutions',
                    subheading: 'Where innovation meets opportunity',
                    ctaText: 'View Open Positions',
                    backgroundImage: 'https://via.placeholder.com/1920x600/4F46E5/ffffff?text=Hero+Image',
                },
            },
            {
                companyId: techCorp.id,
                type: 'about',
                title: 'About TechCorp',
                orderIndex: 1,
                isVisible: true,
                content: {
                    text: 'We are a leading software company building products that millions use every day. Our mission is to empower businesses through technology.',
                },
            },
            {
                companyId: techCorp.id,
                type: 'values',
                title: 'Our Values',
                orderIndex: 2,
                isVisible: true,
                content: {
                    values: [
                        { title: 'Innovation', description: 'We embrace change and push boundaries' },
                        { title: 'Collaboration', description: 'We work together to achieve greatness' },
                        { title: 'Excellence', description: 'We strive for quality in everything we do' },
                    ],
                },
            },
        ],
    });

    // GreenEnergy Career Page Sections
    await prisma.section.createMany({
        data: [
            {
                companyId: greenEnergy.id,
                type: 'hero',
                title: 'Power the Future',
                orderIndex: 0,
                isVisible: true,
                content: {
                    heading: 'Join GreenEnergy',
                    subheading: 'Make a real impact on our planet',
                    ctaText: 'Explore Careers',
                    backgroundImage: 'https://via.placeholder.com/1920x600/10B981/ffffff?text=Hero+Image',
                },
            },
            {
                companyId: greenEnergy.id,
                type: 'about',
                title: 'Our Mission',
                orderIndex: 1,
                isVisible: true,
                content: {
                    text: 'GreenEnergy is committed to creating sustainable energy solutions for a better tomorrow. Join us in our mission to make renewable energy accessible to everyone.',
                },
            },
        ],
    });

    console.log('✅ Created career page sections');

    // TechCorp Jobs
    await prisma.job.createMany({
        data: [
            {
                companyId: techCorp.id,
                slug: 'senior-software-engineer-backend',
                title: 'Senior Software Engineer - Backend',
                description: 'We are looking for an experienced backend engineer to join our core platform team. You will be responsible for designing and building scalable microservices.',
                department: 'Engineering',
                location: 'San Francisco, CA',
                locationType: 'hybrid',
                jobType: 'full-time',
                contractType: 'permanent',
                seniority: 'senior',
                salaryMin: 120000,
                salaryMax: 180000,
                salaryCurrency: 'USD',
                requirements: [
                    '5+ years of backend development experience',
                    'Strong knowledge of Node.js and TypeScript',
                    'Experience with PostgreSQL and Redis',
                    'Understanding of microservices architecture',
                ],
                responsibilities: [
                    'Design and implement RESTful APIs',
                    'Optimize database queries and performance',
                    'Mentor junior developers',
                    'Participate in code reviews',
                ],
                niceToHave: [
                    'Experience with AWS or GCP',
                    'Knowledge of Kubernetes',
                    'Open source contributions',
                ],
                isActive: true,
                postedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
            },
            {
                companyId: techCorp.id,
                slug: 'frontend-developer-react',
                title: 'Frontend Developer - React',
                description: 'Join our frontend team to build beautiful, responsive user interfaces using modern React and TypeScript.',
                department: 'Engineering',
                location: 'Remote',
                locationType: 'remote',
                jobType: 'full-time',
                contractType: 'permanent',
                seniority: 'mid',
                salaryMin: 90000,
                salaryMax: 130000,
                salaryCurrency: 'USD',
                requirements: [
                    '3+ years of React development',
                    'Strong CSS and responsive design skills',
                    'Experience with TypeScript',
                    'Understanding of state management (Redux/Zustand)',
                ],
                responsibilities: [
                    'Build reusable UI components',
                    'Implement pixel-perfect designs',
                    'Optimize frontend performance',
                    'Write unit and integration tests',
                ],
                niceToHave: [
                    'Experience with Next.js',
                    'Knowledge of Tailwind CSS',
                    'Design system experience',
                ],
                isActive: true,
                postedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
            },
            {
                companyId: techCorp.id,
                slug: 'product-manager',
                title: 'Product Manager',
                description: 'Lead product strategy and execution for our flagship platform. Work cross-functionally with engineering, design, and business teams.',
                department: 'Product',
                location: 'New York, NY',
                locationType: 'onsite',
                jobType: 'full-time',
                contractType: 'permanent',
                seniority: 'senior',
                salaryMin: 130000,
                salaryMax: 170000,
                salaryCurrency: 'USD',
                requirements: [
                    '5+ years of product management experience',
                    'Strong analytical and strategic thinking',
                    'Experience with B2B SaaS products',
                    'Excellent communication skills',
                ],
                responsibilities: [
                    'Define product roadmap and strategy',
                    'Gather and prioritize requirements',
                    'Work with engineering to ship features',
                    'Analyze metrics and user feedback',
                ],
                niceToHave: [
                    'Technical background',
                    'MBA or equivalent',
                    'Experience with agile methodologies',
                ],
                isActive: true,
                postedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
            },
        ],
    });

    // GreenEnergy Jobs
    await prisma.job.createMany({
        data: [
            {
                companyId: greenEnergy.id,
                slug: 'renewable-energy-engineer',
                title: 'Renewable Energy Engineer',
                description: 'Design and implement solar and wind energy solutions for residential and commercial clients.',
                department: 'Engineering',
                location: 'Austin, TX',
                locationType: 'hybrid',
                jobType: 'full-time',
                contractType: 'permanent',
                seniority: 'mid',
                salaryMin: 80000,
                salaryMax: 110000,
                salaryCurrency: 'USD',
                requirements: [
                    'Bachelor\'s degree in Electrical Engineering',
                    '3+ years in renewable energy',
                    'Knowledge of solar panel systems',
                    'Project management experience',
                ],
                responsibilities: [
                    'Design renewable energy systems',
                    'Conduct site assessments',
                    'Oversee installation projects',
                    'Ensure compliance with regulations',
                ],
                niceToHave: [
                    'PE license',
                    'LEED certification',
                    'Experience with energy storage',
                ],
                isActive: true,
                postedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            },
            {
                companyId: greenEnergy.id,
                slug: 'sustainability-consultant',
                title: 'Sustainability Consultant',
                description: 'Help businesses transition to renewable energy and reduce their carbon footprint.',
                department: 'Consulting',
                location: 'Remote',
                locationType: 'remote',
                jobType: 'full-time',
                contractType: 'permanent',
                seniority: 'entry',
                salaryMin: 60000,
                salaryMax: 80000,
                salaryCurrency: 'USD',
                requirements: [
                    'Bachelor\'s degree in Environmental Science or related field',
                    '1-2 years of relevant experience',
                    'Passion for sustainability',
                    'Strong analytical skills',
                ],
                responsibilities: [
                    'Conduct energy audits',
                    'Develop sustainability strategies',
                    'Present findings to clients',
                    'Track and report on metrics',
                ],
                niceToHave: [
                    'Certification in sustainability',
                    'Experience with carbon accounting',
                    'Knowledge of ESG frameworks',
                ],
                isActive: true,
                postedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
            },
        ],
    });

    // Generate Analytics Data
    console.log('📊 Generating analytics data...');

    const eventTypes = ['page_view', 'job_view', 'apply_click'];
    const companies = [techCorp.id, greenEnergy.id];
    const techCorpJobs = await prisma.job.findMany({ where: { companyId: techCorp.id } });
    const greenEnergyJobs = await prisma.job.findMany({ where: { companyId: greenEnergy.id } });

    const analyticsData = [];

    // Helper to generate random date within last 30 days
    const getRandomDate = () => {
        const date = new Date();
        date.setDate(date.getDate() - Math.floor(Math.random() * 30));
        return date;
    };

    // Generate 500 random events
    for (let i = 0; i < 500; i++) {
        const companyId = companies[Math.floor(Math.random() * companies.length)];
        const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
        let jobId = null;

        // If job related event, pick a random job from that company
        if (eventType !== 'page_view') {
            const jobs = companyId === techCorp.id ? techCorpJobs : greenEnergyJobs;
            if (jobs.length > 0) {
                jobId = jobs[Math.floor(Math.random() * jobs.length)].id;
            }
        }

        analyticsData.push({
            companyId,
            jobId,
            eventType,
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            ipAddress: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
            referrer: Math.random() > 0.5 ? 'https://google.com' : 'https://linkedin.com',
            createdAt: getRandomDate(),
        });
    }

    await prisma.analyticsEvent.createMany({
        data: analyticsData,
    });

    console.log('✅ Generated 500 analytics events');

    console.log('🎉 Seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   Companies: 2`);
    console.log(`   Users: 2`);
    console.log(`   Sections: 5`);
    console.log(`   Jobs: 5`);
    console.log('\n🔐 Login Credentials:');
    console.log(`   TechCorp Admin: admin@techcorp.example.com / Admin123!`);
    console.log(`   GreenEnergy Admin: admin@greenenergy.example.com / Admin123!`);
}

main()
    .catch((e) => {
        console.error('❌ Seeding failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
