import type {Config} from 'prettier';

const plugins = [
    'prettier-plugin-tailwindcss',
    'prettier-plugin-prisma',
    'prettier-plugin-sql',
    'prettier-plugin-packagejson',
    'prettier-plugin-sh',
    '@prettier/plugin-xml',
];

const config: Config = {
    printWidth: 80,
    tabWidth: 4,
    useTabs: false,
    semi: true,
    singleQuote: true,
    quoteProps: 'preserve',
    jsxSingleQuote: true,
    trailingComma: 'all',
    bracketSpacing: true,
    bracketSameLine: false,
    arrowParens: 'always',
    proseWrap: 'always',
    htmlWhitespaceSensitivity: 'css',
    endOfLine: 'lf',
    embeddedLanguageFormatting: 'auto',
    plugins: plugins
};
export default config;
