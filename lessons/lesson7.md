# Lesson 7: エラーバウンダリ

子コンポーネントで例外が発生しても、アプリ全体がクラッシュしないようにする仕組みです。

学習ポイント:
- クラスコンポーネントでのみ作成できる（`getDerivedStateFromError` / `componentDidCatch`）
- バウンダリはツリーの局所に配置する（粒度の設計）

## スニペットA: 定義
```jsx
class ErrorBoundary extends React.Component {
  constructor(props){ super(props); this.state={ hasError:false }; }
  static getDerivedStateFromError(){ return { hasError:true }; }
  componentDidCatch(err, info){ console.error(err, info); }
  render(){ return this.state.hasError ? <h2>何か問題が発生しました。</h2> : this.props.children; }
}
```

## スニペットB: 使用
```jsx
<ErrorBoundary>
  <Danger />
</ErrorBoundary>
```

やってみよう:
1. 例外発生後に「リトライ」ボタンで状態をリセット
2. バウンダリを入れる位置を `Danger` の親/祖先で変えて挙動を比較


