import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";

export default [
  // Ignore build and deps
  { ignores: ["dist", "node_modules"] },

  // TypeScript recommended rules
  ...tseslint.configs.recommended,

  // Our project rules
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: { ecmaVersion: 2022, sourceType: "module" }
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "error"
    }
  },

  // Disable ESLint rules that conflict with Prettier
  prettier
];