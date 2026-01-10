# Agent Log
Here I've mentioned at what stage and how I've used AI to develop the Career Page Builder.

## Tools and How I used AI 

### 1. Backend Design
**Tool:** Anthropic Claude
**Prompt:** Fed the requirements doc and my thought process with my prefered stack to the Claude AI and asked it to generate a high level backend desgin document.
**Output:** I went through the design document, analysed how the schema has been designed and after going through I asked cross questions to know why this particular approach has been taken wherever I had doubts to get the clarity.


### 2. Backend Implementation
**Tool:** Antigravity (Gemini 3 Pro)
**Before Prompting:** I initialized the backend repo with all the necessary installations (express, typescript, prisma, zod etc.) and asked the agent to implement the backend as per the high level design document.

**Initial Prompt:** Implement and develop the backend as per the given high level design document and provide detailed explaination of each file significance.

**Output:** The IDE generated the backend code as per the high level design document. I went through all the files and checked the logic of the code and verified it has generated clean and readable code.

**Post Implementation:** I asked the agent to prepare seed data file for seeding initial data in Database and asked to generate swagger files for API documentation and API testing

**Post Testing:** Tested and when issues faced, fixed the business logic wherever required with the help of IDE with mapping the exact file and telling it what is the issue and how it has to fix it.


### 3. Frontend Ideation Design
**Tool:**  Replit

**Prompt:** Gave the IDE 4 links of reference career websites for design reference with requirement files for the context along with the swagger files for API response schema for mapping and asked it to implement the frontend.
**Output:** The IDE generated initial UI and the other routes UI, after iterative testing and feedback, the final UI was generated.

### 4. Frontend Development
**Tool:**  Antigravity (Gemini 3 Pro)

**Developing with AI:** 
   - After importing the frontend design folder in the repo, I started integrating the backend APIs module by module by prompting the agent stage by stage.
   - Checked the generated code manually and did testing on the UI and asked agent to modify/fix/add the required features. 
   - Went through a lot of design changes for UI components and testing their functionalities during development and lots of prompting to implement the required component feel which I had in mind and according to the reference I provided.
   - During this AI pair programming a lot of issues faced and fixed by the agent and I had to guide the agent to fix the issues. 

## Learnings
1.  **Halucinations:** I mostly use THINKING MODELS to know how and what the AI agent is thinking when I gave a task, I read it and if I feel the thinking process is getting hallucinated or going out of scope of the context, I used to revert and send again or provide more context and related file with some more clear explaination. 

2.  **Image as contexts:** Adding images and pointing out the attached images in the prompt has helped me a lot make AI understand better what the issue has occured and how I wanted the fix.

3.  **Iterative Styling:** Perfect design rarely came in one shot. I know how to use write tailwind classes so if there is alignment or any fix which can be done by me, I used to fix css by own rather than spend time in prompting. But to achieve the perfext motion feel of the UI, I had giving as much of context files and mentioned line numbers of code with context images.

