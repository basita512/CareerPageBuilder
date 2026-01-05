import swaggerJsdoc from 'swagger-jsdoc';
import { SwaggerDefinition } from 'swagger-jsdoc';
const PORT = process.env.PORT;

const swaggerDefinition: SwaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'CareerPageBuilder API',
        version: '1.0.0',
        description: 'API documentation for CareerPageBuilder - Create beautiful career pages with job listings, company branding, and analytics',
        contact: {
            name: 'API Support',
            email: 'support@careerpagebuilder.com',
        },
    },
    servers: [
        {
            url: `http://localhost:${PORT}`,
            description: 'Development server',
        },
        {
            url: 'https://api.careerpagebuilder.com',
            description: 'Production server',
        },
    ],
    tags: [
        {
            name: 'Auth',
            description: 'Authentication and user management endpoints',
        },
        {
            name: 'Companies',
            description: 'Company profile and branding management',
        },
        {
            name: 'Jobs',
            description: 'Job posting creation, management, and listing',
        },
        {
            name: 'Sections',
            description: 'Career page section management (hero, about, values, etc.)',
        },
        {
            name: 'Analytics',
            description: 'Track and analyze page and job views',
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                description: 'Enter your JWT token obtained from the login endpoint',
            },
        },
    },
    security: [],
};

const options: swaggerJsdoc.Options = {
    swaggerDefinition,
    apis: [
        './src/routes/*.ts',
        './src/controllers/*.ts',
    ],
};

export const swaggerSpec = swaggerJsdoc(options);
