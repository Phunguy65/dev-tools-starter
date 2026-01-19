# System Architecture

## Overview

Dev Tools Starter is a Trunk plugin that distributes shared linter/formatter
configurations to consuming projects. Architecture follows a plugin-based
distribution model.

## Architecture Diagram

```sh
┌─────────────────────────────────────────────────────────────┐
│                    Consuming Project                         │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │           .trunk/trunk.yaml                        │    │
│  │  plugins:                                          │    │
│  │    sources:                                        │    │
│  │      - id: dev-tools-starter                       │    │
│  │        uri: github.com/org/dev-tools-starter       │    │
│  └────────────────────────────────────────────────────┘    │
│                          │                                   │
│                          ▼                                   │
│  ┌────────────────────────────────────────────────────┐    │
│  │              Trunk CLI                             │    │
│  │  - Downloads plugin                                │    │
│  │  - Reads plugin.yaml                               │    │
│  │  - Applies exported configs                        │    │
│  └────────────────────────────────────────────────────┘    │
│                          │                                   │
│                          ▼                                   │
│  ┌────────────────────────────────────────────────────┐    │
│  │         Enabled Linters/Formatters                 │    │
│  │  - biome (TS/JS/JSX/JSON)                          │    │
│  │  - ruff + pyright (Python)                         │    │
│  │  - clippy + rustfmt (Rust)                         │    │
│  │  - markdownlint-cli2 (Markdown)                    │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│              Dev Tools Starter Repository                    │
│                                                              │
│  ┌────────────────┐         ┌──────────────────────┐       │
│  │  plugin.yaml   │────────▶│  Trunk Plugin Spec   │       │
│  │  - Linters     │         │  - Versions          │       │
│  │  - Runtimes    │         │  - Exported configs  │       │
│  │  - Actions     │         │  - Actions/hooks     │       │
│  └────────────────┘         └──────────────────────┘       │
│         │                                                    │
│         ▼                                                    │
│  ┌────────────────────────────────────────────────────┐    │
│  │              configs/                              │    │
│  │  ├── biome.json                                    │    │
│  │  ├── ruff.toml                                     │    │
│  │  ├── pyrightconfig.json                            │    │
│  │  ├── clippy.toml                                   │    │
│  │  ├── rustfmt.toml                                  │    │
│  │  └── .markdownlint-cli2.jsonc                      │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

## Components

### 1. Plugin Manifest (plugin.yaml)

**Purpose**: Defines plugin behavior and exported resources

**Responsibilities**:

-   Declare linter versions and enablement
-   Specify runtime requirements (Node, Python, Go, Java)
-   Export configuration file paths
-   Define git hooks and actions
-   Configure additional tools

**Key Sections**:

-   `runtimes`: Language runtime versions (Node 22.16.0, Python 3.10.8, Java 25,
  Go 1.25.6)
-   `lint.enabled`: Active linters with versions (biome, ruff, pyright, clippy,
  rustfmt, markdownlint-cli2, gitleaks, cspell, prettier, dart, stylua,
  shellcheck, shfmt, dotenv-linter)
-   `lint.disabled`: Replaced linters (eslint, google-java-format)
-   `lint.exported_configs`: Config files to distribute
-   `actions.enabled`: Git hooks and automation
-   `tools`: Additional CLI tools (gh, grpcui, gt, trunk-analytics-cli)

### 2. Configuration Files (configs/)

**Purpose**: Language-specific linter/formatter settings

**Structure**:

```sh
configs/
├── biome.json               # TypeScript/JavaScript/JSX/JSON
├── ruff.toml                # Python linting
├── pyrightconfig.json       # Python type checking
├── clippy.toml              # Rust linting
├── rustfmt.toml             # Rust formatting
└── .markdownlint-cli2.jsonc # Markdown linting
```

**Characteristics**:

-   Self-contained (no cross-references)
-   Language-specific best practices
-   Consistent formatting rules (80 char, 4 spaces, LF)
-   Strict linting with practical exceptions

### 3. Trunk CLI (Consumer Side)

**Purpose**: Plugin consumption and enforcement

**Workflow**:

1. Read `.trunk/trunk.yaml` in consuming project
2. Download plugin from specified URI
3. Parse `plugin.yaml` manifest
4. Install required runtimes and linters
5. Apply exported configs to linters
6. Execute linters on relevant files
7. Run git hooks (pre-commit, pre-push)

### 4. Git Hooks

**Purpose**: Automated code quality enforcement

**Enabled Hooks**:

-   `trunk-fmt-pre-commit`: Auto-format staged files before commit
-   `trunk-check-pre-push`: Run linting checks before push
-   `trunk-announce`: Notify about Trunk updates
-   `trunk-cache-prune`: Clean up old cache
-   `trunk-upgrade-available`: Check for plugin updates

## Data Flow

### Configuration Distribution

```sh
1. Config Maintainer
└─▶ Modify configs/ files
└─▶ Commit to main branch
└─▶ Push to GitHub

