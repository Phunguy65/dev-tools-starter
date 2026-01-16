# Code Standards

## Universal Standards

### Formatting
- **Line width**: 80 characters
- **Indentation**: 4 spaces (no tabs)
- **Line endings**: Unix (LF)
- **Trailing whitespace**: Not allowed
- **Final newline**: Required

## TypeScript/JavaScript (Biome)

### Style Rules
- **Quotes**: Single quotes for strings
- **JSX quotes**: Single quotes
- **Semicolons**: Required (ASI not relied upon)
- **Trailing commas**: Always (including function parameters)
- **Arrow parentheses**: Always use parentheses
- **Bracket spacing**: Enabled `{ foo }` not `{foo}`
- **Bracket same line**: False (closing bracket on new line)

### Linting Rules
- **Import extensions**: Required (`.js`, `.ts` extensions mandatory)
- **Unused variables**: Error
- **Unused imports**: Error
- **Recommended rules**: Enabled (Biome defaults)

### File Exclusions
- Test files: `**/*.test.js` (excluded by default)
- Special test: `**/special.test.js` (explicitly included)
- Build outputs: `dist/`, `build/`, `.next/`
- Dependencies: `node_modules/`

## Python (Ruff + Pyright)

### Ruff Linting Rules
Selected rule categories:
- **E**: pycodestyle errors
- **F**: Pyflakes
- **W**: pycodestyle warnings
- **I**: isort (import sorting)
- **UP**: pyupgrade (modern Python syntax)
- **B**: flake8-bugbear
- **SIM**: flake8-simplify
- **S**: flake8-bandit (security)
- **TCH**: flake8-type-checking
- **PTH**: flake8-use-pathlib
- **RUF**: Ruff-specific rules
- **N**: pep8-naming

### Per-File Ignores
- `__init__.py`: F401 (unused imports allowed)
- `tests/**`: S101 (assert statements allowed)

### Formatting
- **Quote style**: Single quotes
- **Line length**: 80 characters
- **Magic trailing comma**: Respected

### Pyright Type Checking
- **Mode**: Strict
- **Python version**: 3.10
- **Platform**: Linux
- **Relaxed checks**:
  - Missing type stubs: Not reported
  - Unknown member types: Not reported
  - Unknown argument types: Not reported
  - Unknown variable types: Not reported

## Rust (Clippy + rustfmt)

### Clippy Thresholds
- **Max function arguments**: 5
- **Type complexity threshold**: 250
- **Single-char binding names**: Max 4

### rustfmt Style
- **Edition**: 2024
- **Max width**: 80 characters
- **Tab spaces**: 4
- **Hard tabs**: Disabled
- **Trailing comma**: Always
- **Comment wrapping**: Enabled
- **Doc comment formatting**: Enabled

### Brace Styles
- **Control flow**: Always next line
- **Struct/enum**: Same line where clause
- **Match arms**: Block style with indentation

### Code Layout
- **Function single line**: Disabled (always multi-line)
- **Struct literal single line**: Disabled
- **Blank lines**: 1 (both lower and upper bound)
- **Nested parentheses**: Removed when possible
- **Empty items**: Single line allowed

### Width Constraints
- **Chain width**: 80
- **Array width**: 80
- **Function call width**: 80
- **Attribute-like width**: 80

## Markdown (markdownlint-cli2)

### Style Rules
- **Line length**: 80 characters (code blocks included)
- **List style**: Dash (`-`) for unordered lists
- **List indentation**: 4 spaces
- **Duplicate headings**: Allowed if not siblings
- **Table column style**: Compact with aligned delimiters

### Allowed HTML
- **Inline elements**: `<div>`, `<span>`, `<br>`, `<kbd>`
- **Table elements**: `<th>`, `<td>`

### List Formatting
- **Multi-line unordered**: 3 spaces after marker
- **Single-line ordered**: 3 spaces after marker

## Git Standards

### Commit Messages
- Use conventional commit format when applicable
- Focus on "why" not "what"
- Keep first line under 72 characters
- Include co-author attribution for AI assistance

### Branch Strategy
- Main branch: `main`
- Feature branches: descriptive names
- Pre-commit: Auto-formatting enabled
- Pre-push: Linting checks enforced

## Enforcement

All standards enforced via Trunk:
- **Pre-commit hook**: Auto-formats staged files
- **Pre-push hook**: Runs linting checks
- **CI integration**: Via trunk-analytics-cli
- **Manual checks**: `trunk check` and `trunk fmt`

## Override Policy

Projects consuming this plugin should:
- Avoid overriding configs when possible
- Document any necessary overrides
- Propose changes upstream if rules don't fit
- Use `.trunk/trunk.yaml` for project-specific adjustments
