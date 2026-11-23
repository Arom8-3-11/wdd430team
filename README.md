# StudyConnect
StudyConnect is a web application that helps college and university students organize their academic activities and collaborate by sharing study materials, managing assignments, and connecting through study groups.

## Team

- Audrey Romrell
- Guinter Chissengue
- Charles Isama
- Amando Filho

## Project files

The Next.js application is in [`studyconnect/`](./studyconnect/).

- [Project specification](./SPECIFICATION.md)
- [Contribution and branching guidelines](./CONTRIBUTING.md)
- [GitHub issue backlog](./docs/ISSUE_BACKLOG.md)

## Tech stack

- [Next.js](https://nextjs.org/) (App Router) with React and TypeScript
- Tailwind CSS for styling
- [Zod](https://zod.dev/) for input validation
- [Vitest](https://vitest.dev/) for automated tests
- ESLint and Prettier for code quality
- MongoDB (selected database) and Vercel (hosting)

## Current features

Implemented:

- Responsive layout with header, footer, skip link, and keyboard-friendly
  navigation
- Landing page and placeholder pages for Assignments, Study Groups, and
  Materials
- `POST /api/assignments` with input validation and consistent error responses
  (no database yet)

Planned (see [SPECIFICATION.md](./SPECIFICATION.md)): authentication,
assignment CRUD, study groups, material sharing, and search.

## Local development

Requirements: Node.js 20 or newer.

Run these commands from the `studyconnect` directory:

```bash
npm install
npm run dev
```

The development server is available at [http://localhost:3000](http://localhost:3000).

### Environment variables

No environment variables are required yet. When the database and
authentication providers are configured, create a `studyconnect/.env.local` file with
the values and document the variable names here. Never commit `.env.local`.

### Scripts

| Command                | Purpose                                         |
| ---------------------- | ----------------------------------------------- |
| `npm run dev`          | Start the development server                    |
| `npm run build`        | Create a production build                       |
| `npm run lint`         | Run ESLint                                      |
| `npm run typecheck`    | Run the TypeScript compiler without emitting    |
| `npm test`             | Run the Vitest test suite once                  |
| `npm run format:check` | Check formatting with Prettier                  |
| `npm run check`        | Lint, typecheck, test, and build in one command |

Before opening a pull request, run:

```bash
npm run lint
npm run typecheck
npm test
npm run format:check
npm run build
```

The same checks run automatically on every pull request through GitHub Actions
(`.github/workflows/ci.yml`).

## Project structure

```text
studyconnect/
├── app/            # Routes, layouts, and API route handlers
├── components/
│   ├── layout/     # Header, Footer, navigation
│   └── ui/         # Reusable UI pieces
├── lib/            # Shared helpers (navigation, API responses)
│   └── validations/# Zod schemas
└── tests/          # Vitest tests
```

<!-- Add screenshots here after capturing them, e.g.:
## Screenshots
![Home page](./docs/screenshots/home.png)
-->

## Repository

This is the team's public repository: [Arom8-3-11/wdd430team](https://github.com/Arom8-3-11/wdd430team).

The [StudyConnect Team Board](https://github.com/users/Arom8-3-11/projects/2/views/2) tracks the project issues.

## Deployment

We selected Vercel for hosting. The public site is available
at [StudyConnect](https://studyconnect-wdd430.vercel.app).
Use this domain for reviews and submissions; certain preview deployment
URLs may require Vercel sign-in.

To deploy, import this repository into Vercel, set the project root directory
to `studyconnect`, and deploy using the existing Next.js build configuration.
Add any required environment variables after the team selects authentication
and file-storage providers. Do not commit secrets to the repository.

## API documentation

Errors always use this shape: `{ "error": { "code", "message", "details?" } }`.

- `GET /api/hello` returns `{ "message": "Hello, world!" }`.
- `GET /api/assignments` returns `{ "data": [] }` (placeholder until the
  database is connected).
- `POST /api/assignments` validates a JSON body with `title` (3-100
  characters), optional `description` (up to 500 characters), `dueDate` (ISO
  8601 date-time), and optional `status` (`todo`, `in-progress`, or `done`).
  Responses: `201` with the validated data, `400` for malformed JSON, `422`
  with per-field `details` for invalid data, and `500` for unexpected errors.
  Nothing is stored yet.
- Other planned API routes are documented in
  [SPECIFICATION.md](./SPECIFICATION.md). They are not implemented yet.

## Known issues and planned work

- Authentication and file-storage providers still need to be selected.
- Assignments are validated but not persisted; there is no database connection
  yet.
- Test coverage currently covers the validation schema and the assignments
  API route only.
- Persistent data workflows and the planned API routes are not implemented.
- Confirm that the Project Board link is accessible to reviewers.
- The seven open GitHub issues still need owners and must be added to the
  Project Board.

## Project setup status

The repository includes the Next.js App Router project, TypeScript, Tailwind
CSS, ESLint, Prettier, and a Node.js `.gitignore`. we selected MongoDB
and Vercel; authentication and file storage remain open decisions. See
[CONTRIBUTING.md](./CONTRIBUTING.md) for the feature-branch and pull-request
workflow. GitHub collaborator invitations and `main` branch protection are
managed in repository settings.
