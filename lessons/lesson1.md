# Lesson 1: useState でカウンターを作る

このレッスンでは `useState` とクリックイベントで基本のカウンターを実装します。

学習ポイント:
- useState の宣言と更新（関数アップデート）
- クリックイベントのハンドリング
- state 変更による再レンダリング

## スニペットA: state の宣言
```jsx
const [count, setCount] = React.useState(0);
```
- `count`: 現在の状態値（読み取り専用）
- `setCount`: 状態を更新する関数
- 初期値 `0` は初回レンダリング時に一度だけ評価

## スニペットB: イベントと更新
```jsx
<button onClick={() => setCount(c => c + 1)}>
  Count: {count}
</button>
```
- `onClick`: クリック時のコールバックを渡す
- `setCount(c => c + 1)`: 関数アップデート。連続クリックや同一ティック内の複数更新でも正しく積み上がる
- `{count}`: JSX 内で現在値を埋め込む

## 全体像（最小）
```jsx
function Counter() {
  const [count, setCount] = React.useState(0);
  return (
    <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>
  );
}
```

注意点:
- 直接代入はダメ: `count++` や `count = count + 1` は UI に反映されない
- 更新に前回値が必要な時は「関数アップデート」を使う

やってみよう:
1. 初期値を 10 に変更
2. +1 と -1 の 2 ボタンに分割
3. 10 の倍数で色を変更（`count % 10 === 0`）
