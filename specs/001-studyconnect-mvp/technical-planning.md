# StudyConnect Week02: Course Technical Planning Companion

**Status**: Draft planning surface, not implemented endpoints or a technical design approval. The [canonical stakeholder specification](spec.md) defines scope and acceptance. The constitution is pending team ratification.

## Course constraints

- Use Next.js App Router, strict TypeScript with no explicit `any`, Tailwind CSS, MongoDB, and Vercel. Prefer Server Components; use Client Components for browser state and event handling. Type component props, state, responses, and errors.
- Deliver at least three distinct views and at least five reusable components used across multiple pages.
- Demonstrate at least one Client Component → Next.js Route Handler → MongoDB operation, with server-side input validation and visible loading, success, and error states. The demonstration must follow authentication and ownership rules for the chosen operation.
- Design mobile and desktop experiences; provide loading, success, empty, validation, and error states. Validate on the server as well as in forms. Enforce ownership and current membership on the server for applicable resources.
- Use the repository's existing ESLint, Prettier, and production build checks when applicable. Plan focused verification of MVP flows, validation, ownership, and membership; if automation is unavailable, document manual checks and limitations. Do not install new tools without approval.

## Proposed API planning surface

These method and route names are illustrative, not implemented or a promise of a particular authentication or storage provider. Provider-specific authentication and download integration may change them.

| Method | Proposed route | Purpose and protection |
|--------|----------------|------------------------|
| POST | `/api/auth/register` | Register a student; validate input. |
| POST | `/api/auth/sign-in` | Start a student session. |
| POST | `/api/auth/sign-out` | End the current session. |
| GET, PATCH | `/api/profile` | Read or update the signed-in student's profile. |
| GET, POST | `/api/assignments` | List or create the signed-in student's assignments. |
| GET, PATCH, DELETE | `/api/assignments/:id` | Read, update, or delete an assignment after an ownership check. |
| GET, POST | `/api/materials` | Browse or share materials as a signed-in student. |
| GET | `/api/materials/:id` | Read material details. |
| GET | `/api/materials/:id/download` | Obtain an available attachment as a signed-in student. |
| GET, POST | `/api/groups` | Browse or create groups as a signed-in student. |
| GET, PATCH, DELETE | `/api/groups/:id` | View group details; update or delete only as owner. |
| POST, DELETE | `/api/groups/:id/members` | Join or leave as the current student, respecting the owner rule. |
| GET | `/api/search?q=:query` | Search materials and groups by subject or keyword. |

Final route shapes, data models, typed success/error contracts, and provider-specific details are planning work; do not treat these examples as implemented interfaces.

## Implementation priorities

- **P0:** Accounts and profiles; assignment and study-group CRUD;
  membership; material sharing and browsing. Include validation,
  authorization, responsive layouts, and appropriate feedback in each feature.
- **P1:** Material downloads, search, and integrated verification.
  P0 and P1 are both required for the first release.
- **P2:** Messaging, reminders, and calendar integration.

## Decisions required before implementation

1. Choose and document **Auth.js v5 or Clerk** before implementing accounts; do not assume either.
2. Choose and document the **file-storage provider and supported upload formats** before implementing material upload or download.
3. Document the **MongoDB connection approach and required environment variables** before database implementation.

These decisions are follow-up work for planning or implementation, not a claim that the team has already chosen or ratified them.
