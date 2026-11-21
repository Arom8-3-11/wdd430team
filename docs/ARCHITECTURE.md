# StudyConnect Architecture (Week 03)

Stack: Next.js App Router, strict TypeScript, Tailwind CSS v4, MongoDB, Vercel.
The app lives in `studyconnect/`. Authentication (Auth.js v5 or Clerk) and file storage are still open decisions (issue #1).

## MVP pages and routes

| Route | Purpose | Auth | Week 04 priority |
| --- | --- | --- | --- |
| `/` | Landing page (exists) | Public | Done |
| `/assignments` | List my assignments (placeholder exists) | Signed in | High |
| `/assignments/[id]` | View, edit, delete an assignment | Owner | High |
| `/groups` | Browse and create groups (placeholder exists) | Signed in | High |
| `/groups/[id]` | Group details, join, leave, owner edit/delete | Signed in | High |
| `/materials` | Browse and share materials (placeholder exists) | Signed in | Medium |
| `/materials/[id]` | Material details and download | Signed in | Medium |
| `/search?q=` | Search groups and materials | Signed in | Low (P1) |
| `/login`, `/register` | Account access | Public | High |
| `/profile` | View and update display name | Signed in | Medium |

## Component hierarchy

```
RootLayout (app/layout.tsx)
├── Header                 (exists)  main navigation
├── <main> page content
│   ├── PageContainer      wrapper: max-w-6xl, px-6, py-12
│   ├── Card               rounded-xl bordered surface
│   ├── Button / ButtonLink  primary + secondary variants
│   ├── FormField          label + input + validation message
│   ├── EmptyState         "nothing here yet" message
│   ├── LoadingState       visible pending indicator
│   ├── ErrorMessage       non-sensitive error + retry
│   ├── SearchBar          query input, clear button
│   ├── AssignmentCard / AssignmentForm
│   ├── GroupCard / GroupForm / JoinLeaveButton
│   └── MaterialCard / MaterialForm
└── Footer                 (exists)
```

Shared components (Card, Button, FormField, EmptyState, LoadingState, ErrorMessage) must be used on at least three pages to meet the "five reusable components" course requirement.

## Data model (MongoDB)

Five core entities. Every document has `_id` and `createdAt`; `updatedAt` where editable.

| Collection | Key fields |
| --- | --- |
| `users` | `displayName`, `email` (unique), auth provider id |
| `assignments` | `ownerId` -> users, `title`, `dueDate`, `status` (e.g. todo, in-progress, done), `course` (optional) |
| `groups` | `ownerId` -> users, `name`, `subject`, `description` |
| `memberships` | `userId` -> users, `groupId` -> groups, `joinedAt`; unique index on (`userId`, `groupId`) |
| `materials` | `contributorId` -> users, `title`, `subject`, `description`, `attachment` (storage key, file name, type, size) |

Relationships:
- users 1 : N assignments (private to the owner)
- users 1 : N groups (as owner)
- users N : M groups through `memberships`
- users 1 : N materials (as contributor)

Deleting a group also deletes its memberships.

## API surface (planned, from technical-planning.md)

`/api/auth/*`, `/api/profile`, `/api/assignments[/:id]`, `/api/groups[/:id]`, `/api/groups/:id/members`, `/api/materials[/:id[/download]]`, `/api/search?q=`. Only `GET /api/hello` exists today.

## Dependencies for Week 04

1. Shared TypeScript types (`studyconnect/types/`) and the MongoDB connection helper (`studyconnect/lib/mongodb.ts`) before any data fetching.
2. Auth provider decision before account pages and ownership checks.
3. Shared UI components before the feature pages that use them.
