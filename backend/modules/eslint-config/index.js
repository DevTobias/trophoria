module.exports = {
  env: { browser: true, es2020: true, node: true },
  ignorePatterns: ["*.mjs", "*.cjs", "**/*.js", "**/out/*"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2020,
    project: "./tsconfig.json",
  },
  extends: [
    "airbnb-base",
    "airbnb-typescript/base",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier",
  ],
  plugins: ["@typescript-eslint", "import"],
  rules: {
    // Most of the files will probably get extended in the future, which
    // could result into multiple refactoring. Named exports can also help
    // with tree shaking. Thats why they are preferred in general.
    "import/prefer-default-export": "off",

    // Sometimes it is just not possible for a value to be null, based on the code before.
    // Typescript doesn't have the ability to detect these cases. Then it's ok to use a no
    // null assertion.
    "@typescript-eslint/no-non-null-assertion": "off",

    // This rule is enabled to prevent typos. It shows an error because it's likely possible,
    // that you didn't want to return an assignment, instead wanted to use the comparison operator.
    // These issues should get caught by typings. Also sometimes it allows to write shorter and more
    // readable code.
    "no-return-assign": "off",

    // Imports should be grouped with spacing and should be alphabetized
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "object",
          "type",
        ],
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
        "newlines-between": "always",
      },
    ],
  },
};
