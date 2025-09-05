import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";


export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,jsx}"], plugins: { js }, extends: ["js/recommended"] },
  { files: ["client/**/*.{js,mjs,cjs,jsx}"], languageOptions: { globals: globals.browser } },
  { files: ["backend/**/*.{js,mjs,cjs,jsx}", "webpack*.mjs"], languageOptions: { globals: globals.node } },
  pluginReact.configs.flat.recommended,
]);
