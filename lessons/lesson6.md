# Lesson 6: ルーティング入門（React Router）

このレッスンではページ遷移とURLパラメータを扱います。

学習ポイント:
- `BrowserRouter` / `Routes` / `Route`
- `Link` での遷移
- `useParams` によるパラメータ取得

## スニペットA: 基本構成
```jsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/users/:id" element={<User />} />
  </Routes>
</BrowserRouter>
```

## スニペットB: パラメータ
```jsx
function User(){
  const { id } = useParams();
  return <div>ユーザーID: {id}</div>;
}
```

やってみよう:
1. `/posts/:postId` を追加して詳細ページを作る
2. 一覧から詳細へのリンクを表示
3. 不正URLで404相当の画面を表示


