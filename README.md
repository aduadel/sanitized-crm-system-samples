# CRM & Administrative System

A professional, web-based CRM and administration platform designed for educational centers to manage leads, clients, students, courses, sessions, invoices, and financial reporting in a single, maintainable application.

Built for clarity, performance, and scalability using Node.js, Express, PostgreSQL, AWS services, and Vanilla JavaScript.

---

## Summary

This repository contains a sanitized, production-inspired implementation demonstrating a complete CRM lifecycle: lead management, client/student relationships, course and session scheduling, invoicing, reminders (including WhatsApp messaging), and reporting. Included code samples illustrate core patterns and utilities without exposing production data or secrets.

---

## Key Features

- Lead management: lifecycle stages, profiles, activity logs, bulk operations, search and filters
- Client management: full CRUD, linked students, contact metadata, activity history
- Student management: subscription and session tracking, task/reminder system
- Courses: group/private courses, scheduling, enrolled students
- Sessions: large-volume history, pagination, deep entity linking
- Invoicing & billing: automated workflows, status tracking, reminders
- Global smart search: real-time cross-entity suggestions
- Dashboard & reports: financial charts, monthly and cumulative insights
- Automated reminders: scheduled WhatsApp templates for students, instructors, and billing follow-ups
- Production patterns: role-based access, optimized queries, modular architecture

---

## Technology Stack

Backend

- Node.js, Express, TypeScript
- PostgreSQL
- MVC-style organization (Controllers, Services, Routes)
- Utilities: generic CRUD helpers, pagination, validation

Frontend

- Next.js, TypeScript, HTML, CSS
- Reusable components and standalone pages

Infrastructure

- AWS EC2, RDS (PostgreSQL), S3 + CloudFront
- AWS Cognito (OAuth2)
- PM2 / Nginx
- Automated backup scripts

---

## System Architecture

```text
Backend (Node.js)
│
├── Controllers
├── Services
├── Middlewares
├── Routes
└── Utils

Frontend (Next.js + TypeScript)
│
├── App
├── Components
└── Lib

Infrastructure (AWS)
│
├── EC2 Instances
├── RDS PostgreSQL
├── S3 Buckets
├── CloudFront CDN
└── Cognito Authentication
```

---

## Security & Privacy

This repository excludes all sensitive and production-specific material:

- No real customer data, leads, students, or invoices
- No database schemas from production
- No API keys, environment variables, or secrets

---

## Engineering Notes

- Designed for high-volume datasets with indexing and query optimizations
- Role-based access control and OAuth2 via Cognito
- Scheduled jobs (cron-like) for reminders and automated messaging
- Retry and error-handling strategies for external integrations

---

## Getting started

1. Install dependencies from the repository root:

```bash
npm install
```

2. Start both applications together:

```bash
npm run dev
```

3. Open the apps:

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:4000`

---

## Available scripts

From the repository root:

- `npm run dev` runs frontend and backend together
- `npm run build` builds both projects
- `npm run typecheck` checks both TypeScript projects
- `npm run lint` runs the frontend lint task

---

## Environment variables

Backend defaults are safe for local sample mode, but you can override them with `backend/.env`:

```env
PORT=4000
FRONTEND_URL=http://localhost:3000
AUTH_REDIRECT_URI=http://localhost:3000/login
JWT_SECRET=development-secret
AUTH_CLIENT_ID=YOUR_CLIENT_ID
AUTH_DOMAIN=https://YOUR_AUTH_DOMAIN.auth.region.amazoncognito.com
WHATSAPP_API_TOKEN=
WHATSAPP_API_URL=
```

Frontend can be configured with `frontend/.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000/api
```

---

## Notes

- The backend currently uses an in-memory sample store so the project runs without a database.
- The original sample code remains in `sanitized-production-samples/`.
- The auth and reminder flows are still sample-safe placeholders and are ready for real provider and database wiring.

---

## About

This CRM system was fully architected, developed, deployed, and maintained as part of a real production environment for an educational organization.

For more details or access to specific non-sensitive modules, please reach out directly.
