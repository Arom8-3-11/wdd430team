# Copilot instructions for StudyConnect

StudyConnect helps students organize assignments, share study materials and join study groups. Specification: `specs/001-studyconnect-mvp/spec.md`. Architecture: `docs/ARCHITECTURE.md`. Design: `docs/DESIGN.md`.

## Stack
- Next.js App Router (the app is in `studyconnect/`), React, strict TypeScript, Tailwind CSS v4, MongoDB, deployed on Vercel.
- This Next.js version has breaking changes: read `studyconnect/node_modules/next/dist/docs/` before using unfamiliar APIs.
- Authentication (Auth.js v5 or Clerk) and file storage are not decided yet; do not assume either.

## Code conventions
- Never use explicit `any`. Type props, state, API responses and errors.
- Prefer Server Components; add `"use client"` only for browser state and event handlers.
- Components: PascalCase files in `studyconnect/components/`. Routes: lowercase folders in `studyconnect/app/`. Shared types in `studyconnect/types/`.
- Route Handlers live in `studyconnect/app/api/**/route.ts`. Validate all input on the server and enforce sign-in, ownership and group membership there.
- Return typed JSON; error messages must not expose secrets or private data.
- Never commit secrets. Use environment variables and keep `.env.example` updated.

## UI conventions
- Tailwind utility classes only. Palette: background `#f4f4e9`, text `#14211a`, primary `emerald-800` (hover `emerald-900`), cards `rounded-xl border border-gray-200 bg-white shadow-sm`.
- Content wrapper `mx-auto w-full max-w-6xl px-6 py-12`. Mobile first; no horizontal scrolling at 320 px.
- Every data view needs loading, empty, error and success states.

## Data model (MongoDB)
Collections: `users`, `assignments`, `groups`, `memberships` (unique `userId` + `groupId`), `materials`. See `docs/ARCHITECTURE.md`.

## Workflow
- Branch per task (`feature/...`, `fix/...`), pull request into `main`, at least one reviewer.
- Before a PR run, inside `studyconnect/`: `npm run lint`, `npm run format:check`, `npm run build`.
