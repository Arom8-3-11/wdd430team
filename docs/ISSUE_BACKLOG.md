# GitHub issue backlog

The repository has seven open project issues. Their Project Board URL has not
been confirmed, and the issues currently have no assignees. After creating the
board, add all seven issues to it, assign owners, and replace this note with
the confirmed board link.

## 1. Document MongoDB setup and choose authentication and file storage

**GitHub issue:** [#1](https://github.com/Arom8-3-11/wdd430team/issues/1)
**Priority:** P0

**Problem:** The team selected MongoDB, but still needs to document the
connection approach and choose authentication and file-storage providers
before implementing persistent accounts and materials.

**Acceptance criteria:**

- Document the MongoDB connection approach and required environment variables.
- Select Auth.js v5 or Clerk for authentication.
- Select a file-storage provider and supported upload formats.
- Document local setup without committing secrets.

## 2. Add student registration, sign-in, and profile management

**GitHub issue:** [#2](https://github.com/Arom8-3-11/wdd430team/issues/2)
**Priority:** P0

**Problem:** Students need accounts to own assignments, materials, and group
memberships.

**Acceptance criteria:**

- Students can register and sign in using the selected authentication approach.
- Invalid input and authentication failures have clear messages.
- A signed-in student can view and update their own profile.
- Protected operations reject unauthenticated requests.

## 3. Implement assignment tracking

**GitHub issue:** [#3](https://github.com/Arom8-3-11/wdd430team/issues/3)
**Priority:** P0

**Problem:** Students currently have no way to organize coursework in the app.

**Acceptance criteria:**

- A student can create, list, view, edit, and delete their assignments.
- Each assignment includes a title, due date, and status.
- Required input is validated and users cannot edit another student's
  assignments.
- Empty and error states are shown.

## 4. Implement material upload and download

**GitHub issue:** [#4](https://github.com/Arom8-3-11/wdd430team/issues/4)
**Priority:** P0

**Problem:** Students need a way to contribute and retrieve course resources.

**Acceptance criteria:**

- A signed-in student can share a material with a title, subject, and
  description.
- Uploads use the team-approved storage provider and supported file types.
- Students can download available materials.
- Upload errors and invalid files are reported clearly.

## 5. Build the material browsing and search experience

**GitHub issue:** [#6](https://github.com/Arom8-3-11/wdd430team/issues/6)
**Priority:** P1

**Problem:** Shared resources are not useful if students cannot discover
relevant materials.

**Acceptance criteria:**

- Students can browse material metadata and open a material detail view.
- Search matches material titles, descriptions, or subjects.
- Empty search results and loading/error states are clear.
- The interface is usable on mobile and desktop.

## 6. Implement study-group creation and membership

**GitHub issue:** [#5](https://github.com/Arom8-3-11/wdd430team/issues/5)
**Priority:** P0

**Problem:** Students need a structured way to organize collaboration with
classmates.

**Acceptance criteria:**

- A signed-in student can create and view a group with a name, subject, and
  description.
- The group owner can update or delete their group; other students cannot
  modify or delete it.
- Students can browse groups and join an available group.
- A student can leave a group they joined.
- Duplicate membership requests are handled safely.
- Group creation and membership changes have clear success and error states.

## 7. Add unified search for study groups

**GitHub issue:** [#7](https://github.com/Arom8-3-11/wdd430team/issues/7)
**Priority:** P1

**Problem:** Students need to find groups by subject or keyword.

**Acceptance criteria:**

- Students can search groups by name, subject, or description.
- Results link to group details and show useful identifying information.
- Empty results are explained and clearing a query restores the browse view.
- Search behavior is covered by focused tests.
