# Project Overview & PDR

## Project Name

Dev Tools Starter

## Purpose

Centralized linter and formatter configurations for team projects using Trunk.
Provides standardized code quality tooling across 15+ languages including
TypeScript/JavaScript, Python, Rust, Markdown, Java, Dart, Lua, Shell, SQL,
TOML, YAML, C/C++, and more.

## Problem Statement

Teams need consistent code quality standards across multiple languages and
projects. Managing individual linter/formatter configurations per project
creates maintenance overhead, inconsistent code style, and configuration drift
across the organization.

## Solution

Centralized Trunk plugin that exports pre-configured linting and formatting
rules for:

-   TypeScript/JavaScript/JSX/JSON (Biome 2.3.10)
-   Python (Ruff 0.14.13 + Pyright 1.1.408)
-   Rust (Clippy 1.92.0 + rustfmt 1.92.0)
-   Markdown (markdownlint-cli2 0.20.0)
-   Multi-language (Prettier 3.8.0: Java/XML/SQL/Prisma/Shell/Tailwind)
-   Dart (Dart 3.10.7)
-   Lua (StyLua 2.3.1)
-   Shell scripts (Shellcheck 0.11.0 + shfmt 3.12.0)
-   TOML (Taplo)
-   C/C++ (clang-format)
-   YAML (yamllint)
-   .env files (dotenv-linter 4.0.0)
-   Security (Gitleaks 8.30.0, CSpell 9.6.0)
-   Whitespace (git-diff-check)

## Target Users

-   **Project Maintainers**: Consume configs via Trunk plugin
-   **Config Maintainers**: Update and maintain shared configurations
-   **Development Teams**: Benefit from consistent code quality standards

## Key Features

-   Single source of truth for code quality configs
-   Zero-config integration via Trunk plugin system
-   Language-specific best practices enforced
-   Consistent formatting rules (80 char line width, Unix line endings)
-   Strict type checking and linting rules
-   Automated releases via semantic-release
-   Git hooks for pre-commit formatting and pre-push checks
-   Exportable configurations for reuse across projects

## Success Metrics

-   Adoption across internal projects
-   Reduced config duplication
-   Consistent code quality across repos
-   Minimal config override requirements
-   Automated release process reducing manual effort

## Technical Requirements

-   Trunk CLI >= 1.7.1-beta.9
-   Node.js 22.16.0
-   Python 3.10.8
-   Rust toolchain support
-   Go 1.25.6
-   Java 25

## Constraints

-   Must work as Trunk plugin
-   Configs must be exportable
-   No runtime dependencies for consuming projects
-   Backward compatibility with existing projects
-   Configs must be self-contained (no cross-references)

## Release Strategy

-   Automated versioning via semantic-release 25.0.2
-   Conventional commits for version determination
-   CHANGELOG.md auto-generated and committed
-   GitHub releases with CHANGELOG.md asset
-   CI/CD via GitHub Actions (Node 25.3.0, pnpm 10.28.0)
-   No npm publishing (Trunk plugin only)

## Future Considerations

-   Additional language support as needed
-   Custom rule presets for different project types
-   Project-specific override patterns
-   CI/CD integration templates
-   Shared commitlint and semantic-release configs
-   Performance optimization for large codebases
