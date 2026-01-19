# Design Guidelines

## Overview

Design principles and guidelines for maintaining configuration files in Dev
Tools Starter. These guidelines ensure consistency, maintainability, and ease of
use across all supported languages.

## Core Principles

### 1. Consistency First

All configurations should enforce consistent standards across languages:

-   **Line width**: 80 characters (universal)
-   **Indentation**: 4 spaces (no tabs, except YAML: 2 spaces)
-   **Line endings**: Unix (LF)
-   **Quotes**: Single quotes (where applicable)
-   **Trailing commas**: Always (where supported)

### 2. Strictness with Pragmatism

-   Enable strict linting by default
-   Allow practical exceptions (e.g., assert in tests)
-   Reduce noise on unavoidable issues
-   Focus on actionable warnings

### 3. Self-Contained Configs

-   No cross-references between config files
-   Each config file is independent
-   No external dependencies required
-   Configs work out-of-the-box

### 4. Language Best Practices

-   Follow official style guides where available
-   Adopt community standards
-   Prioritize safety and correctness
-   Balance strictness with developer experience

## Configuration Structure

### File Naming

-   Use tool's default config filename
-   Prefix with `.` for hidden files (e.g., `.prettierrc.json`)
-   Use appropriate extension (`.json`, `.toml`, `.yaml`)
-   Match tool's expected naming convention

### File Location

All configs stored in `configs/` directory:

```sh
configs/
├── biome.json
├── ruff.toml
├── pyrightconfig.json
├── .prettierrc.json
└── ...
```

### File Format

-   Use JSON for JavaScript/TypeScript tools
-   Use TOML for Rust tools
-   Use YAML for language-specific tools (Dart, YAML linters)
-   Prefer JSON over JSONC when possible
-   Include schema references where available

## Adding New Languages

### Evaluation Criteria

Before adding support for a new language:

1. **Demand**: Is there team demand for this language?
2. **Tooling**: Are there mature linters/formatters available?
3. **Trunk Support**: Does Trunk support the tool?
4. **Maintenance**: Can we maintain the config long-term?
5. **Standards**: Are there established community standards?

### Implementation Steps

1. **Research**:
    -   Identify best-in-class tools
    -   Review official style guides
    -   Check community standards
    -   Evaluate Trunk compatibility

2. **Configuration**:
    -   Create config file in `configs/`
    -   Apply universal standards (80 chars, 4 spaces, etc.)
    -   Enable strict mode by default
    -   Add practical exceptions

3. **Integration**:
    -   Add to `plugin.yaml` enabled linters
    -   Specify tool version
    -   Add to exported_configs list
    -   Configure runtime if needed

4. **Documentation**:
    -   Update README.md
    -   Add to code-standards.md
    -   Update codebase-summary.md
    -   Document any special considerations

5. **Testing**:
    -   Test with sample files
    -   Verify config is applied
    -   Check for conflicts with other tools
    -   Test in consuming project

## Configuration Design Patterns

### Universal Settings

Apply to all language configs where supported:

```json
{
    "lineWidth": 80,
    "indentWidth": 4,
    "useTabs": false,
    "lineEnding": "lf",
    "quoteStyle": "single",
    "trailingComma": "all"
}
```

### Strict Mode

Enable strict checking by default:

-   Type checking: Strict mode
-   Linting: All recommended rules
-   Security: Enable security checks
-   Performance: Flag inefficient patterns

### Practical Exceptions

Allow exceptions for common patterns:

-   Unused imports in `__init__.py`
-   Assert statements in test files
-   Magic numbers in configuration
-   Long lines in URLs or data

### Ignore Patterns

Standard ignore patterns:

```sh
node_modules/
dist/
build/
.next/
target/
__pycache__/
*.min.js
*.bundle.js
```

## Tool Selection Criteria

### Primary Tool Selection

Choose tools based on:

1. **Maturity**: Stable, well-maintained
2. **Performance**: Fast execution
3. **Accuracy**: Correct analysis
4. **Community**: Active community support
5. **Integration**: Works well with Trunk

### Tool Replacement

Replace tools when:

-   Better alternative emerges
-   Tool becomes unmaintained
-   Performance issues arise
-   Community shifts to new standard

Example: Replaced ESLint with Biome for better performance

## Version Management

### Tool Versions

