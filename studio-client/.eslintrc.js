/** @type {import('eslint').Linter.Config} */
module.exports = {
  // Specifies the ESLint parser
  parser: "@typescript-eslint/parser",
  // Recommended rules from other configs and plugins
  extends: [
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended",
    //"plugin:prettier/recommended", // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  // TypeScript parser configuration, see https://typescript-eslint.io/architecture/parser#configuration
  parserOptions: {
    ecmaVersion: "latest", // default = "2018"
  },
  // Exclude default output folders, see https://eslint.org/docs/latest/use/configure/ignore
  ignorePatterns: [
    // If a glob pattern starts with /, the pattern is relative to the base directory of the config file.
    "/build/",
    "/dist/",
    "/target/",
  ],
  // Custom CoreMedia rules for JS/TS packages
  rules: {
    "import/no-unresolved": "off",
    "import/order": ["error",
      {
        "newlines-between": "never",
      }
    ],
    "import/newline-after-import": ["error"],
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-this-alias": "off",
    "@typescript-eslint/no-unsafe-declaration-merging": "off",
    "@typescript-eslint/no-namespace": "off",
    "prefer-rest-params": "off",
    "@typescript-eslint/no-unused-vars": ["error", { args: "none" }],
    "@typescript-eslint/no-empty-object-type": ["error", {
      allowInterfaces: "always",
    }],
  },
};
