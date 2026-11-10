import { execFileSync } from "node:child_process";
import { cpSync, mkdirSync, mkdtempSync, readdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";

// サバイバル TypeScript（https://typescriptbook.jp）。評価の結果を比べられるよう、取得するコミットを固定する
const REPOSITORY = "https://github.com/yytypescript/book.git";
const COMMIT = "c17c4cc93f5c237fd82177186e5fb3aaa6282853";
const SOURCE_DIR = "docs";
const OUTPUT_DIR = "data/docs";

// 本の内容ではないもの（トップページ・ライセンス・更新履歴・執筆者向けのガイド）は検索対象から外す
const EXCLUDED_FILES = ["README.md", "license.md"];
const EXCLUDED_DIRS = ["releasenotes/", "writing/"];

/** docs/ からの相対パス（区切りは /）が検索対象か */
export function isSearchTarget(path: string): boolean {
  return (
    path.endsWith(".md") &&
    !EXCLUDED_FILES.includes(path) &&
    !EXCLUDED_DIRS.some((dir) => path.startsWith(dir))
  );
}

function fetchDocs(): void {
  const workDir = mkdtempSync(join(tmpdir(), "docs-chat-"));
  const git = (...args: string[]) => execFileSync("git", args, { cwd: workDir, stdio: "inherit" });
  try {
    git("init", "--quiet");
    git("remote", "add", "origin", REPOSITORY);
    git("sparse-checkout", "set", SOURCE_DIR);
    git("fetch", "--quiet", "--depth", "1", "--filter=blob:none", "origin", COMMIT);
    git("checkout", "--quiet", "FETCH_HEAD");

    const sourceDir = join(workDir, SOURCE_DIR);
    const files = readdirSync(sourceDir, { recursive: true, encoding: "utf8" }).filter(
      isSearchTarget,
    );

    rmSync(OUTPUT_DIR, { recursive: true, force: true });
    for (const file of files) {
      const destination = join(OUTPUT_DIR, file);
      mkdirSync(dirname(destination), { recursive: true });
      cpSync(join(sourceDir, file), destination);
    }
    console.log(`${files.length} ファイルを ${OUTPUT_DIR} に取得した（${COMMIT.slice(0, 7)}）`);
  } finally {
    rmSync(workDir, { recursive: true, force: true });
  }
}

if (import.meta.main) {
  fetchDocs();
}
