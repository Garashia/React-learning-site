## 入力しながら学べる React 学習サイト 構想（Markdown）

目的: ブラウザ上でコードを実際に「入力 → その場で実行 → フィードバック」を繰り返しながら、React の基礎〜実務で役立つ設計まで学べるサイトを作る。

---

### 1. ターゲット/学習到達目標
- 対象: C++/C#/Python の経験者、Web/JS は基礎～中級
- 1～2 週間で到達したい目標:
  - JSX/Props/State/useEffect の実装ができる
  - リスト/フォーム/コンテキスト/カスタムフックが使える
  - ルーティング/データ取得/エラーバウンダリ/基本の最適化が分かる
  - 小規模アプリを要件から自走実装できる

---

### 2. 学習体験デザイン（UX）
- コア体験: 「テキスト → 演習（エディタ）→ 実行/テスト → 可視化フィードバック → 解説」
- 進行方式: 線形カリキュラム＋選択式課題（分岐）
- フィードバック: 
  - 実行結果プレビュー（DOM/コンソール）
  - 自動採点（単体テスト/スナップショット/DOM照合）
  - ヒント段階開示（1/2/3段階）
- アフォーダンス: キーボード操作最適化（⌘/Ctrl+Enter 実行、⌘/Ctrl+S 保存）

---

### 3. 情報設計（IA）
- トップ（学習概要/進捗）
- モジュール（トラック）
  - 0. セットアップとJS/TS最短復習
  - 1. JSX/レンダリング/イベント
  - 2. 状態（useState）とフォーム
  - 3. 副作用とデータ取得（useEffect/fetch）
  - 4. リスト/キー/条件分岐
  - 5. コンテキスト/カスタムフック
  - 6. ルーティング
  - 7. エラーバウンダリ/エラー設計
  - 8. 最適化（memo/useMemo/useCallback/分割）
  - 9. 状態管理（Redux Toolkit or Zustand 概論）
  - 10. 仕上げ課題（小規模アプリ）
- 各レッスン: 解説(MDX) + 演習(Sandpack/Monaco) + テスト + 解説/解答

---

### 4. 技術選定
- ランタイム/エディタ:
  - Sandpack（CodeSandbox） or react-live でブラウザ内バンドル/実行
  - Monaco Editor で本格エディタ（型補完は TS 併用時）
- フレームワーク: 既存 `my-base` は CRA だが、将来的には Vite + React を推奨（高速/簡素）
- ルーティング: React Router
- コンテンツ: MDX（レッスン本文）＋ JSON/YAML（課題定義）
- 採点: Testing Library + 事前ビルドのテスト、もしくは DOM クエリ検証ロジック
- 状態: 軽量なら Context、拡張で Zustand/Redux Toolkit
- 分析: PostHog/Amplitude（イベント: 実行回数、合格率、滞在時間）

---

### 5. 画面/コンポーネント設計
- Layout: `Header`（進捗/テーマ切替） / `Sidebar`（目次） / `Main`（レッスン）
- LessonPage:
  - `DocPane`（MDX解説）
  - `EditorPane`（Monaco/Sandpack）
  - `PreviewPane`（実行結果）
  - `TestPane`（採点ログ/ヒント/合否）
- 共通 UI: `RunButton`, `HintModal`, `DiffViewer`（期待値 vs 実行結果）

---

### 6. データモデル（概略）
```ts
type Lesson = {
  id: string;
  title: string;
  mdxPath: string;      // 解説本文
  starterFiles: FileBlob[]; // 初期コード
  tests: TestSpec[];    // 自動採点仕様
  goals: string[];      // 学習目標
  hints?: string[];     // ヒント
  tags?: string[];
};

type FileBlob = { path: string; content: string; hidden?: boolean };

type TestSpec =
  | { type: 'domContains'; selector: string; text?: string }
  | { type: 'consoleIncludes'; pattern: string }
  | { type: 'unit'; code: string }; // 事前埋め込みの単体テストコード
```

---

### 7. 採点ストラテジ（実行→検証）
1) `Run` トリガーでコードをバンドルし iframe へロード
2) Preview 内部で DOM スナップショット/console ログを収集
3) `TestSpec` に従って評価し、合否/差分を表示
4) 失敗時はヒントを段階表示（1/2/3）