-   Pin specific versions in `plugin.yaml`
-   Test updates before upgrading
-   Document breaking changes
-   Coordinate updates across tools

### Update Strategy

1. Monitor tool releases
2. Test in isolated environment
3. Update config if needed
4. Update version in plugin.yaml
5. Document changes in commit
6. Release via semantic-release

## Configuration Validation

### Pre-Release Checklist

Before releasing config changes:

-   [ ] Config file is valid (no syntax errors)
-   [ ] Universal standards applied (80 chars, 4 spaces, etc.)
-   [ ] Tested with sample files
-   [ ] No conflicts with other tools
-   [ ] Documentation updated
-   [ ] Commit message follows conventions

### Testing Approach

```bash
# Test locally
pnpm install
pnpm run lint
trunk check --all

# Test in consuming project
# Use local plugin reference
trunk check --all
```

## Error Handling

### Configuration Errors

-   Provide clear error messages
-   Include fix suggestions
-   Link to documentation
-   Avoid cryptic codes

### Linter Conflicts

When linters conflict:

1. Identify conflicting rules
2. Disable less important rule
3. Document decision
4. Consider tool replacement if persistent

## Performance Considerations

### Optimization Strategies

-   Use incremental linting where available
-   Enable caching
-   Parallelize execution
-   Limit file scanning scope

### Resource Limits

-   Keep config files small (<1000 lines)
-   Avoid expensive regex patterns
-   Limit rule complexity
-   Use efficient ignore patterns

## Accessibility

### Developer Experience

-   Clear error messages
-   Actionable suggestions
-   Auto-fix where possible
-   Minimal false positives

### Documentation

-   Explain why rules exist
-   Provide examples
-   Link to resources
-   Document exceptions

## Security

### Secret Scanning

-   Enable Gitleaks for all projects
-   Scan for common secret patterns
-   Block commits with secrets
-   Provide remediation guidance

### Dependency Security

-   Pin tool versions
-   Review security advisories
-   Update promptly for CVEs
-   Document security considerations

## Maintenance

### Regular Reviews

-   Quarterly config review
-   Update tool versions
-   Review rule effectiveness
-   Gather team feedback

### Deprecation Process

When deprecating configs:

1. Announce deprecation
2. Provide migration guide
3. Support for 2 versions
4. Remove in major version

## Best Practices

### Do's

✅ Follow universal standards ✅ Enable strict mode by default ✅ Provide clear
error messages ✅ Test thoroughly before release ✅ Document all decisions ✅
Keep configs simple ✅ Use official tool defaults as baseline

### Don'ts

❌ Don't create overly complex configs ❌ Don't ignore community standards ❌
Don't add unnecessary rules ❌ Don't break backward compatibility without notice
❌ Don't skip testing ❌ Don't leave configs undocumented ❌ Don't use
experimental features in production

## Examples

### Good Configuration

```json
{
    "lineWidth": 80,
    "indentWidth": 4,
    "useTabs": false,
    "quoteStyle": "single",
    "trailingComma": "all",
    "linter": {
        "enabled": true,
        "rules": {
            "recommended": "error"
        }
    }
}
```

### Bad Configuration

```json
{
    "lineWidth": 120,
    "indentWidth": 2,
    "useTabs": true,
    "linter": {
        "rules": {
            "rule1": "warn",
            "rule2": "off",
            "rule3": "error"
        }
    }
}
```

## Contributing Guidelines

### Proposing Changes

1. Open GitHub issue describing change
2. Discuss rationale and impact
3. Create PR with implementation
4. Update documentation
5. Test thoroughly
6. Request review

### Review Criteria

Reviewers should check:

-   Follows design guidelines
-   Maintains consistency
-   Includes tests
-   Updates documentation
-   Uses conventional commits
-   No breaking changes (or documented)

## Resources

### Official Documentation

-   [Trunk Docs](https://docs.trunk.io)
-   [Biome Docs](https://biomejs.dev)
-   [Ruff Docs](https://docs.astral.sh/ruff)
-   [Prettier Docs](https://prettier.io)

### Community Standards

-   [Google Style Guides](https://google.github.io/styleguide/)
-   [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
-   [PEP 8](https://peps.python.org/pep-0008/)
-   [Rust Style Guide](https://doc.rust-lang.org/style-guide/)
