# Project Overview & PDR

## Project Name
Dev Tools Starter

## Purpose
Shared linter and formatter configurations for internal team projects using Trunk. Provides standardized code quality tooling across TypeScript/JavaScript, Python, Rust, and Markdown codebases.

## Problem Statement
Teams need consistent code quality standards across multiple languages and projects. Managing individual linter/formatter configurations per project creates maintenance overhead and inconsistent code style.

## Solution
Centralized Trunk plugin that exports pre-configured linting and formatting rules for:
- TypeScript/JavaScript/JSX/JSON (Biome)
- Python (Ruff + Pyright)
- Rust (Clippy + rustfmt)
- Markdown (markdownlint-cli2)

## Target Users
- **Project Maintainers**: Consume configs via Trunk plugin
- **Config Maintainers**: Update and maintain shared configurations

## Key Features
- Single source of truth for code quality configs
- Zero-config integration via Trunk plugin system
- Language-specific best practices enforced
- Consistent formatting rules (80 char line width, Unix line endings)
- Strict type checking and linting rules

## Success Metrics
- Adoption across internal projects
- Reduced config duplication
- Consistent code quality across repos
- Minimal config override requirements

## Technical Requirements
- Trunk CLI >= 1.7.1-beta.9
- Node.js 22.16.0
- Python 3.10.8
- Rust toolchain support

## Constraints
- Must work as Trunk plugin
- Configs must be exportable
- No runtime dependencies for consuming projects
- Backward compatibility with existing projects

## Future Considerations
- Additional language support (Go, Ruby)
- Custom rule presets
- Project-specific override patterns
- CI/CD integration templates
