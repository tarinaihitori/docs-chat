# データ

## docs/

検索対象の文書。[サバイバル TypeScript](https://typescriptbook.jp)（[yytypescript/book](https://github.com/yytypescript/book) の `docs/`）を、`scripts/fetch-docs.ts` で固定したコミットから取得する。

```sh
pnpm fetch-docs
```

文書そのものはリポジトリに入れない（`.gitignore` で除外している）。トップページ・ライセンス・更新履歴・執筆者向けのガイドは、本の内容ではないので検索対象から外す。

### ライセンス

サバイバル TypeScript の文章は CC BY-SA 4.0、コードブロックのコードは CC BY-SA 4.0 と MIT License のデュアルライセンス（[本書のライセンス](https://typescriptbook.jp/license)）。

本の内容を画面に表示するときは、本書の表示ポリシーに従い、タイトル『サバイバルTypeScript』を示し、該当する typescriptbook.jp のページへ直接リンクする（GitHub のページではなく、短縮 URL やリダイレクトも使わない）。
