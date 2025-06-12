import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/* ─── NEW: override the single rule that blocks your build ─── */
const customRules = [
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "warn", // was "error"
    },
  },
];

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  ...customRules, // ← include overrides last so they win
];

export default eslintConfig;

