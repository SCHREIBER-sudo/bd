---
name: fsffss
description: Guidelines and workflows for building full-stack web applications with front-end, back-end, database, and testing standards. Use when creating, refactoring, or reviewing full-stack code.
---

# Full-Stack Development Skill

Provide complete, production-ready, and end-to-end full-stack solutions following modern architecture patterns, secure API design, and efficient database interactions.

---

## 1. Project Architecture & Standards

### File & Directory Structure
- **Frontend**: Keep UI components modular, accessible (a11y), and state-decoupled (e.g., `src/components/`, `src/hooks/`, `src/pages/`).
- **Backend**: Enforce layer separation: Routing (`/routes`) -> Controllers (`/controllers`) -> Services (`/services`) -> Data Access (`/models` or `/db`).
- **Shared**: Define single-source-of-truth TypeScript types/schemas shared across frontend and backend.

### Code Quality Checklist
- Strictly typed code (avoid `any`).
- Proper error handling with consistent HTTP status codes and structured JSON responses.
- Environment variable validation at startup (e.g., using `zod` or `dotenv`).

---

## 2. Front-End Guidelines

- **UI/UX**: Render responsive, accessible components with clear loading, empty, and error states.
- **State Management**: Use local state for UI concerns; use server-state libraries (e.g., React Query, SWR) for API fetching, caching, and cache invalidation.
- **Forms & Validation**: Perform client-side validation mirrored exactly by backend schemas.

---

## 3. Back-End & API Guidelines

- **RESTful / GraphQL / gRPC Standards**:
  - Follow standard HTTP verbs (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`).
  - Standardized response payload format:
    ```json
    {
      "success": true,
      "data": {},
      "error": null
    }
    ```
- **Authentication & Authorization**:
  - Implement role-based access control (RBAC) on protected endpoints.
  - Store tokens securely (e.g., `httpOnly`, `SameSite=Strict` cookies).
- **Security**: Validate and sanitize all incoming payload input to prevent SQL Injection, XSS, and CSRF.

---

## 4. Database & ORM Workflow

- **Schema Design**: Ensure foreign key constraints, proper indexing on high-query columns, and timestamp tracking (`created_at`, `updated_at`).
- **Migrations**: Always write reversible database migrations rather than directly modifying schemas.
- **Performance**: Prevent the $N+1$ query problem by using JOINs, eager loading, or dataloaders.

---

## 5. End-to-End Workflow & Step-by-Step Execution

When requested to build a full-stack feature, execute the task in this sequence:

1. **Database / Data Model Layer**: Define or update schemas and write necessary migrations.
2. **Backend API Layer**: Build services, controllers, and register routes with strict request payload validation.
3. **Frontend Integration**: Build UI components, set up API integration hooks, and handle asynchronous loading and error states.
4. **Validation & Automated Testing**: Write unit tests for backend business logic and end-to-end (E2E) tests for key visual user flows.

---

## 6. Testing Strategy

- **Unit Tests**: Test core business logic and utility functions independently.
- **Integration Tests**: Verify database queries and API route handlers using mock or test database instances.
- **E2E Tests**: Validate critical client user journeys (e.g., authentication, checkout flows) end-to-end.