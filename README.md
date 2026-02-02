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

- Node.js, Express
- PostgreSQL
- MVC-style organization (Controllers, Services, Routes)
- Utilities: generic CRUD helpers, pagination, validation

Frontend

- HTML, CSS, Vanilla JavaScript
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

Frontend (Vanilla JS)
│
├── Pages (Leads, Clients, Students, Courses, Sessions…)
└── Shared scripts & components

Infrastructure (AWS)
│
├── EC2 Instances
├── RDS PostgreSQL
├── S3 Buckets
├── CloudFront CDN
└── Cognito Authentication
```

---

## Code Samples Included

Sanitized, generic modules demonstrating core patterns used in production:

```
code-samples/
    backend/
        auth-middleware.js
        generic-crud-controller.js
        generic-crud-service.js
        pagination-helper.js
        session-reminder-scheduler.js
        whatsapp-template-message.js

    frontend/
        login/
            login.html
            login.css
            login.js

        invoice-form/
            invoice-form.html
            invoice-form.css
            invoice-form.js
```

These samples are intentionally generic and do not contain business-specific logic or sensitive data.

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
- Basic retry and error-handling strategies for external integrations

---

## About

This CRM system was fully architected, developed, deployed, and maintained as part of a real production environment for an educational organization.

For more details or access to specific non-sensitive modules, please reach out directly.
