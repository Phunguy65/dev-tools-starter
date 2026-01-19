# Code Standards

## Universal Standards

### Formatting

-   **Line width**: 80 characters
-   **Indentation**: 4 spaces (no tabs)
-   **Line endings**: Unix (LF)
-   **Trailing whitespace**: Not allowed
-   **Final newline**: Required

## TypeScript/JavaScript (Biome)

### Style Rules

-   **Quotes**: Single quotes for strings
-   **JSX quotes**: Single quotes
-   **Semicolons**: Required (ASI not relied upon)
-   **Trailing commas**: Always (including function parameters)
-   **Arrow parentheses**: Always use parentheses
-   **Bracket spacing**: Enabled `{ foo }` not `{foo}`
-   **Bracket same line**: False (closing bracket on new line)

### Linting Rules

-   **Import extensions**: Required (`.js`, `.ts` extensions mandatory)
-   **Unused variables**: Error
-   **Unused imports**: Error
-   **Recommended rules**: Enabled (Biome defaults)

### File Exclusions

-   Test files: `**/*.test.js` (excluded by default)
-   Special test: `**/special.test.js` (explicitly included)
-   Build outputs: `dist/`, `build/`, `.next/`
-   Dependencies: `node_modules/`

## Python (Ruff + Pyright)

### Ruff Linting Rules

Selected rule categories:

-   **E**: pycodestyle errors
-   **F**: Pyflakes
-   **W**: pycodestyle warnings
-   **I**: isort (import sorting)
-   **UP**: pyupgrade (modern Python syntax)
-   **B**: flake8-bugbear
-   **SIM**: flake8-simplify
-   **S**: flake8-bandit (security)
-   **TCH**: flake8-type-checking
-   **PTH**: flake8-use-pathlib
-   **RUF**: Ruff-specific rules
-   **N**: pep8-naming

### Per-File Ignores

-   `__init__.py`: F401 (unused imports allowed)
-   `tests/**`: S101 (assert statements allowed)

### Formatting

-   **Quote style**: Single quotes
-   **Line length**: 80 characters
-   **Magic trailing comma**: Respected

### Pyright Type Checking

-   **Mode**: Strict
-   **Python version**: 3.10
-   **Platform**: Linux
-   **Relaxed checks**:
    -   Missing type stubs: Not reported
    -   Unknown member types: Not reported
    -   Unknown argument types: Not reported
    -   Unknown variable types: Not reported

## Rust (Clippy + rustfmt)

### Clippy Thresholds

-   **Max function arguments**: 5
-   **Type complexity threshold**: 250
-   **Single-char binding names**: Max 4

### rustfmt Style

-   **Edition**: 2024
-   **Max width**: 80 characters
-   **Tab spaces**: 4
-   **Hard tabs**: Disabled
-   **Trailing comma**: Always
-   **Comment wrapping**: Enabled
-   **Doc comment formatting**: Enabled

### Brace Styles

-   **Control flow**: Always next line
-   **Struct/enum**: Same line where clause
-   **Match arms**: Block style with indentation

### Code Layout

-   **Function single line**: Disabled (always multi-line)
-   **Struct literal single line**: Disabled
-   **Blank lines**: 1 (both lower and upper bound)
-   **Nested parentheses**: Removed when possible
-   **Empty items**: Single line allowed

### Width Constraints

-   **Chain width**: 80
-   **Array width**: 80
-   **Function call width**: 80
-   **Attribute-like width**: 80

## Markdown (markdownlint-cli2)

### Style Rules

-   **Line length**: 80 characters (code blocks included)
-   **List style**: Dash (`-`) for unordered lists
-   **List indentation**: 4 spaces
-   **Duplicate headings**: Allowed if not siblings
-   **Table column style**: Compact with aligned delimiters

### Allowed HTML

-   **Inline elements**: `<div>`, `<span>`, `<br>`, `<kbd>`
-   **Table elements**: `<th>`, `<td>`

### List Formatting

-   **Multi-line unordered**: 3 spaces after marker
-   **Single-line ordered**: 3 spaces after marker

## Multi-Language (Prettier)

### Supported Languages

-   Java (prettier-plugin-java)
-   XML (@prettier/plugin-xml)
-   SQL (prettier-plugin-sql)
-   Prisma (prettier-plugin-prisma)
-   Shell (prettier-plugin-sh)
-   Tailwind CSS (prettier-plugin-tailwindcss)
-   package.json (prettier-plugin-packagejson)

### Style Rules

-   **Line width**: 80 characters
-   **Indentation**: 4 spaces
-   **Single quotes**: Enabled
-   **Trailing commas**: ES5 compatible
-   **Brace style**: K&R style for Java

## Go

### golangci-lint

-   Configuration in `.golang-ci.json`
-   Multiple linters enabled
-   Consistent with Go best practices

## Lua (StyLua)

### Style Rules

-   **Column width**: 80 characters
-   **Indent type**: Spaces (4)
-   **Quote style**: AutoPreferSingle
-   **Line endings**: Unix

## Shell Scripts (Shellcheck + shfmt)

### Shellcheck

-   Detects common shell script errors
-   Warns about deprecated syntax
-   Suggests best practices

### shfmt

-   **Indent**: 4 spaces
-   **Binary ops**: Next line
-   **Switch cases**: Indented
-   **Redirect operators**: Followed by space

## Dart

### Style Rules

-   Follows official Dart style guide
-   Flutter-compatible linting rules
-   Consistent with analysis_options.yaml

## SQL

### Formatting (.sql-formatter.json)

-   Consistent keyword casing
-   Indentation for nested queries
-   Line breaks for readability

### Linting (.sqlfluff)

-   Dialect-specific rules
-   Syntax validation
-   Best practices enforcement

## TOML (Taplo)

### Style Rules

-   **Indentation**: 4 spaces
-   **Array formatting**: Compact
-   **Inline table**: Allowed when short

## C/C++ (clang-format)

### Style Rules

-   **Base style**: LLVM
-   **Indentation**: 4 spaces
-   **Column limit**: 80 characters
-   **Pointer alignment**: Left

## YAML (yamllint)

### Style Rules

-   **Indentation**: 2 spaces
-   **Line length**: 80 characters
-   **Document start**: Required
-   **Trailing spaces**: Not allowed

## Security & Quality

### Gitleaks

-   Scans for hardcoded secrets
-   Detects API keys, tokens, passwords
-   Prevents credential leaks

### CSpell

-   **Languages**: English, Vietnamese
-   **Dictionaries**: Code-specific terms
-   **Ignores**: node_modules, dist, build

### dotenv-linter

-   Validates .env files
-   Checks for duplicates
-   Enforces naming conventions

## Git Standards

### Commit Messages

-   Use conventional commit format (feat:, fix:, docs:, etc.)
-   Focus on "why" not "what"
-   Keep first line under 72 characters
-   Include co-author attribution for AI assistance

### Branch Strategy

-   Main branch: `main`
-   Feature branches: descriptive names
-   Pre-commit: Auto-formatting enabled (trunk-fmt-pre-commit)
-   Pre-push: Linting checks enforced (trunk-check-pre-push)

## Enforcement

All standards enforced via Trunk:

-   **Pre-commit hook**: Auto-formats staged files
-   **Pre-push hook**: Runs linting checks
-   **CI integration**: Via GitHub Actions
-   **Manual checks**: `trunk check` and `trunk fmt`

## Override Policy

Projects consuming this plugin should:

-   Avoid overriding configs when possible
-   Document any necessary overrides
-   Propose changes upstream if rules don't fit
-   Use `.trunk/trunk.yaml` for project-specific adjustments
