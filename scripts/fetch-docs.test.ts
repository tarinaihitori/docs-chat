import { describe, expect, test } from "vitest";
import { isSearchTarget } from "./fetch-docs";

describe("isSearchTarget", () => {
  test.each(["overview/features.md", "reference/generics/README.md", "about.md"])(
    "本の内容のマークダウン %s は対象にする",
    (path) => {
      expect(isSearchTarget(path)).toBe(true);
    },
  );

  test.each(["README.md", "license.md", "releasenotes/2023.md", "writing/pdr/README.md"])(
    "本の内容ではない %s は対象にしない",
    (path) => {
      expect(isSearchTarget(path)).toBe(false);
    },
  );

  test("マークダウン以外は対象にしない", () => {
    expect(isSearchTarget("overview/img.png")).toBe(false);
  });
});
