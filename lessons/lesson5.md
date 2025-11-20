# Lesson 5: コンテキストとカスタムフック

このレッスンでは Context での状態共有と、カスタムフックでロジックを再利用する方法を学びます。

学習ポイント:
- `React.createContext` / `useContext`
- カスタムフック（`useLocalStorage`）の作り方
- テーマによるスタイル切替

## スニペットA: コンテキストの作成/提供
```jsx
const ThemeContext = React.createContext('light');

<ThemeContext.Provider value={theme}>
  {children}
</ThemeContext.Provider>
```

## スニペットB: 取得と利用
```jsx
const theme = React.useContext(ThemeContext);
```

## スニペットC: カスタムフック
```jsx
function useLocalStorage(key, initialValue){
  const [value, setValue] = React.useState(()=>{
    const raw = localStorage.getItem(key);
    return raw!=null? JSON.parse(raw) : initialValue;
  });
  React.useEffect(()=>{
    localStorage.setItem(key, JSON.stringify(value));
  },[key, value]);
  return [value, setValue];
}
```

やってみよう:
1. テーマを `light/dark/sepia` の3種類に拡張
2. `useLocalStorage` を他の入力にも適用
3. 子コンポーネントからもテーマを参照してスタイルを切替


