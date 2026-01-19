# Codebase Summary

## Overview

Trunk plugin repository providing shared linter/formatter configurations for 15+
languages with zero-config integration.

## Repository Structure

```sh
dev-tools-starter/
├── configs/                   # Exported configuration files
│ ├── biome.json               # TypeScript/JavaScript/JSX/JSON
│ ├── ruff.toml                # Python linting
│ ├── pyrightconfig.json       # Python type checking
│ ├── clippy.toml              # Rust linting
│ ├── rustfmt.toml             # Rust formatting
│ ├── .markdownlint-cli2.jsonc # Markdown linting
│ ├── cspell.json              # Spell checking
│ ├── prettier.config.json     # Multi-language formatting
│ ├── .stylua.toml             # Lua formatting
│ ├── .golang-ci.json          # Go linting
│ ├── .sql-formatter.json      # SQL formatting
│ ├── .sqlfluff                # SQL linting
│ ├── taplo.toml               # TOML formatting
│ ├── .clang-format            # C/C++ formatting
│ ├── .editorconfig            # Editor settings
│ ├── .yamllint.yaml           # YAML linting
│ ├── analysis_options.yaml    # Dart linting
│ ├── commitlint-config/       # Shared commitlint config
│ └── semantic-release-config/ # Shared semantic-release config
├── .github/workflows/         # CI/CD workflows
│ └── release.yml              # Automated release workflow
├── plugin.yaml                # Trunk plugin definition
├── package.json               # Node.js dependencies and scripts
├── .releaserc.json            # Semantic-release config
└── README.md                  # User documentation
```

## Key Files

### plugin.yaml

Trunk plugin manifest defining:

-   **Enabled linters**: biome@2.3.10, clippy@1.92.0, cspell@9.6.0,
  git-diff-check, gitleaks@8.30.0, pyright@1.1.408, ruff@0.14.13,
  rustfmt@1.92.0, dotenv-linter@4.0.0, shellcheck@0.11.0, shfmt@3.12.0,
  stylua@2.3.1, dart@3.10.7, prettier@3.8.0, markdownlint-cli2@0.20.0
-   **Runtime versions**: Node 22.16.0, Python 3.10.8, Java 25, Go 1.25.6
-   **Exported configs**: All files from `configs/` directory
-   **Git hooks**: trunk-fmt-pre-commit, trunk-check-pre-push
-   **Additional tools**: gh@2.83.2, grpcui@1.4.3, gt@1.7.14,
  trunk-analytics-cli@0.12.2
-   **Disabled linters**: eslint, google-java-format (replaced by biome and
  prettier)

### Configuration Files

**biome.json** (2.3.10)

-   Line width: 80 chars
-   Indent: 4 spaces
-   Single quotes for JS/TS
-   Trailing commas enforced
-   Import extensions required
-   Unused imports/variables flagged as errors

**ruff.toml** (0.14.13)

-   Selected rules: E, F, W, I, UP, B, SIM, S, TCH, PTH, RUF, N
-   Line length: 80
-   Single quotes
-   Per-file ignores: F401 for **init**.py, S101 for tests

**pyrightconfig.json** (1.1.408)

-   Strict type checking mode
-   Python 3.10 target
-   Reduced noise on unknown types

**clippy.toml** (1.92.0)

-   Max 5 function arguments
-   Type complexity threshold: 250
-   Max 4 single-char bindings

**rustfmt.toml** (1.92.0)

-   Edition 2024
-   Max width: 80
-   4 space indentation
-   Trailing commas enforced
-   Control braces on next line
-   Comment wrapping enabled

**.markdownlint-cli2.jsonc** (0.20.0)

-   Line length: 80
-   Dash-style unordered lists
-   4-space list indentation
-   Allows specific HTML elements

**cspell.json** (9.6.0)

-   Languages: en, vi
-   Ignores: node_modules, dist, build
-   Spell checking for code and docs

**.prettierrc.json** (3.8.0)

-   Plugins: java, packagejson, xml, prisma, sh, sql, tailwindcss
-   Line width: 80
-   Indentation: 4 spaces
-   Single quotes

**.stylua.toml** (2.3.1)

-   Column width: 80
-   Indent type: spaces (4)
-   Quote style: AutoPreferSingle

**.golang-ci.json**

-   Golangci-lint configuration
-   Multiple linters enabled

**.sql-formatter.json**

-   SQL formatting rules
-   Consistent style

**.sqlfluff**

-   SQL linting rules
-   Dialect-specific settings

**taplo.toml**

-   TOML formatting
-   Consistent style

**.clang-format**

-   C/C++ formatting
-   LLVM style base

**.editorconfig**

-   Universal editor settings
-   Consistent across IDEs

**.yamllint.yaml**

-   YAML linting rules
-   Indentation and syntax checks

**analysis_options.yaml**

-   Dart linting rules
-   Flutter compatibility

### Shared Configs

**configs/commitlint-config/**

-   Exportable commitlint configuration
-   Conventional commits enforcement

**configs/semantic-release-config/**

-   Exportable semantic-release configuration
-   Automated versioning and changelog

### Release Configuration

**.releaserc.json**

-   Extends shared semantic-release config
-   Conventional commits parsing
-   CHANGELOG.md generation
-   GitHub releases with assets
-   No npm publishing (plugin only)

**.github/workflows/release.yml**

-   Automated release on push to main
-   Node.js 25.3.0, pnpm 10.28.0
-   Runs semantic-release

## Dependencies

### Runtime

-   @trunkio/launcher: ^1.3.4
-   @types/bun: latest
-   TypeScript: ^5 (peer)

### DevDependencies

-   @semantic-release/changelog: ^6.0.3
-   @semantic-release/commit-analyzer: ^10.0.2
-   @semantic-release/git: ^10.0.1
-   @semantic-release/github: ^12.0.2
-   @semantic-release/npm: ^13.1.3
-   @semantic-release/release-notes-generator: ^10.0.2
-   conventional-changelog-conventionalcommits: ^9.1.0
-   semantic-release: ^25.0.2

### Scripts

-   `trunk`: Run Trunk CLI
-   `lint`: Check code quality
-   `fmt`: Auto-format code
-   `release`: Run semantic-release

## Integration Points

Projects consume this plugin by:

1. Adding plugin source to `.trunk/trunk.yaml`
2. Trunk automatically downloads and applies configs
3. Configs override local settings for enabled linters
4. Git hooks enforce formatting and linting

## Maintenance

Config maintainers:

1. Modify files in `configs/`
2. Test with `pnpm install && pnpm run lint`
3. Commit using conventional commits
4. Push to main triggers automated release
5. Semantic-release handles versioning and changelog
