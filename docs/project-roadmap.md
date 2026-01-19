# Project Roadmap

## Current Status

Project is in active development with core functionality complete. Plugin
supports 15+ languages and provides automated releases via semantic-release
25.0.2.

## Completed Milestones

### Phase 1: Core Infrastructure (Completed)

-   ✅ Trunk plugin manifest setup
-   ✅ Basic linter configurations (Biome, Ruff, Pyright, Clippy, rustfmt)
-   ✅ Git hooks integration (pre-commit, pre-push)
-   ✅ Configuration export mechanism

### Phase 2: Language Expansion (Completed)

-   ✅ Markdown linting (markdownlint-cli2 0.20.0)
-   ✅ Security scanning (Gitleaks 8.30.0)
-   ✅ Spell checking (CSpell 9.6.0)
-   ✅ Java/XML/SQL formatting (Prettier 3.8.0 with plugins)
-   ✅ Dart support (Dart 3.10.7)
-   ✅ Lua formatting (StyLua 2.3.1)
-   ✅ Shell script linting (Shellcheck 0.11.0, shfmt 3.12.0)
-   ✅ SQL formatting and linting
-   ✅ TOML formatting (Taplo)
-   ✅ C/C++ formatting (clang-format)
-   ✅ YAML linting (yamllint)
-   ✅ .env file linting (dotenv-linter 4.0.0)
-   ✅ Whitespace checking (git-diff-check)

### Phase 3: Automation & Release (Completed)

-   ✅ Semantic-release 25.0.2 integration
-   ✅ Automated versioning via conventional commits
-   ✅ CHANGELOG.md generation
-   ✅ GitHub Actions workflow (Node 25.3.0, pnpm 10.28.0)
-   ✅ Shared semantic-release config for reuse
-   ✅ GitHub releases with CHANGELOG.md asset

## Current Phase

### Phase 4: Documentation & Refinement (In Progress)

-   ✅ Comprehensive documentation
-   ✅ Project overview and PDR
-   ✅ Codebase summary
-   ✅ Code standards documentation
-   ✅ System architecture documentation
-   ✅ Deployment guide
-   ✅ Design guidelines
-   🔄 Usage examples and tutorials
-   🔄 Troubleshooting guide expansion

## Upcoming Milestones

### Phase 5: Enhanced Configuration Management (Q1 2026)

-   📋 Configuration presets for different project types
    -   Web application preset
    -   Backend service preset
    -   CLI tool preset
    -   Library preset
-   📋 Configuration validation tooling
-   📋 Config migration scripts for version updates
-   📋 Interactive config generator

### Phase 6: Developer Experience (Q2 2026)

-   📋 VS Code extension for config management
-   📋 CLI tool for plugin management
-   📋 Configuration diff viewer
-   📋 Performance profiling for linters
-   📋 Caching optimization
-   📋 Incremental linting improvements

### Phase 7: Team Collaboration (Q2-Q3 2026)

-   📋 Shared commitlint config distribution
-   📋 Team-specific override patterns
-   📋 Configuration inheritance system
-   📋 Multi-repository sync tooling
-   📋 Analytics dashboard for code quality metrics

### Phase 8: Advanced Features (Q3-Q4 2026)

-   📋 Custom rule authoring guide
-   📋 Plugin extension system
-   📋 Language-specific rule templates
-   📋 Auto-fix capabilities expansion
-   📋 AI-powered code review suggestions
-   📋 Integration with popular CI/CD platforms

## Future Considerations

### Additional Language Support

-   Go (golangci-lint full integration)
-   Swift (SwiftLint)
-   Kotlin (ktlint)
-   Ruby (RuboCop)
-   PHP (PHP_CodeSniffer)
-   Scala (Scalafmt)

### Tooling Enhancements

-   Pre-commit hook customization
-   Parallel linting execution
-   Distributed caching
-   Remote config fetching
-   Config hot-reloading

### Integration Improvements

-   IDE plugins (IntelliJ, VS Code, Vim)
-   GitHub App for automated PR reviews
-   Slack/Discord notifications
-   Jira integration for issue tracking
-   Metrics and reporting dashboard

### Performance Optimization

-   Lazy loading of configs
-   Incremental analysis
-   Parallel execution improvements
-   Memory usage optimization
-   Cache warming strategies

## Version History

### v1.x (Current)

-   Core linting and formatting for 10+ languages
-   Automated releases via semantic-release
-   Git hooks integration
-   Comprehensive documentation

### v2.x (Planned - Q2 2026)

-   Configuration presets
-   Enhanced developer tooling
-   Performance improvements
-   Extended language support

### v3.x (Planned - Q4 2026)

-   Advanced customization
-   Team collaboration features
-   Analytics and reporting
-   AI-powered suggestions

## Contributing to Roadmap

Team members can propose new features or changes to the roadmap by:

1. Opening a GitHub issue with the `roadmap` label
2. Discussing in team meetings
3. Submitting a PR with roadmap updates
4. Voting on proposed features

## Success Metrics

-   Adoption rate across internal projects
-   Reduction in config-related issues
-   Developer satisfaction scores
-   Time saved on config maintenance
-   Code quality improvements
-   Consistency across repositories

## Dependencies

-   Trunk CLI updates and compatibility
-   Linter version updates
-   Runtime version requirements
-   GitHub Actions availability
-   Team feedback and requirements
