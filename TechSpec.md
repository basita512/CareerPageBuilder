# Technical Specification

## 2. Architecture
We have used the PERN stack (PostgreSQL, Express, React, Node.js) for the development of this application. Nextjs could have been used for the frontend but it was not used to keep it simple and easy to understand.

### Backend
- **Node.js and Express framework:** Chose this as it is a personal preferance and for layered architecture (Request → Routes → Middleware → Controllers → Services → Database → Response)

- **PostgresSQL:** (used Neon serverless database)
    - One-to-many relationships (Companies have Jobs).
    - Foreign key relationships (Jobs belong to Companies).
    - Complex queries with JOINs (e.g., "get all jobs for company X with analytics").
    - ACID transactions (e.g., creating company and admin user atomically).
- **Prisma ORM:** For type-safe database access and easy migration management.
- **Zod:** For schema-based data validation and TypeScript type inference.
- **Security:**
  - `helmet` for HTTP header security.
  - `cors` for cross-origin resource sharing configuration.
  - `bcryptjs` for password hashing.
- **Rate Limiting:** `express-rate-limit` for rate limiting.
- **Swagger:** `swagger-jsdoc` and `swagger-ui-express` for API documentation.
- **Cloudinary:** `cloudinary` for image upload and storage.

### Frontend
- **React.js:** For building the user interface.
- **Tailwind CSS:** For utility-first styling, ensuring responsive design.
- **Context API:** For authentication and global user state.
- **Framer Motion:** For fluid UI experience.


## 3. Database Schema
### Models
- **Company:** Contains company names along with their branding configuration (logo, colors, fonts), SEO settings, and subscription status.

- **User:** Contains User details and their user event data. Foreign key relationship with Company 

- **Section:** Represents a content block on the career page (e.g., Hero, About, Values, Benefits). These are ordered and customizable. Foreign key relationship with Company 

- **Job:** Represents individual job postings, includes metadata like salary, location type (remote/hybrid), and requirements. Foreign key relationship with Company 

- **AnalyticsEvent:** Stores simplistic interaction data (page views, job clicks) linked to a specific company and job. Foreign key relationship with Company and Job 

## 4. Testing
Did manual testing for the following scenarios:

### Manual Verification Scenarios
1.  **Onboarding Flow:**
    - Register a new user account.
    - Verify that a new Company entity is automatically created.
    - Confirm redirection to the Dashboard.

2.  **Editor Experience:**
    - Add a new "Values" section using the drag-and-drop builder.
    - Upload a custom logo and change the primary brand color.
    - Save changes and ensure persistence in the database.

3.  **Public Access (Critical):**
    - Open an Incognito/Private window.
    - Navigate to a published career page URL (e.g., `/demo/techcorp/careers`).
    - Verify that the page loads without redirecting to the login screen.
    - Check that the custom branding (colors, logo) is correctly applied.

4.  **Responsiveness:**
    - Use browser developer tools to simulate iPhone and iPad viewports.
    - Verify that the "Sticky Scroll" feature adapts from a side-by-side layout (Desktop) to a vertical stack (Mobile).
    - Ensure no horizontal scrolling occurs on small screens.

