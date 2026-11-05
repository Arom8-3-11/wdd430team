# Draft GitHub issue backlog

These seven drafts are ready to turn into GitHub Issues and add to the team's
Project Board. They are not GitHub issues yet; create and assign them in GitHub.
Use labels such as `must-fix`, `should-fix`, and priority labels if the team
adopts them.

## 1. Decide and document persistence, authentication, and file storage

**Priority:** P0

**Problem:** The application needs a data store, authentication provider, and
file-storage approach before it can persist accounts, assignments, groups, or
materials.

**Acceptance criteria:**

- Compare viable choices against the course timeline and team experience.
- Record the selected providers and required environment variables.
- Document local setup without committing secrets.

## 2. Add student registration, sign-in, and profile management

**Priority:** P0

**Problem:** Students need accounts to own assignments, materials, and group
memberships.

**Acceptance criteria:**

- Students can register and sign in using the selected authentication approach.
- Invalid input and authentication failures have clear messages.
- A signed-in student can view and update their own profile.
- Protected operations reject unauthenticated requests.

## 3. Implement assignment tracking

**Priority:** P0

**Problem:** Students currently have no way to organize coursework in the app.

**Acceptance criteria:**

- A student can create, list, view, edit, and delete their assignments.
- Each assignment includes a title, due date, and status.
- Required input is validated and users cannot edit another student's
  assignments.
- Empty and error states are shown.

## 4. Implement material upload and download

**Priority:** P0

**Problem:** Students need a way to contribute and retrieve course resources.

**Acceptance criteria:**

- A signed-in student can share a material with a title, subject, and
  description.
- Uploads use the team-approved storage provider and supported file types.
- Students can download available materials.
- Upload errors and invalid files are reported clearly.

## 5. Build the material browsing and search experience

**Priority:** P1

**Problem:** Shared resources are not useful if students cannot discover
relevant materials.

**Acceptance criteria:**

- Students can browse material metadata and open a material detail view.
- Search matches material titles, descriptions, or subjects.
- Empty search results and loading/error states are clear.
- The interface is usable on mobile and desktop.

## 6. Implement study-group creation and membership

**Priority:** P0

**Problem:** Students need a structured way to organize collaboration with
classmates.

**Acceptance criteria:**

- A signed-in student can create a group with a name, subject, and description.
- Students can browse groups and join an available group.
- Duplicate membership requests are handled safely.
- Group creation and membership changes have clear success and error states.

## 7. Add unified search for study groups

**Priority:** P1

**Problem:** Students need to find groups by subject or keyword.

**Acceptance criteria:**

- Students can search groups by name, subject, or description.
- Results link to group details and show useful identifying information.
- Empty results are explained and clearing a query restores the browse view.
- Search behavior is covered by focused tests.
