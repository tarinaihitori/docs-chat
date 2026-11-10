import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // 最初の実装を書くまではテストがなくても通す
    passWithNoTests: true,
  },
});
