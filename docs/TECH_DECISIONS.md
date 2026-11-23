# StudyConnect technical decisions

**Status:** Decided by the team. This records the persistence, authentication,
and file-storage choices required by
[issue #1](https://github.com/Arom8-3-11/wdd430team/issues/1) and unblocks the
account, assignment, group, and material features in the
[project specification](../SPECIFICATION.md).

## Summary of decisions

| Concern | Decision | Key environment variables |
|---------|----------|---------------------------|
| Database | **MongoDB Atlas** (free M0 tier) via the official `mongodb` driver | `MONGODB_URI`, `MONGODB_DB` |
| Authentication | **Auth.js v5** (`next-auth@5`) with a Credentials provider (email + password, bcrypt-hashed) and JWT sessions | `AUTH_SECRET` |
| File storage | **Vercel Blob** for shared study materials | `BLOB_READ_WRITE_TOKEN` |

## Options considered

### Authentication: Auth.js v5 vs Clerk

| Criteria | Auth.js v5 (chosen) | Clerk |
|----------|--------------------|-------|
| Cost | Free and open source | Free tier with monthly active-user limits |
| Course fit | Credentials flow runs through our own Next.js route handlers and MongoDB, which matches the course requirement to demonstrate a Client Component → Route Handler → MongoDB operation with server-side validation | Hosted UI hides most of the auth flow from our code |
| Team setup | No external dashboard; everything lives in the repo plus one `AUTH_SECRET` | Whole team must share one Clerk dashboard and sync API keys |
| Timeline risk | Moderate: we write register/sign-in forms ourselves | Low for UI, but adds vendor onboarding and webhook complexity for syncing users into MongoDB |
| Vendor lock-in | None | User records live in Clerk, not our database |

**Decision: Auth.js v5.** It keeps user records in our MongoDB database (which
assignments, materials, and group memberships must reference), costs nothing,
and directly satisfies the course's route-handler demonstration requirement.

### Database hosting: MongoDB Atlas

MongoDB was already selected by the team per the course constraints. Atlas's
free M0 cluster is the standard hosting option: it needs no local install,
works from both local dev and Vercel, and every teammate can share one cluster
with their own database user. A locally installed MongoDB is a fallback for
offline work but is not required.

**Connection approach:** the official `mongodb` Node.js driver with a single
cached `MongoClient` (see `studyconnect/lib/mongodb.ts`). The client promise is
cached on `globalThis` so Next.js dev-mode hot reloads do not exhaust Atlas
connections. An ODM (Mongoose) was considered but rejected: the driver plus
TypeScript interfaces and Zod validation covers our needs without another
dependency to learn mid-course.

### File storage: Vercel Blob vs Cloudinary vs UploadThing

| Criteria | Vercel Blob (chosen) | Cloudinary | UploadThing |
|----------|---------------------|------------|-------------|
| Integration | First-party on Vercel, one token, simple `@vercel/blob` SDK | Separate account, URL-transform focus (image-centric) | Separate account and SDK |
| Free tier | Generous hobby allowance for course-scale files | Good, but image-oriented | Limited |
| Fit | General files (PDF, docs, images) suit study materials | Best for images/video only | Fine, but adds a third-party dashboard |

**Decision: Vercel Blob.** We already deploy on Vercel, so storage lives in the
same dashboard with one environment variable.

**Supported upload formats (for issue #4):** PDF (`.pdf`), Word documents
(`.doc`, `.docx`), plain text/Markdown (`.txt`, `.md`), and images (`.png`,
`.jpg`, `.jpeg`, `.webp`), with a 10 MB per-file limit. Uploads are validated
server-side by extension and MIME type.

## Required environment variables

All variables live in `studyconnect/.env.local` for local development and in
the Vercel project settings for deployments.

| Variable | Required for | Where to get it |
|----------|--------------|-----------------|
| `MONGODB_URI` | Accounts, and all persistent features | Atlas → Database → Connect → Drivers. Create a database user and allow your IP (or `0.0.0.0/0` for coursework) under Network Access. |
| `MONGODB_DB` | Optional; defaults to `studyconnect` | Any database name; using one shared name keeps the team's data together. |
| `AUTH_SECRET` | Signing session tokens (Auth.js) | Generate with `npx auth secret` or `openssl rand -base64 32`. Each environment can use a different value. |
| `AUTH_TRUST_HOST` | Running `next start` locally (set to `true`) | Static value; Vercel deployments set the equivalent automatically. |
| `BLOB_READ_WRITE_TOKEN` | Material uploads (issue #4, not yet implemented) | Vercel → Storage → Blob → create store → token. |

## Safe local setup (no secrets in git)

1. `cd studyconnect`
2. `cp .env.example .env.local` (Windows: `Copy-Item .env.example .env.local`)
3. Fill in `MONGODB_URI` and `AUTH_SECRET` in `.env.local`.
4. `npm install` then `npm run dev`.

The repository `.gitignore` excludes `.env` and `.env.*` (only `.env.example`
is tracked), so `.env.local` is never committed. Rules:

> **Troubleshooting:** if sign-in/register fails with
> `querySrv ECONNREFUSED` in the server log, your network's DNS resolver is
> blocking SRV lookups. Use the cluster's **legacy (non-SRV) connection
> string** instead: Atlas → Connect → Drivers → toggle "Legacy URI String"
> (it starts with `mongodb://` and lists three hosts explicitly).

- Never paste real connection strings, tokens, or secrets into tracked files,
  issues, or pull requests.
- Share secrets with teammates through a private channel, not the repo.
- If a secret leaks, rotate it (Atlas password, new `AUTH_SECRET`, new Blob
  token) and update Vercel + local `.env.local` files.

## Confirmation against the project specification

| Core workflow | Supported by |
|---------------|--------------|
| Student accounts & profiles | Auth.js v5 credentials sign-in; users stored in MongoDB `users` collection (implemented) |
| Assignments CRUD with ownership | MongoDB documents referencing the owner's user id; route handlers check the Auth.js session |
| Study groups & membership | MongoDB collections with owner/member references to `users`; session checks enforce the owner rule |
| Material sharing & downloads | Metadata in MongoDB, files in Vercel Blob, downloads gated by an Auth.js session check |
| Search | MongoDB queries/indexes over material and group fields |

All choices run on the course-required stack (Next.js App Router, TypeScript,
MongoDB, Vercel) and need no paid plans.
