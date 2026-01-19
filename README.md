# Dev Tools Starter

Centralized linter and formatter configurations for team projects using Trunk.
Provides standardized code quality tooling across 15+ languages with zero-config
integration.

## Overview

Trunk plugin that exports pre-configured linting and formatting rules. Projects
consume configs by adding this plugin to `.trunk/trunk.yaml`, ensuring
consistent code quality standards across the organization.

## What's Included

### Linters & Formatters

-   **Biome 2.3.10** - TypeScript/JavaScript/JSX/JSON
-   **Ruff 0.14.13** + **Pyright 1.1.408** - Python
-   **Clippy 1.92.0** + **rustfmt 1.92.0** - Rust
-   **markdownlint-cli2 0.20.0** - Markdown
-   **Prettier 3.8.0** - Java/XML/SQL/Prisma/Shell/Tailwind
-   **Dart 3.10.7** - Dart
-   **StyLua 2.3.1** - Lua
-   **Shellcheck 0.11.0** + **shfmt 3.12.0** - Shell scripts
-   **Gitleaks 8.30.0** - Secret scanning
-   **CSpell 9.6.0** - Spell checking (EN/VI)
-   **dotenv-linter 4.0.0** - .env files
-   **git-diff-check** - Whitespace issues

### Git Hooks

-   **Pre-commit**: Auto-format staged files
-   **Pre-push**: Run linting checks

### Additional Tools

-   **gh 2.83.2** - GitHub CLI
-   **grpcui 1.4.3** - gRPC UI
-   **gt 1.7.14** - Graphite CLI
-   **trunk-analytics-cli 0.12.2** - Test analytics

## Quick Start

### For Project Maintainers

1. Install Trunk:

```bash
curl https://get.trunk.io -fsSL | bash
trunk init
```

1. Add plugin to `.trunk/trunk.yaml`:

```yaml
version: 0.1
plugins:
    sources:
        - id: dev-tools-starter
          uri: https://github.com/your-org/dev-tools-starter
          ref: main
```

1. Run linters:

```bash
trunk check       # Check modified files
trunk check --all # Check all files
trunk fmt         # Auto-format files
```

### For Config Maintainers

```bash
pnpm install
pnpm run lint # Run trunk check
pnpm run fmt  # Run trunk fmt
```

## Code Standards

All configurations enforce consistent standards:

-   **Line width**: 80 characters
-   **Indentation**: 4 spaces (no tabs)
-   **Line endings**: Unix (LF)
-   **Quotes**: Single quotes (JS/TS/Python)
-   **Trailing commas**: Always
-   **Import extensions**: Required for JS/TS

See [Code Standards](docs/code-standards.md) for detailed rules.

## Configuration Files

All configs are in `configs/`:

| File                       | Purpose              | Language/Type  |
| -------------------------- | -------------------- | -------------- |
| `biome.json`               | Linting & formatting | TS/JS/JSX/JSON |
| `ruff.toml`                | Linting              | Python         |
| `pyrightconfig.json`       | Type checking        | Python         |
| `clippy.toml`              | Linting              | Rust           |
| `rustfmt.toml`             | Formatting           | Rust           |
| `.markdownlint-cli2.jsonc` | Linting              | Markdown       |
| `cspell.json`              | Spell checking       | All            |
| `.prettierrc.json`         | Formatting           | Multi-language |
| `.stylua.toml`             | Formatting           | Lua            |
| `.golang-ci.json`          | Linting              | Go             |
| `.sql-formatter.json`      | Formatting           | SQL            |
| `.sqlfluff`                | Linting              | SQL            |
| `taplo.toml`               | Formatting           | TOML           |
| `.clang-format`            | Formatting           | C/C++          |
| `.editorconfig`            | Editor settings      | All            |
| `.yamllint.yaml`           | Linting              | YAML           |
| `analysis_options.yaml`    | Linting              | Dart           |

## Documentation

-   [Project Overview & PDR](docs/project-overview-pdr.md) - Project purpose and
  requirements
-   [Codebase Summary](docs/codebase-summary.md) - Repository structure and key
  files
-   [Code Standards](docs/code-standards.md) - Detailed linting rules and style
  guide
-   [System Architecture](docs/system-architecture.md) - Plugin architecture and
  integration
-   [Project Roadmap](docs/project-roadmap.md) - Future plans and milestones
-   [Deployment Guide](docs/deployment-guide.md) - Release and distribution
  process
-   [Design Guidelines](docs/design-guidelines.md) - Configuration design
  principles

## Architecture

```sh
Consuming Project
    │
    ├─▶ .trunk/trunk.yaml (references this plugin)
    │
    ▼
Trunk CLI
    │
    ├─▶ Downloads plugin from GitHub
    ├─▶ Reads plugin.yaml manifest
    ├─▶ Applies exported configs
    │
    ▼
Linters/Formatters
    │
    ├─▶ biome (TS/JS/JSX/JSON)
    ├─▶ ruff + pyright (Python)
    ├─▶ clippy + rustfmt (Rust)
    └─▶ markdownlint-cli2 (Markdown)
```

See [System Architecture](docs/system-architecture.md) for details.

## Runtime Requirements

-   **Trunk CLI**: >= 1.7.1-beta.9
-   **Node.js**: 22.16.0
-   **Python**: 3.10.8
-   **Rust**: Compatible toolchain
-   **Go**: 1.25.6 (for additional tools)
-   **Java**: 25 (for Java formatting)

## Usage Examples

### Check specific files

```bash
trunk check src/main.ts src/utils.py
```

### Format all files

```bash
trunk fmt --all
```

### Check with specific linter

```bash
trunk check --filter=biome src/
```

### Disable specific rules

```bash
# In your project's .trunk/trunk.yaml
lint:
ignore:
- linters: [biome]
paths:
- legacy/**
```

## Overriding Configs

Projects can override configs when necessary:

```yaml
# .trunk/trunk.yaml
lint:
    definitions:
        - name: biome
          files: [typescript, javascript]
          commands:
              - name: check
                custom_config: ./custom-biome.json
```

However, prefer proposing changes upstream to maintain consistency.

## Contributing

1. Fork and clone the repository
2. Make changes to config files in `configs/`
3. Test: `pnpm install && pnpm run lint && trunk check --all`
4. Update documentation if needed
5. Submit PR with clear description

### Testing Locally

```yaml
# In consuming project's .trunk/trunk.yaml
plugins:
    sources:
        - id: dev-tools-starter
          local: /path/to/local/dev-tools-starter
```

### Release Process

Uses [semantic-release](https://semantic-release.gitbook.io/) for automated
versioning:

-   Auto-triggered on push to `main` via GitHub Actions
-   Version bumps: `feat:` → minor, `fix:` → patch, `BREAKING CHANGE:` → major
-   CHANGELOG.md auto-generated and committed
-   Manual: `pnpm run release` or `pnpm run release -- --dry-run`

## Troubleshooting

### Linter not running

```bash
trunk check --verbose # See detailed execution
trunk upgrade         # Update to latest plugin version
```

### Config not applied

```bash
trunk cache clean # Clear Trunk cache
trunk check --all # Re-run with fresh cache
```

### Hook not triggering

```bash
trunk actions enable trunk-fmt-pre-commit
trunk actions enable trunk-check-pre-push
```

## Support

-   **Issues**: Report bugs or request features via GitHub Issues
-   **Discussions**: Ask questions in GitHub Discussions
-   **Documentation**: See `docs/` directory for detailed guides

## Maintainer

Nguyễn Ngọc Phú (<ngocphunguyenabc@gmail.com>)
