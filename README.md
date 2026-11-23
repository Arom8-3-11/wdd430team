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
- [Technical decisions (database, auth, file storage)](./docs/TECH_DECISIONS.md)
- [Contribution and branching guidelines](./CONTRIBUTING.md)
- [GitHub issue backlog](./docs/ISSUE_BACKLOG.md)

## Local development

First, set up environment variables (required for accounts and sign-in):

```bash
cd studyconnect
cp .env.example .env.local   # Windows PowerShell: Copy-Item .env.example .env.local
```

Fill in `MONGODB_URI` and `AUTH_SECRET` in `.env.local` following
[docs/TECH_DECISIONS.md](./docs/TECH_DECISIONS.md). Never commit `.env.local`
or real secrets — only `.env.example` (placeholders) is tracked.

Then run these commands from the repository root (they forward to the
`studyconnect` app), or run them directly inside `studyconnect`:

```bash
npm run install:app
npm run dev
```

The development server is available at [http://localhost:3000](http://localhost:3000).

Before opening a pull request, run:

```bash
npm run lint
npm run format:check
npm run build
```

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
Set the environment variables listed in
[docs/TECH_DECISIONS.md](./docs/TECH_DECISIONS.md) (`MONGODB_URI`,
`AUTH_SECRET`, and later `BLOB_READ_WRITE_TOKEN`) in the Vercel project
settings. Do not commit secrets to the repository.

## API documentation

Implemented routes:

- `GET /api/hello` returns `{ "message": "Hello, world!" }` (scaffold check).
- `POST /api/auth/register` creates a student account. Validates name, email,
  and password server-side; returns `400` with field errors, `409` for a
  duplicate email, or `201` with the new profile.
- `GET|POST /api/auth/*` (Auth.js) handles sign-in, sign-out, and session
  management for the credentials provider.
- `GET /api/profile` returns the signed-in student's own profile
  (`401` when unauthenticated). Password hashes are never returned.
- `PATCH /api/profile` updates the signed-in student's name and bio with
  server-side validation (`400`/`401` on failure).

Remaining planned routes (assignments, groups, materials, search) and their
purposes are documented in [SPECIFICATION.md](./SPECIFICATION.md). They are
not implemented yet.

## Known issues and planned work

- Assignments, study groups, materials, and search workflows and their API
  routes are not implemented yet.
- Material uploads (Vercel Blob) are decided but not implemented; the
  `BLOB_READ_WRITE_TOKEN` is only needed once issue #4 starts.
- Confirm that the Project Board link is accessible to reviewers.
- The seven open GitHub issues still need owners and must be added to the
  Project Board.

## Project setup status

The repository includes the Next.js App Router project, TypeScript, Tailwind
CSS, ESLint, Prettier, and a Node.js `.gitignore`. The team selected MongoDB
Atlas, Auth.js v5 (credentials), Vercel Blob, and Vercel hosting — see
[docs/TECH_DECISIONS.md](./docs/TECH_DECISIONS.md). Student registration,
sign-in, and profile management are implemented. See
[CONTRIBUTING.md](./CONTRIBUTING.md) for the feature-branch and pull-request
workflow. GitHub collaborator invitations and `main` branch protection are
managed in repository settings.
