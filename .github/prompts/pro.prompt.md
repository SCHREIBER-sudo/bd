---
name: Full-Stack Prompt Template
description: Structured prompt instructions and templates for triggering end-to-end full-stack feature generation in VS Code.
---

# Full-Stack Development Prompt Instructions

When prompting the AI assistant in VS Code for full-stack tasks, follow the system behavior rules and template structures below.

---

## 1. System Prompt Rules (AI Behavior)

When responding to full-stack requests, the AI must:

- **Deliver Production-Ready Code**: Never output placeholders like `// TODO: Implement later` or `// ... rest of code`. Provide full, usable code files.
- **Enforce End-to-End Type Safety**: Share or synchronize TypeScript types between the database schema, API contracts, and frontend components.
- **Follow Layered Backend Architecture**: Separate code into `Routes -> Controllers -> Services -> Data Access (DB/ORM)`.
- **Require Strict Input Validation**: Validate every incoming request payload using schema validation libraries (e.g., `zod`, `yup`).
- **Handle All UI States**: Ensure frontend code explicitly handles **Loading**, **Error**, **Empty**, and **Success** states.
- **Protect Secrets**: Access configuration via `process.env` or environment variables; never hardcode credentials.

---

## 2. Feature Generation Prompt Template

Copy and fill out this template when requesting a new full-stack feature:

```markdown
### Request: Full-Stack Feature Generation

**Feature Description:**
[Describe what the feature does, e.g., "User profile picture upload and management"]

**Tech Stack:**
- Frontend: [e.g., React / Next.js, Tailwind CSS, TanStack Query]
- Backend: [e.g., Node.js / Express, NestJS]
- Database & ORM: [e.g., PostgreSQL, Prisma / Drizzle]
- Authentication: [e.g., JWT in httpOnly cookies, NextAuth, Clerk]

**Requirements:**
1. Database: Update schema, define relationships, and provide migration code.
2. API Layer:
   - Route endpoint(s) with HTTP verbs.
   - Request body/query validation schema (e.g., Zod).
   - Controller & Service business logic with unified response schema:
     `{ "success": true, "data": {}, "error": null }`
3. Frontend Layer:
   - Accessible UI component with responsive design.
   - API integration hook (handling loading, error, and empty states).
4. Tests: Unit tests for backend service and integration test for API route.

Please implement this feature step-by-step without skipping code blocks.