2. Consuming Project
└─▶ trunk check/fmt command
└─▶ Trunk CLI checks plugin version
└─▶ Downloads latest if needed
└─▶ Applies configs to linters
└─▶ Executes linters on files
```

### Linting Execution

```sh
Developer Action (commit/push/manual)
   │
   ▼
Trunk CLI
   │
   ├─▶ Pre-commit Hook
   │   └─▶ trunk fmt (auto-format staged files)
   │
   ├─▶ Pre-push Hook
   │   └─▶ trunk check (lint all changes)
   │
   └─▶ Manual Command
       ├─▶ trunk check [files]
       └─▶ trunk fmt [files]
```

## Integration Points

### 1. Trunk Plugin System

-   **Protocol**: Trunk plugin specification v0.1
-   **Distribution**: Git repository (GitHub)
-   **Versioning**: Git refs (main, tags, commits)
-   **Discovery**: Via `.trunk/trunk.yaml` plugin sources
-   **Required version**: >= 1.7.1-beta.9

### 2. Language Runtimes

-   **Node.js 22.16.0**: Biome, markdownlint-cli2, Prettier
-   **Python 3.10.8**: Ruff, Pyright
-   **Rust toolchain**: Clippy, rustfmt
-   **Go 1.25.6**: Additional tooling
-   **Java 25**: Prettier Java plugin

### 3. Version Control

-   **Git integration**: Hooks for commit/push
-   **GitHub CLI (gh)**: PR/issue management
-   **Graphite (gt)**: Stacked diffs workflow

### 4. CI/CD

-   **trunk-analytics-cli**: Upload test results
-   **GitHub Actions**: Automated checks
-   **Cache management**: Performance optimization

## Deployment Model

### Plugin Repository

-   **Hosting**: GitHub
-   **Access**: Public or private repo
-   **Updates**: Git-based (pull latest)
-   **Versioning**: Git refs (branches/tags)

### Consuming Projects

-   **Installation**: Add plugin to `.trunk/trunk.yaml`
-   **Updates**: `trunk upgrade` or automatic
-   **Overrides**: Local `.trunk/trunk.yaml` settings
-   **Isolation**: Per-project Trunk installation

## Security Considerations

### Configuration Safety

-   No executable code in configs (declarative only)
-   No secrets or credentials
-   Read-only distribution model
-   Version pinning available

### Runtime Isolation

-   Linters run in sandboxed environments
-   No network access during linting
-   File system access limited to project
-   No arbitrary code execution

### Supply Chain

-   Plugin source verified via Git
-   Linter versions pinned in plugin.yaml
-   Runtime versions specified
-   Checksums validated by Trunk

## Scalability

### Performance

-   Configs cached locally by Trunk
-   Incremental linting (changed files only)
-   Parallel linter execution
-   Cache pruning for disk management

### Maintenance

-   Single source of truth (this repo)
-   Centralized updates propagate automatically
-   No per-project config duplication
-   Version control for config history

## Extension Points

### Adding New Languages

1. Add linter to `plugin.yaml` lint.enabled
2. Create config file in `configs/`
3. Add to exported_configs list
4. Update documentation

### Custom Rules

1. Modify existing config files
2. Test with `trunk check --all`
3. Commit and push changes
4. Consuming projects get updates

### Project-Specific Overrides

Consuming projects can override via `.trunk/trunk.yaml`:

```yaml
lint:
    definitions:
        - name: biome
          files: [typescript, javascript]
          commands:
              - name: check
                custom_config: ./custom-biome.json
```

## Monitoring

### Analytics

-   trunk-analytics-cli for test results
-   Flaky test detection
-   Performance metrics
-   Adoption tracking

### Health Checks

-   Tool version verification
-   Runtime availability checks
-   Config validation
-   Hook execution status
