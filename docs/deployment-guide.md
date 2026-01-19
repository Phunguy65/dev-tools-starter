# Deployment Guide

## Overview

Dev Tools Starter uses automated releases via semantic-release. Releases are
triggered automatically on push to `main` branch via GitHub Actions.

## Release Process

### Automated Release (Recommended)

1. Make changes to config files in `configs/`
2. Commit using conventional commit format
3. Push to `main` branch
4. GitHub Actions automatically:
    -   Analyzes commits
    -   Determines version bump
    -   Generates CHANGELOG.md
    -   Creates GitHub release
    -   Updates package.json version
    -   Commits changes back to main

### Manual Release (Testing)

```bash
# Dry run to preview release
pnpm run release -- --dry-run

# Manual release (requires GITHUB_TOKEN)
export GITHUB_TOKEN=your_token
pnpm run release
```

## Commit Message Format

Uses conventional commits for version determination:

### Version Bumps

-   `feat:` → Minor version (1.0.0 → 1.1.0)
-   `fix:` → Patch version (1.0.0 → 1.0.1)
-   `BREAKING CHANGE:` → Major version (1.0.0 → 2.0.0)
-   `docs:`, `style:`, `refactor:` → Patch version

### Examples

```bash
# Minor version bump
git commit -m "feat: add Go linting support"

# Patch version bump
git commit -m "fix: correct biome line width setting"

# Patch version bump
git commit -m "docs: update README with new examples"

# Major version bump
git commit -m "feat: restructure config exports

BREAKING CHANGE: config file paths have changed"
```

## Release Configuration

### .releaserc.json

Located at project root, extends shared config:

```json
{
    "$schema": "https://json.schemastore.org/semantic-release",
    "extends": ["./configs/semantic-release-config/.releaserc.json"]
}
```

### Shared Config

Located at `configs/semantic-release-config/.releaserc.json`:

**Plugins**:

-   `@semantic-release/commit-analyzer` - Analyzes commits
-   `@semantic-release/release-notes-generator` - Generates release notes
-   `@semantic-release/changelog` - Updates CHANGELOG.md
-   `@semantic-release/npm` - Updates package.json (no publish)
-   `@semantic-release/github` - Creates GitHub release
-   `@semantic-release/git` - Commits version changes

**Release Rules**:

-   `feat:` → minor
-   `fix:` → patch
-   `docs:` (README scope) → patch
-   `refactor:` → patch
-   `style:` → patch

## GitHub Actions Workflow

### .github/workflows/release.yml

**Trigger**: Push to `main` branch

**Environment**:

-   Node.js 25.3.0
-   pnpm 10.28.0
-   Ubuntu latest

**Permissions**:

-   `contents: write` - Commit version changes
-   `issues: write` - Comment on issues
-   `pull-requests: write` - Comment on PRs

**Steps**:

1. Checkout with full history
2. Setup Node.js and pnpm
3. Install dependencies
4. Run semantic-release

## Version Management

### package.json

Version is automatically updated by semantic-release:

```json
{
    "name": "dev-tools-starter",
    "version": "1.2.3"
}
```

### CHANGELOG.md

Auto-generated with sections:

-   🚀 Features
-   🐞 Bug Fixes
-   📚 Documentation
-   💄 Styles
-   ♻️ Code Refactoring
-   ⚡ Performance Improvements
-   ✅ Tests
-   🏗️ Build System
-   👷 CI

## GitHub Releases

Each release includes:

-   Release notes from CHANGELOG.md
-   CHANGELOG.md as downloadable asset
-   Git tag (e.g., v1.2.3)
-   Commit SHA

## Consuming Projects

### Plugin Version Pinning

Projects can pin to specific versions:

```yaml
# .trunk/trunk.yaml
plugins:
    sources:
        - id: dev-tools-starter
          uri: https://github.com/your-org/dev-tools-starter
          ref: v1.2.3 # Pin to specific version
```

### Using Latest

```yaml
plugins:
    sources:
        - id: dev-tools-starter
          uri: https://github.com/your-org/dev-tools-starter
          ref: main # Always use latest
```

### Updating Plugin

```bash
# Update to latest version
trunk upgrade

# Check current version
trunk plugins list
```

## Rollback Procedure

If a release introduces issues:

1. Identify last known good version
2. Update consuming projects to pin that version
3. Fix issues in new commits
4. Release new version with fixes

```yaml
# Temporary rollback in consuming project
plugins:
    sources:
        - id: dev-tools-starter
          uri: https://github.com/your-org/dev-tools-starter
          ref: v1.2.2 # Previous working version
```

## Testing Before Release

### Local Testing

```bash
# Test configs locally
pnpm install
pnpm run lint
pnpm run fmt
trunk check --all
```

### Test in Consuming Project

```yaml
# .trunk/trunk.yaml in test project
plugins:
    sources:
        - id: dev-tools-starter
          local: /path/to/local/dev-tools-starter
```

## Troubleshooting

### Release Not Triggered

**Check**:

-   Commits use conventional format
-   Push is to `main` branch
-   GitHub Actions is enabled
-   GITHUB_TOKEN has correct permissions

### Version Not Bumped

**Check**:

-   Commit messages follow conventional format
-   Commits include releasable types (feat, fix, etc.)
-   No `[skip ci]` in commit messages

### CHANGELOG Not Updated

**Check**:

-   semantic-release completed successfully
-   Git user configured in workflow
-   No merge conflicts in CHANGELOG.md

## Best Practices

1. **Commit Messages**: Always use conventional format
2. **Testing**: Test changes locally before pushing
3. **Breaking Changes**: Document in commit body
4. **Version Pinning**: Pin versions in production projects
5. **Rollback Plan**: Know how to rollback if needed
6. **Release Notes**: Review auto-generated notes for accuracy

## Security

-   Never commit GITHUB_TOKEN to repository
-   Use GitHub Actions secrets for tokens
-   Limit workflow permissions to minimum required
-   Review release notes before publishing

## Monitoring

### Check Release Status

```bash
# View recent releases
gh release list

# View specific release
gh release view v1.2.3

# View workflow runs
gh run list --workflow=release.yml
```

### Verify Plugin Distribution

```bash
# In consuming project
trunk plugins list
trunk check --verbose
```
