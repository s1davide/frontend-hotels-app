module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
    ],
    overrides: [
        {
            env: {
                node: true,
            },
            files: [".eslintrc.{js,cjs}"],
            parserOptions: {
                sourceType: "script",
            },
        },
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
            jsx: true,
            tsx:true
        }
    },
    plugins: ["@typescript-eslint", "react"],
    rules: {
        indent: ["error", 4],
        "linebreak-style": ["error", "unix"],
        quotes: ["error", "double"],
        semi: ["error", "always"],
        "no-use-before-define": "off",
        "no-unused-vars": "off",
        "@typescript-eslint/no-use-before-define": ["error"],
        "@typescript-eslint/no-unused-vars": [
            "error",
            {
                vars: "all",
                varsIgnorePattern: "^_",
                args: "after-used",
                argsIgnorePattern: "^_",
            },
        ],
        "react/jsx-filename-extension": ["warn", { extensions: [".tsx"] }],
        "sort-imports": [
            "error",
            {
                ignoreDeclarationSort: true,
            },
        ],
    },
    settings: {
        react: {
            version: "detect",
        },
    },
}
