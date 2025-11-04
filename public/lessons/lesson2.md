# Lesson 2: フォーム入力と制御コンポーネント

このレッスンでは input の値を state で管理し、入力値を表示・送信する基本を学びます。

学習ポイント:
- 制御コンポーネント（value/onChange）
- フォーム送信と e.preventDefault()
- 提出結果の表示

## スニペットA: 入力値のバインド
```jsx
const [email, setEmail] = React.useState("");
<input value={email} onChange={e => setEmail(e.target.value)} />
```
- `value={email}`: UI を状態で駆動（単方向データフロー）
- `onChange`: 文字入力のたびに状態を更新

## スニペットB: 送信イベント
```jsx
const onSubmit = (e) => {
  e.preventDefault();
  // 検証や送信処理
};
<form onSubmit={onSubmit}>...</form>
```
- `e.preventDefault()`: デフォルトのページ遷移を抑止
- 送信時のみ検証/API 呼び出しをまとめられる

## 全体像（最小）
```jsx
function LoginForm() {
  const [email, setEmail] = React.useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    alert(email);
  };
  return (
    <form onSubmit={onSubmit}>
      <input value={email} onChange={e => setEmail(e.target.value)} />
      <button>Login</button>
    </form>
  );
}
```

注意点:
- uncontrolled（`defaultValue`）と混在させない。基本はどちらかに統一
- バリデーションは「入力中に即時」か「送信時」のどちらかに方針決め

やってみよう:
1. 入力検証（メール形式の簡単チェック）
2. 送信後にフォームをリセット
3. パスワードの表示/非表示切替ボタンを追加
