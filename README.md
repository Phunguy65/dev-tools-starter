# Dev Tools Starter

Shared linter and formatter configurations for internal team projects using
Trunk. Provides standardized code quality tooling across TypeScript/JavaScript,
Python, Rust, and Markdown codebases.

## Overview

This repository serves as a Trunk plugin that exports pre-configured linting
and formatting rules. Projects consume these configs by adding this plugin to
their `.trunk/trunk.yaml`, ensuring consistent code quality standards across
the organization.

## What's Included

### Linters & Formatters

- **Biome 1.9.4** - TypeScript, JavaScript, TSX, JSX, JSON
- **Ruff 0.14.11** - Python linting
- **Pyright 1.1.398** - Python type checking
- **Clippy 1.71.1** - Rust linting
- **rustfmt 1.68.2** - Rust formatting
- **markdownlint-cli2 0.16.0** - Markdown linting
- **Gitleaks** - Secret scanning
- **CSpell** - Spell checking
- **Prettier** - Java formatting (via prettier-plugin-java)

### Git Hooks

- **Pre-commit**: Auto-format staged files
- **Pre-push**: Run linting checks

### Additional Tools

- **gh 2.83.2** - GitHub CLI
- **grpcui 1.4.3** - gRPC UI
- **gt 1.7.14** - Graphite CLI
- **trunk-analytics-cli 0.12.2** - Test analytics

## Quick Start

### For Project Maintainers

1. Install Trunk in your project:

```bash
curl https://get.trunk.io -fsSL | bash
trunk init
```

2. Add this plugin to your `.trunk/trunk.yaml`:

```yaml
version: 0.1
plugins:
  sources:
    - id: dev-tools-starter
      uri: https://github.com/your-org/dev-tools-starter
      ref: main
```

3. Run linters:

```bash
trunk check        # Check modified files
trunk check --all  # Check all files
trunk fmt          # Auto-format files
```

### For Config Maintainers

To modify the shared configs:

```bash
bun install
bun run lint  # Run trunk check
bun run fmt   # Run trunk fmt
```

## Code Standards

All configurations enforce consistent standards:

- **Line width**: 80 characters
- **Indentation**: 4 spaces (no tabs)
- **Line endings**: Unix (LF)
- **Quotes**: Single quotes (JS/TS/Python)
- **Trailing commas**: Always
- **Import extensions**: Required for JS/TS

See [Code Standards](docs/code-standards.md) for detailed rules.

## Configuration Files

All configs are in `configs/`:

| File                       | Purpose              | Language       |
| -------------------------- | -------------------- | -------------- |
| `biome.json`               | Linting & formatting | TS/JS/JSX/JSON |
| `ruff.toml`                | Linting              | Python         |
| `pyrightconfig.json`       | Type checking        | Python         |
| `clippy.toml`              | Linting              | Rust           |
| `rustfmt.toml`             | Formatting           | Rust           |
| `.markdownlint-cli2.jsonc` | Linting              | Markdown       |
| `cspell.json`              | Spell checking       | All            |
| `prettier/*`               | Formatting           | Java           |

## Documentation

- [Project Overview & PDR](docs/project-overview-pdr.md) - Project purpose
  and requirements
- [Codebase Summary](docs/codebase-summary.md) - Repository structure and
  key files
- [Code Standards](docs/code-standards.md) - Detailed linting rules and
  style guide
- [System Architecture](docs/system-architecture.md) - Plugin architecture
  and integration

## Architecture

```
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

- **Trunk CLI**: >= 1.7.1-beta.9
- **Node.js**: 22.16.0
- **Python**: 3.10.8
- **Rust**: Compatible toolchain
- **Go**: 1.24.3 (for additional tools)
- **Ruby**: 3.4.2 (for additional tools)
- **Java**: 21 (for Java formatting)

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

### Making Changes

1. Fork and clone the repository
2. Make changes to config files in `configs/`
3. Test changes:
   ```bash
   bun install
   bun run lint
   bun run fmt
   trunk check --all
   ```
4. Update documentation if needed
5. Submit PR with clear description

### Testing Changes Locally

Test plugin changes in a consuming project:

```yaml
# In consuming project's .trunk/trunk.yaml
plugins:
  sources:
    - id: dev-tools-starter
      local: /path/to/local/dev-tools-starter
```

### Commit Guidelines

- Use conventional commit format
- Focus on "why" not "what"
- Keep first line under 72 characters
- Include co-author attribution for AI assistance

## Troubleshooting

### Linter not running

```bash
trunk check --verbose  # See detailed execution
trunk upgrade          # Update to latest plugin version
```

### Config not applied

```bash
trunk cache clean      # Clear Trunk cache
trunk check --all      # Re-run with fresh cache
```

### Hook not triggering

```bash
trunk actions enable trunk-fmt-pre-commit
trunk actions enable trunk-check-pre-push
```

## Support

- **Issues**: Report bugs or request features via GitHub Issues
- **Discussions**: Ask questions in GitHub Discussions
- **Documentation**: See `docs/` directory for detailed guides

## License

[Specify license here]

## Maintainers

[List maintainers here]
