# Lesson 3: useEffect でデータ取得（fetch/ローディング/エラー）

このレッスンでは外部APIからデータを取得し、ローディング表示とエラー処理を実装します。

学習ポイント:
- useEffect の基本（マウント時の副作用）
- クリーンアップ/フラグでのアンマウント対策
- ローディング・エラーの状態管理

## スニペットA: 状態の用意
```jsx
const [posts, setPosts] = React.useState([]);
const [loading, setLoading] = React.useState(false);
const [error, setError] = React.useState(null);
```
- データ/ローディング/エラーで責務を分離

## スニペットB: useEffect とフェッチ
```jsx
React.useEffect(() => {
  let active = true;
  setLoading(true);
  // 学習環境では外部API(JSONPlaceholder)を利用
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(r => r.ok ? r.json() : Promise.reject(r))
    .then(d => active && setPosts(d))
    .catch(e => active && setError(e))
    .finally(() => active && setLoading(false));
  return () => { active = false; };
}, []);
```
- `[]` でマウント時に一度だけ実行
- `active` フラグでアンマウント後の `setState` を抑止
- `r.ok` 判定でHTTPエラーも `.catch` に流す

## スニペットC: 条件分岐レンダリング
```jsx
if (loading) return <p>Loading...</p>;
if (error) return <p role="alert">Error</p>;
return <ul>{posts.map(p => <li key={p.id}>{p.title}</li>)}</ul>;
```
- ローディング/エラー/成功のUIを明確に分ける

やってみよう:
1. `/posts?_limit=10` に増やす
2. 取得エラーを擬似的に発生させてUIを確認（URLをtypo等）
3. 検索ボックスを追加し、クエリで再取得（依存配列の使い方）

注記:
- 本番/社内では `/api/posts` のような自前エンドポイントに置き換える。
- 外部API利用時はCORSやレート制限に注意。

発展:
- 再試行ボタンを設置して `fetch` を再実行
- `AbortController` を使ってリクエスト中断（ページ遷移/再検索時）
