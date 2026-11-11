# StudyConnect Project Specification

> **Canonical Week02 specification:** [StudyConnect MVP specification](specs/001-studyconnect-mvp/spec.md). This document remains the original starting point; the canonical specification takes precedence for the current draft scope and priorities.

## Project title and description

StudyConnect is a web application for college and university students to
organize academic work and collaborate. Students can manage assignments, share
learning resources, and connect with classmates through study groups. Search
helps students find materials and groups by subject or keyword.

This document is a project-specific starting specification based on the team's
proposal. The team should review it and record any decisions that change the
scope or technical approach before implementation.

## Purpose and target audience

- **Audience:** College and university students.
- **Problem:** Students often track assignments, find useful study materials,
  and connect with classmates using separate tools.
- **Purpose:** Bring assignment organization, resource sharing, and study-group
  collaboration together in one platform.

## Scope

### First-release capabilities

- Students can register, sign in, and manage a basic profile.
- Students can create, view, update, and delete their own assignments and track
  assignment status and due dates.
- Students can share, browse, and download learning materials.
- Students can create study groups and join groups created by classmates.
- Students can search study materials and groups by subject or keyword.

### Team decisions and open decisions

- **Database:** MongoDB.
- **Hosting:** Vercel.
- **Authentication:** Not decided yet. Choose Auth.js v5 or Clerk before
  implementing account workflows.
- **File storage:** Not decided yet. Choose a provider and supported upload
  formats before implementing material uploads and downloads.

### Out of scope until the team prioritizes them

- Real-time chat, calendar integrations, push notifications, and automated
  assignment reminders.
- Payments, grading integrations, and institution-wide single sign-on.

## User stories

1. As a student, I want to create an account, sign in, and manage my profile so
   that my academic activity is associated with me.
2. As a student, I want to add, view, edit, delete, and track assignments so
   that I can keep my coursework organized.
3. As a student, I want to share learning materials so that classmates can use
   helpful notes and documents.
4. As a student, I want to browse and download shared materials so that I can
   use resources relevant to my classes.
5. As a student, I want to create, view, update, and delete study groups that I
   own so that I can manage collaboration around a subject.
6. As a student, I want to find and join a study group so that I can study with
   classmates.
7. As a student, I want to search materials and groups by subject or keyword so
   that I can find relevant resources and people quickly.

## Acceptance criteria

### Story 1: Account and profile

- A student can register with valid required information and then sign in.
- Invalid or missing required input is rejected with a clear validation
  message.
- A signed-in student can view and update their own profile.
- A student cannot view or change another student's private profile data.

### Story 2: Assignment management

- A signed-in student can create an assignment with a title and due date.
- The student can list and view their assignments, including due date and
  status.
- The student can update assignment details or status and delete an assignment.
- Invalid required fields are rejected, and an empty assignment list has a
  useful empty state.
- A student cannot change another student's assignment.

### Story 3: Share materials

- A signed-in student can submit a material with a title, subject, and
  description, and attach a supported document or notes.
- Required metadata is validated before a material is published.
- The application displays a clear error if an upload is unsupported or fails.

### Story 4: Browse and download materials

- Students can browse published materials and see their title, subject,
  description, and contributor.
- A student can download an available material.
- If no materials are available, the page displays an informative empty state.

### Story 5: Create a study group

- A signed-in student can create a group with a name, subject, and description.
- Missing required group information is rejected with clear validation.
- The group appears in the available group list after successful creation.
- The group owner can view and update the group's details.
- The group owner can delete their group, after which it no longer appears in normal group browsing.
- A student cannot update or delete a group owned by another student.

### Story 6: Find and join a study group

- Students can browse available groups and view each group's subject and
  description.
- A student can join an available group and receive confirmation.
- Repeated join requests do not create duplicate memberships.
- A student can leave a group they joined.
- No matching groups produce an informative empty state.

### Story 7: Search

- A student can search materials and groups by subject or keyword.
- Search results identify whether each result is a material or a group and link
  to its detail view.
- Empty results are communicated clearly, and clearing the search restores the
  browse results.

## Technical requirements

- **Framework:** Next.js App Router.
- **Language:** TypeScript with strict mode enabled; avoid `any`.
- **Styling:** Tailwind CSS utility classes; use custom CSS only when needed.
- **Database:** MongoDB. The team must select and document its MongoDB
  connection approach and required environment variables before database
  implementation.
- **Hosting:** Vercel.
- **Authentication:** Auth.js v5 or Clerk; provider not yet selected.
- **File storage:** Provider not yet selected.
- **Linting and formatting:** ESLint and Prettier with the repository's shared
  configuration.
- **Rendering:** Prefer Server Components; use Client Components for
  interactions that require browser state or event handling.
- **Application structure:** Provide at least three distinct views and at least
  five reusable components used across multiple pages.
- **Database request cycle:** Include a Next.js Route Handler that performs a
  database operation and is consumed by a Client Component. Validate inputs
  and handle loading, success, and error states.
- **Responsive design:** Support usable layouts on mobile and desktop.
- **Validation and privacy:** Validate user input on the server as well as in
  forms. Users may only modify resources they own, and group membership must be
  checked before exposing group-only content.

## Proposed API surface

These are planning routes, not implemented endpoints. The team should finalize
the route and data model during implementation.

| Method                   | Route                     | Purpose                                            |
| ------------------------ | ------------------------- | -------------------------------------------------- |
| `POST`                   | `/api/auth/register`      | Register a student                                 |
| `POST`                   | `/api/auth/sign-in`       | Start a student session                            |
| `GET`, `PATCH`           | `/api/profile`            | Read or update the signed-in student's profile     |
| `GET`, `POST`            | `/api/assignments`        | List or create the signed-in student's assignments |
| `GET`, `PATCH`, `DELETE` | `/api/assignments/:id`    | Read, update, or delete an owned assignment        |
| `GET`, `POST`            | `/api/materials`          | Browse or share learning materials                 |
| `GET`                    | `/api/materials/:id`      | Read material details and obtain its download      |
| `GET`, `POST`            | `/api/groups`             | Browse or create study groups                      |
| `GET`, `PATCH`, `DELETE` | `/api/groups/:id`         | Read, update, or delete an owned study group       |
| `POST`                   | `/api/groups/:id/members` | Join a study group                                 |
| `DELETE`                 | `/api/groups/:id/members` | Leave a study group                                |
| `GET`                    | `/api/search?q=:query`    | Search materials and groups by keyword or subject  |

## Implementation priority

- **P0:** Choose auth/storage providers; create accounts and profiles;
  assignment CRUD; study-group CRUD and membership; browse and share materials.
- **P1:** Search materials and groups; material downloads; input and ownership
  validation; responsive and accessible UI; automated tests for core workflows.
- **P2:** Group messaging, reminders, calendar integration, and other features
  requested after the first release.