# Contributing

## Branching and pull requests

- Keep `main` stable; do not push feature work directly to it.
- Create a branch for each task, using a descriptive name such as
  `feature/assignment-tracking` or `fix/material-search`.
- Open a pull request to merge work into `main`.
- Request review from at least one other team member and address feedback before
  merging.
- Run `npm run lint`, `npm run format:check`, and `npm run build` in `studyconnect`
  before requesting review.

These are team conventions, not proof that GitHub has enforced them. A
repository administrator must enable branch protection for `main` and require
pull requests and at least one approving review in the repository's branch
protection or ruleset settings.

## GitHub team setup

The repository is public at
[Arom8-3-11/wdd430team](https://github.com/Arom8-3-11/wdd430team). We
selected MongoDB and Vercel; authentication and file storage remain undecided.

A repo administrator still needs to:
1. Invite all team members as collaborators.
2. Protect `main` and require pull requests with at least one approval.
3. Create a GitHub Project Board, add all seven open project issues, and assign
   owners. Add the confirmed Board URL to the README and issue backlog.

## Pull request checklist

- [ ] The change matches the project specification or documents an agreed update to it.
- [ ] Lint, formatting checks, and production build pass.
- [ ] The UI works at mobile and desktop widths when it changes the UI.
- [ ] The pull request describes what changed and how it was verified.
