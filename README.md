## Shadcn

we have used some components form this website/library - that help with uniform styling and components. Its important to notice that no all the components are taken form here and many components and structure is self made
https://ui.shadcn.com/docs/components/

## Branch Naming Convention

To ensure consistency and enable our **GitHub Action "Branch Naming Convention"** to run properly, all branches must follow the structure below.

### Format

**<type>/<issue-number>/<branch-name>**

### Examples

**fix/12/bug-fix**
**feat/45/add-user-authentication**
**release/78/prepare-release-v1.2.0**

### Type (Semantic Release Bump)

The first part of the branch name determines what kind of **semantic version bump** you are introducing:

- `fix` – For **patch-level** changes (e.g., bug fixes)
- `feat` – For **minor-level** changes (e.g., new features)
- `release` – For **major-level** changes (e.g., breaking changes or full release preparations)

### Issue Number

Always include the related **issue number** after the type. If there is no issue yet, please create one before starting your branch.

### Branch Name

Use a short and descriptive name using lowercase letters and dashes (`-`) to separate words.

### Commit Message Format — **Important!**

To ensure the **semantic release pipeline works correctly**, all commit messages on that branch **must also start with** the corresponding type:

### Examples

**fix: correct a typo in the login form**
**feat: add support for dark mode**
**release: prepare version 2.0.0**

**Note:** If you do not follow this format, the semantic release pipeline will fail or skip version bumps.

### Summary Table

| Type      | Version Bump     | Branch Example                     | Commit Message Example         |
| --------- | ---------------- | ---------------------------------- | ------------------------------ |
| `fix`     | Patch (`x.x.+1`) | `fix/12/fix-login-error`           | `fix: resolve login crash`     |
| `feat`    | Minor (`x.+1.0`) | `feat/45/add-user-profile`         | `feat: implement profile page` |
| `release` | Major (`+1.0.0`) | `release/78/prepare-major-release` | `release: prepare v2.0.0`      |

---

Following this convention ensures that our CI/CD pipelines run smoothly and that releases are correctly triggered by GitHub Actions.
