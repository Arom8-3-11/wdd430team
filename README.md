# StudyConnect

StudyConnect is a web application that helps college and university students organize their academic activities and collaborate by sharing study materials, managing assignments, and connecting through study groups.

## Team

- Audrey Romrell
- Guinter Chissengue
- Charles Isama

## Project files

The Next.js application is in [`studyconnect/`](./studyconnect/).

- [Project specification](./SPECIFICATION.md)
- [Contribution and branching guidelines](./CONTRIBUTING.md)
- [GitHub issue backlog](./docs/ISSUE_BACKLOG.md)

## Local development

Run these commands from the `studyconnect` directory:

```bash
npm install
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
Add any required environment variables after the team selects authentication
and file-storage providers. Do not commit secrets to the repository.

## API documentation

- `GET /api/hello` returns `{ "message": "Hello, world!" }`. This is the only
  implemented API route in the initial scaffold.
- Planned API routes and their purposes are documented in
  [SPECIFICATION.md](./SPECIFICATION.md). They are not implemented yet.

## Known issues and planned work

- Authentication and file-storage providers still need to be selected.
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
