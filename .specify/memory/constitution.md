<!--
Sync Impact Report
- Version change: unversioned template → 1.0.0 (initial constitution; team ratification pending).
- Modified principles: none; the initial five principles are established below.
- Added principles: Complete Student Workflows; Server-First, Strictly Typed UI;
  Student Data Protection; Proportionate Quality; Reusable, Responsive Design.
- Added sections: Technical and Product Constraints; Delivery Workflow.
- Removed sections: none.
- Templates: ✅ .specify/templates/plan-template.md updated;
  ✅ .specify/templates/tasks-template.md updated;
  ✅ .specify/templates/spec-template.md updated with applicable requirement
  guidance.
- Command guidance: ⚠ .specify/templates/commands/*.md is not present in this repository.
  The installed workflow is .github/agents/speckit.constitution.agent.md.
- Runtime guidance: ✅ README.md, SPECIFICATION.md, CONTRIBUTING.md,
  docs/ISSUE_BACKLOG.md, and studyconnect/AGENTS.md reviewed; no changes required.
- Deferred: TODO(RATIFICATION_DATE) pending explicit team ratification. Auth.js v5
  versus Clerk and the file-storage provider remain team decisions.
-->

# StudyConnect Constitution

## Core Principles

### I. Complete Student Workflows
Features MUST support the agreed student workflows: full create, read, update,
and delete operations for a student's assignments and owned study groups;
sharing, browsing, and downloading learning materials; joining and leaving
study groups; and searching materials and groups. Plans and specifications
MUST identify the relevant user journey and its acceptance criteria. New work
outside the agreed first-release scope requires an explicit team decision.
This keeps implementation focused on usable academic and collaboration flows.

### II. Server-First, Strictly Typed UI
The application MUST use the Next.js App Router and strict TypeScript, and MUST
not use explicit `any`. Server Components are the default; Client Components
MUST be limited to interactions that need browser state or event handling.
Component props, state, and API responses MUST have explicit, useful types.
Styling MUST use Tailwind CSS utilities, with custom CSS only when needed.
These rules keep the application type-safe and minimize unnecessary client
code.

### III. Student Data Protection
The server MUST validate submitted data and MUST enforce authentication and
authorization for protected operations. Students MUST only change resources
they own; group-only content MUST only be exposed after checking membership.
Forms and server operations MUST report validation and operation failures
without exposing secrets or private data. Credentials and deployment secrets
MUST remain outside source control. These safeguards protect student accounts
and academic information.

### IV. Proportionate Quality
Changes MUST be checked with the repository's existing ESLint, Prettier, and
production-build commands when applicable. Specifications and task plans MUST
include focused tests or other explicit verification for core MVP behavior,
including relevant validation and ownership rules, using available project
tooling. The team MUST NOT add test tools or dependencies without approval.
When automated tests are not supported by the current setup, plans MUST record
the manual verification and the limitation rather than claim unrun tests.
Quality gates MUST match the risk and scope of the change.

### V. Reusable, Responsive Design
User-facing changes MUST remain usable on mobile and desktop and MUST provide
appropriate loading, success, empty, and error states. Shared UI MUST favor
reusable components and follow the repository's naming conventions and
ESLint/Prettier configuration. The delivered project MUST provide at least
three distinct views and at least five reusable components used across pages.
These constraints support a coherent, demonstrable product without prescribing
unnecessary architecture.

## Technical and Product Constraints

- **Framework and language:** Next.js App Router and strict TypeScript; explicit
  `any` is prohibited.
- **Styling:** Tailwind CSS utility classes; use custom CSS only when needed.
- **Database and hosting:** MongoDB and Vercel are selected.
- **Authentication:** Auth.js v5 or Clerk is still under consideration. The team
  MUST select and document a provider before implementing account workflows.
- **File storage:** The provider is undecided. The team MUST select and document
  it, including supported upload formats, before implementing material uploads
  or downloads.
- **Application demonstration:** The completed project MUST have three
  distinct views, five reusable components used across pages, and an end-to-end
  database operation in a Next.js Route Handler consumed by a Client Component.
  The cycle MUST validate inputs and present loading, success, and error states.
- **Responsive behavior and privacy:** Layouts MUST be usable on mobile and
  desktop. Server-side validation, resource ownership checks, and study-group
  membership checks are mandatory where applicable.
- **Existing quality tools:** Use the repository's configured ESLint and
  Prettier. Do not install additional tools or dependencies without team
  approval.

## Delivery Workflow

- Contributors MUST use a descriptive feature or fix branch and MUST NOT push
  feature work directly to `main`.
- Changes MUST be proposed through a pull request. At least one other teammate
  MUST review and approve the pull request, and the author MUST address review
  feedback before merging.
- Before requesting review, contributors MUST run the applicable existing
  checks: `npm run lint`, `npm run format:check`, and `npm run build` from
  `studyconnect`. Core workflow tests or other focused verification MUST also
  be run when available.
- Pull requests MUST describe the change and verification performed. A change
  to agreed scope or technical decisions MUST be documented in the relevant
  project specification or planning documents.
- These are team process requirements; this constitution does not assert that
  branch protection or approval requirements are technically enforced in
  repository settings.

## Governance

This constitution defines the project's non-negotiable principles and takes
precedence over conflicting template guidance. The constitution is a draft
until the team explicitly ratifies it; no ratification date or approval is
asserted here. Amendments MUST be proposed with their rationale, impact on
existing work, and any required template or guidance updates. The team MUST
review and approve amendments before they are treated as adopted. Pull
requests and feature specifications, plans, and task lists MUST be checked
against applicable principles. Any exception MUST state its reason, scope,
risks, and approving team decision.

Constitution versions follow semantic versioning: MAJOR for backward-
incompatible removal or redefinition of a principle or governance rule; MINOR
for a new principle or materially expanded requirement; PATCH for clarifications
and non-semantic wording fixes. The version and amendment date MUST be updated
with each adopted change, and dependent templates and project guidance MUST be
reviewed for consistency.

**Version**: 1.0.0 | **Ratified**: TODO(RATIFICATION_DATE): pending explicit team ratification
**Last Amended**: 2026-11-10
