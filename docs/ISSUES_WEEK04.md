# Additional issues for the Week 04 milestone

The existing backlog (`ISSUE_BACKLOG.md`) has 7 issues. Create these so the board has at least 9, then attach the highest-priority issues to the **Week 04** milestone and assign owners.

## 8. Define shared TypeScript types and MongoDB connection helper

**Priority:** P0 (blocks data fetching)
- Create `studyconnect/types/` with User, Assignment, Group, Membership, Material and typed API success/error shapes.
- Create `studyconnect/lib/mongodb.ts` reusing one client; read the URI from an environment variable, never committed.
- Add `.env.example` with variable names only.

## 9. Build shared UI components

**Priority:** P0
- Add Card, Button, FormField, EmptyState, LoadingState, ErrorMessage to `studyconnect/components/`.
- Typed props, Tailwind styling per `docs/DESIGN.md`, used on at least three pages.

## 10. Add client-to-database demonstration with Route Handler

**Priority:** P1
- One Client Component calls a Route Handler that validates input on the server and writes to MongoDB.
- Visible loading, success and error states.

Suggested Week 04 milestone: issues #1, #2, #3, #5, #8, #9.
