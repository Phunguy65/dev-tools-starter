# Codebase Summary

## Overview
Trunk plugin repository providing shared linter/formatter configurations for multi-language projects.

## Repository Structure

```
dev-tools-starter/
├── configs/              # Exported configuration files
│   ├── biome.json       # TypeScript/JavaScript/JSX/JSON
│   ├── ruff.toml        # Python linting
│   ├── pyrightconfig.json  # Python type checking
│   ├── clippy.toml      # Rust linting
│   ├── rustfmt.toml     # Rust formatting
│   └── .markdownlint-cli2.jsonc  # Markdown linting
├── plugin.yaml          # Trunk plugin definition
├── package.json         # Node.js dependencies and scripts
└── README.md            # User documentation
```

## Key Files

### plugin.yaml
Trunk plugin manifest defining:
- Enabled linters: biome, clippy, ruff, pyright, rustfmt, markdownlint-cli2
- Runtime versions: Node 22.16.0, Python 3.10.8, Go 1.24.3, Ruby 3.4.2
- Exported configs from `configs/` directory
- Git hooks: pre-commit formatting, pre-push checking
- Additional tools: gh, grpcui, gt, trunk-analytics-cli

### Configuration Files

**biome.json** (1.9.4)
- Line width: 80 chars
- Indent: 4 spaces
- Single quotes for JS/TS
- Trailing commas enforced
- Import extensions required
- Unused imports/variables flagged as errors

**ruff.toml** (0.14.11)
- Selected rules: E, F, W, I, UP, B, SIM, S, TCH, PTH, RUF, N
- Line length: 80
- Single quotes
- Per-file ignores: F401 for __init__.py, S101 for tests

**pyrightconfig.json** (1.1.398)
- Strict type checking mode
- Python 3.10 target
- Reduced noise on unknown types

**clippy.toml** (1.71.1)
- Max 5 function arguments
- Type complexity threshold: 250
- Max 4 single-char bindings

**rustfmt.toml** (1.68.2)
- Edition 2024
- Max width: 80
- 4 space indentation
- Trailing commas enforced
- Control braces on next line
- Comment wrapping enabled

**.markdownlint-cli2.jsonc** (0.16.0)
- Line length: 80
- Dash-style unordered lists
- 4-space list indentation
- Allows specific HTML elements

## Dependencies

### Runtime
- @trunkio/launcher: ^1.3.4
- @types/bun: latest
- TypeScript: ^5 (peer)

### Scripts
- `trunk`: Run Trunk CLI
- `lint`: Check code quality
- `fmt`: Auto-format code

## Integration Points

Projects consume this plugin by:
1. Adding plugin source to `.trunk/trunk.yaml`
2. Trunk automatically downloads and applies configs
3. Configs override local settings for enabled linters

## Maintenance

Config maintainers:
1. Modify files in `configs/`
2. Test with `bun run lint` and `bun run fmt`
3. Update version in plugin.yaml if needed
4. Submit PR for review
