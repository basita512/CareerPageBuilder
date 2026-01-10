# Career Page Builder

## Project Overview
This project is a Career Page Builder platform which helps recruiters and ATS providers to create branded career pages for their clients with personal customization and provides job posting insights with a hassle-free job posting process. 

- **Production Live Link:** [Click Here to view app](https://career-page-builder-fe.vercel.app/)
- **API documentation:** [Click Here to view API docs](https://career-page-builder-be.vercel.app/api-docs)

## Features

1.  **Create Accounts:** Register as a recruiter or ATS provider and manage your company account.
2.  **Customize Branding:** Customize your career page with your company's logo, colors, and typography.
3.  **Build Career Page:** Add and edit page sections like "Hero", "About Us", "Our Values", and "Open Positions".
4.  **Manage Jobs:** Add and edit job postings with details like title, description, location, and requirements.
5.  **Analytics:** A dashboard to view page engagement, job clicks, and visitor metrics.
6.  **Preview:** Preview your career page and make any necessary adjustments.
7.  **Publish:** Instantly generate a public-facing URL that is SEO-ready and fully responsive on all devices.

## Running the App Locally

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (cloud or running locally)

### Step-by-Step Instructions

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/basita125/CareerPageBuilder.git
    cd CareerPageBuilder
    ```

2.  **Backend Setup**

    Navigate to the backend directory: 
    ```bash
    cd Backend
    ```
    Install dependencies: 
    ```bash
    npm install
    ```
    Create a `.env` file based on `.env.example` and configure your database connection URL.

    Run database migrations: 
    ```bash
    npx prisma migrate dev
    ```
    Seed the database with sample data: 
    ```bash
    npm run seed
    ```
    Run backend server: 
    ```bash
    npm run dev
    ```

3.  **Frontend Setup**

    Open a new terminal and navigate to the frontend directory: 
    ```bash
    cd Frontend
    ```
    Install dependencies: 
    ```bash
    npm install
    ```
    Create a `.env` file and set `VITE_API_BASE_URL=http://localhost:5000/api`.

    Run frontend development server: 
    ```bash
    npm run dev
    ```

## Optimization Plan
The current version is MVP, but we need to optimize it for production. And add some features which recruiters actually needs.

- **Add Redis Caching:** Adding Redis caching to improve response time and reduce database load.
- **Edge Caching:** Caching public career page API responses at the Edge (CDN) to ensure sub-second load times globally and reduce database load.
- **Application Tracking:** Implementing job application management for recruiters and adding referral features
- **Cursor Pagination:** Implement cursor-based pagination for high-volume endpoints (e.g., Jobs, Analytics) to ensure consistent performance as data grows.
- **Theme Marketplace:** Developing a library of pre-built templates for different industries (Tech, Healthcare, Retail).

## Demo Video
[Link to Demo Video](https://www.youtube.com/watch?v=your-demo-video-id)