DOM 検証の例（疑似）:
```js
// preview 側で expose した API から情報取得
const root = document.querySelector('#root');
expect(root.querySelector('button').textContent).toMatch(/Count: \d+/);
```

---

### 8. コンテンツ制作フロー（MDX + スタータ + テスト）
1) `content/lessons/<id>/index.mdx`（本文）
2) `content/lessons/<id>/starter/`（編集対象ファイル群）
3) `content/lessons/<id>/tests.json`（TestSpec 群）
4) 画像/図版は `public/assets/lessons/<id>/` 配下

ビルド時に `lessons.json`（サイトマップ）を生成し、ルータへ注入。

---

### 9. 進捗管理/ゲーミフィケーション
- レッスン完了フラグ/スタンプ/連続日数
- チャレンジ課題（時間制限/コードサイズ制限）
- シェア用リンク（進捗/成果の共有）

---

### 10. アクセシビリティ/国際化
- キーボード操作+スクリーンリーダー配慮（`aria-*`）
- カラーモード/コントラスト
- i18n: 日本語/英語を JSON 辞書で切替

---

### 11. セキュリティ/サンドボックス
- iframe sandbox 属性強化（`allow-scripts` など最小限）
- postMessage 経由の限定的 IPC
- 依存パッケージのバージョン固定（lockfile）

---

### 12. 分析と改善ループ
- 収集: 実行回数、合格率、滞留時間、ヒント使用回数
- 可視化: 演習ごとの難易度補正/離脱点ヒートマップ
- 改善: テキスト/テスト/ヒントのA/B テスト

---

### 13. デプロイ/運用
- ビルド: `npm run build`（静的）
- 配信: Netlify/Vercel/GitHub Pages/Cloudflare Pages
- 監視: エラー収集（Sentry）

---

### 14. MVP スコープ（2～3 週間）
- ルータ/レイアウト/1 モジュール 3 レッスン
- Monaco + Sandpack 連携、実行/プレビュー/簡易採点（DOM/テキスト）
- MDX パイプライン/サイトマップ生成
- 進捗保存（localStorage）

---

### 15. 実装タスク（抜粋）
- ルーティング: `routes.tsx` 作成（`/lesson/:id`）
- レッスンローダ: `loadLessons()`（MDX/Starter/Tests を束ねて取得）
- Editor/Preview: Monaco/Sandpack ラッパを実装
- EditorPane（複数ファイル、タブ切替、差分表示）
- PreviewPane（iframe、ログキャプチャ）
- TestRunner: `runTests(previewApi, specs)`
- LessonPage: Doc/Editor/Preview/Test の 4 ペイン構成
- 進捗保存: `useProgress()`（完了・ヒント回数・失敗回数）
- UI: テーマ切替/ショートカット/レスポンシブ

---

### 16. 参考ライブラリ候補
- `@codesandbox/sandpack-react`（ブラウザ内実行）
- `monaco-editor`, `@monaco-editor/react`
- `mdx-bundler` or `@mdx-js/react`
- `react-router-dom`
- `@testing-library/dom`, `@testing-library/react`
- `zustand` or `@reduxjs/toolkit`

---

### 17. 将来拡張
- TypeScript トラック（型安全/型駆動の演習）
- バックエンド連携（認証/サーバ採点/提出履歴）
- LLM による解答レビュー/ヒント生成

---

### 付録: 最小デモ構成（疑似）
```jsx
// <LessonPage>
<Split>
  <DocPane mdx={lesson.mdx} />
  <EditorPane files={lesson.starterFiles} onChange={setFiles} />
  <PreviewPane files={files} onReady={setPreviewApi} />
  <TestPane onRun={() => runTests(previewApi, lesson.tests)} result={result} />
</Split>
```

```ts
// runTests のイメージ
export async function runTests(api, specs) {
  const results = [];
  for (const s of specs) {
    if (s.type === 'domContains') {
      const el = await api.querySelector(s.selector);
      const ok = el && (!s.text || el.textContent.includes(s.text));
      results.push({ spec: s, ok });
    }
    // ... 他 spec
  }
  return results;
}
```





