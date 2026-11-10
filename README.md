# docs-chat

文書を検索して、参照元つきで答える RAG チャットボット。TypeScript で実装する。

## 構成

- **検索**: BM25 によるキーワード検索と、pgvector によるベクトル検索を組み合わせたハイブリッド検索
- **回答の生成**: 検索した文書を LLM に渡し、参照元を示して回答する
- **配信**: SSE で回答を少しずつブラウザに表示する

検索・プロンプトの組み立て・配信は、まずフレームワークを使わずに実装する。LangChain や Vercel AI SDK などへの置き換えは、自前の実装と比べたうえで判断する。

LLM や embedding の提供元、DB の構成は、それぞれのフェーズで決める。

開発の順序は[ロードマップ](docs/roadmap.md)、変更とその効果は[改善ログ](docs/improvement-log.md)に記録する。

## 開発

```sh
pnpm install
pnpm test        # Vitest
pnpm lint        # oxlint
pnpm format      # oxfmt
pnpm typecheck   # tsc
```

CI（GitHub Actions）で lint・format・typecheck・test を実行する。
