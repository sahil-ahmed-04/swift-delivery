# Git Workflow & Branching Strategy

## 1. Branching Strategy

We use a structured **Git Flow** variant designed for clean development and safe releases:

```
main (Production releases)
  ▲
  │ PR / Merge (Tag v1.0.0, v1.1.0)
  │
develop (Active development integration)
  ▲
  ├── feature/auth-jwt
  ├── feature/product-catalog
  ├── feature/order-state-machine
  └── fix/cart-calc-overflow
```

### Branch Rules

- **`main`**:
  - Always deployable and tested.
  - No direct commits allowed.
  - Tagged with semantic versions (`v0.1.0`, `v1.0.0`).
- **`develop`**:
  - Main integration branch where feature branches merge.
  - Serves as the base for all new feature development.
- **`feature/<name>`**:
  - Branched off `develop`.
  - Focused on a specific phase or functional task (e.g. `feature/phase-2-mongo-models`).
  - Merged back into `develop` via clean commits or Pull Requests.
- **`fix/<name>`**:
  - For non-breaking bug fixes.

---

## 2. Commit Message Conventions

We follow Conventional Commits:

```
<type>(<scope>): <short summary>

[optional body]
```

### Allowed Types:
- `feat`: New feature for user/developer.
- `fix`: Bug fix.
- `docs`: Documentation changes only.
- `style`: Formatting, missing semicolons, etc. (no code change).
- `refactor`: Code change that neither fixes a bug nor adds a feature.
- `test`: Adding missing tests or correcting existing tests.
- `chore`: Changes to build process, dependency updates, or tooling.

### Examples:
- `feat(auth): implement jwt token generation and refresh flow`
- `fix(orders): validate stock availability before creating order`
- `docs(readme): add local setup and docker instructions`
- `chore(deps): update nestjs dependencies`
