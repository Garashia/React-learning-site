## React.js チートシート（C++/C#/Python 経験者向け・コード多め）

このチートシートは、静的型言語（C++/C#）や動的スクリプト言語（Python）の経験者が、React（主に関数コンポーネント＋Hooks）を最短で実務投入できるようにまとめています。TypeScriptの補足も適宜付記します。

- **対象**: React 18 以降（関数コンポーネント中心）
- **補助**: C++/C#のクラス/ジェネリクス/参照・値、Pythonの可変/不変・コンテキスト管理の感覚と対応づけ
- **前提**: 基本的な JavaScript/ES6 構文は知っている前提（必要箇所は最短で復習）

---

## 目次

1. 基本の概念マップ（C++/C#/Python対応）
2. JSX とレンダリングの基礎
3. コンポーネント（関数 vs クラス）
4. Props と State、イベント処理
5. 副作用: useEffect とライフサイクル対応表
6. リスト・条件分岐・フォーム
7. Refs と DOM 操作、非制御コンポーネント
8. コンテキスト API と依存性注入的パターン
9. Hooks 一覧と実用サンプル（useState/useEffect/useMemo/useCallback/useRef/カスタム）
10. パフォーマンス最適化（メモ化、キー、分割）
11. ルーティング（React Router）
12. データ取得（fetch/axios、SWR/React Query の触り）
13. エラーバウンダリ
14. 状態管理（Redux Toolkit/Zustandの超要点）
15. TypeScript 簡易メモ
16. テスト（React Testing Library）
17. よくある落とし穴（ミューテーション、キー、非同期）
18. CLI・ビルド・デプロイの基本
19. スニペット集（コピペ可）

---

## 1) 基本の概念マップ（C++/C#/Python対応）

- **コンポーネント**: C#/WPFの`UserControl`、Qtの`QWidget`、PythonのGUI部品に相当。UIを関数で宣言的に記述。
- **Props**: 関数引数（不変）。C++の`const`参照、C#のイミュータブル型、Pythonの引数（渡されたら基本書き換えない）
- **State**: 内部状態（可変だが、直接代入でなく`setState`/`useState`で更新）。Pythonの`list`を新しく作り直す感覚でイミュータブル更新。
- **再レンダリング**: 入力（props/state）が変わると UI 再計算。C#/WPFの`INotifyPropertyChanged`でViewが更新される感覚に近い。
- **副作用**: DOM操作、データ取得、購読など。Pythonの`with`コンテキスト/クリーンアップに近いパターンを`useEffect`で管理。
- **キー（key）**: リスト差分の識別子。C++のプライマリキー、辞書キーのようなもの。安定ID必須。

---

## 2) JSX とレンダリングの基礎

JSX は XML/HTML 風の構文で UI を宣言します。実体は JavaScript に変換されます。

```jsx
function Hello({ name }) {
  return <h1>Hello, {name}!</h1>;
}

// 使用
<Hello name="Alice" />
```

- 属性は`camelCase`（例: `onClick`, `className`）。
- 式は`{}`で埋め込み。
- ルート要素は 1 つにする（複数は`<>...</>`フラグメントで包む）。

```jsx
function Panel() {
  return (
    <>
      <header>Title</header>
      <main>Content</main>
    </>
  );
}
```

---

## 3) コンポーネント（関数 vs クラス）

React 18 以降は関数コンポーネント＋Hooksが主流。クラスはレガシー。

```jsx
// 関数コンポーネント（推奨）
function Counter() {
  const [count, setCount] = React.useState(0);
  return (
    <button onClick={() => setCount(c => c + 1)}>
      Count: {count}
    </button>
  );
}
```

クラス（歴史的）：

```jsx
class CounterClass extends React.Component {
  state = { count: 0 };
  render() {
    return (
      <button onClick={() => this.setState({ count: this.state.count + 1 })}>
        Count: {this.state.count}
      </button>
    );
  }
}
```

---

## 4) Props と State、イベント処理

```jsx
function Greeting({ userName, onLogout }) { // props は不変
  return (
    <div>
      <span>Hello, {userName}</span>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}

function App() {
  const [name, setName] = React.useState("Alice"); // state は set で更新
  return <Greeting userName={name} onLogout={() => setName("")} />;
}
```

- **ミューテーション禁止**: `state.push(...)`のように直接変更せず、新しい配列/オブジェクトを作る。

```jsx
// 悪い
items.push(newItem); setItems(items); // 参照が同じでレンダリングされない可能性

// 良い
setItems(prev => [...prev, newItem]);
```

---

## 5) 副作用: useEffect とライフサイクル対応表

`useEffect(effect, deps)` はレンダリング後に走る。`deps`が変わると再実行。クリーンアップで購読解除など。

```jsx
function Timer() {
  const [seconds, setSeconds] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(id); // アンマウント/依存変更時に実行
  }, []); // マウント時のみ

  return <div>{seconds}s</div>;
}
```

ライフサイクル対応（雑に）：

- C#/WPFの`Loaded`/`Unloaded` ~ `useEffect(() => {...; return cleanup;}, [])`
- 更新（props/state変更） ~ `useEffect(..., [依存])`

---

## 6) リスト・条件分岐・フォーム

```jsx
// リストと key
function TodoList({ items }) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  );
}

// 条件分岐
{isLoading ? <Spinner /> : <Content />}
{error && <div role="alert">{error.message}</div>}

// フォーム（制御）
function LoginForm() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const handleSubmit = e => {
    e.preventDefault();
    // 送信処理
  };
  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button>Login</button>
    </form>
  );
}
```

---

## 7) Refs と DOM 操作、非制御コンポーネント

```jsx
function FocusInput() {
  const inputRef = React.useRef(null);
  return (
    <>
      <input ref={inputRef} />
      <button onClick={() => inputRef.current?.focus()}>Focus</button>
    </>
  );
}

// 非制御フォーム（値は DOM から取得）
function Uncontrolled() {
  const ref = React.useRef(null);
  const onSubmit = e => {
    e.preventDefault();
    alert(ref.current.value);
  };
  return (
    <form onSubmit={onSubmit}>
      <input ref={ref} defaultValue="hello" />
      <button>OK</button>
    </form>
  );
}
```

---

## 8) コンテキスト API と依存性注入的パターン

グローバルに近い値をツリーに配布。C#のDIコンテナ/`HttpContext`の局所版的に使用可能。

```jsx
const ThemeContext = React.createContext("light");

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Child />
    </ThemeContext.Provider>
  );
}

function Child() {
  const theme = React.useContext(ThemeContext);
  return <div data-theme={theme}>...</div>;
}
```

---

## 9) Hooks 一覧と実用サンプル

- **useState**: ローカル状態
- **useEffect**: 副作用（購読/タイマー/フェッチ）
- **useMemo**: 高コスト計算のメモ化
- **useCallback**: 関数の参照安定化
- **useRef**: 可変参照・DOM参照
- **useReducer**: 複雑な状態遷移（Redux風）
- **カスタムフック**: ロジックの再利用

```jsx
// useMemo/useCallback 実例
function SearchBox({ list }) {
  const [q, setQ] = React.useState("");

  const filtered = React.useMemo(
    () => list.filter(x => x.includes(q)),
    [list, q]
  );

  const onChange = React.useCallback(e => setQ(e.target.value), []);

  return (
    <>
      <input value={q} onChange={onChange} />
      <ul>{filtered.map(x => <li key={x}>{x}</li>)}</ul>
    </>
  );
}

// useReducer
function reducer(state, action) {
  switch (action.type) {
    case "inc": return { ...state, count: state.count + 1 };
    case "dec": return { ...state, count: state.count - 1 };
    default: return state;
  }
}

function Counter() {
  const [state, dispatch] = React.useReducer(reducer, { count: 0 });
  return (
    <>
      <button onClick={() => dispatch({ type: "dec" })}>-</button>
      <span>{state.count}</span>
      <button onClick={() => dispatch({ type: "inc" })}>+</button>
    </>
  );
}

// カスタムフック
function useLocalStorage(key, initialValue) {
  const [value, setValue] = React.useState(() => {
    const raw = localStorage.getItem(key);
    return raw != null ? JSON.parse(raw) : initialValue;
  });
  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}
```

---

## 10) パフォーマンス最適化（メモ化、キー、分割）

- **React.memo**: Props が同じなら再レンダリング回避。
- **useMemo/useCallback**: 計算/関数参照の安定化。
- **key**: リスト差分の精度向上（安定IDを使う）。
- **コード分割**: `React.lazy` + `Suspense`。

```jsx
const Heavy = React.lazy(() => import("./Heavy"));

function App() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Heavy />
    </React.Suspense>
  );
}

const Row = React.memo(function Row({ item }) {
  return <div>{item.title}</div>;
});
```

---

## 11) ルーティング（React Router）

```bash
npm i react-router-dom
```

```jsx
import { BrowserRouter, Routes, Route, Link, useParams } from "react-router-dom";

function User() {
  const { id } = useParams();
  return <div>User: {id}</div>;
}

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/users/42">User42</Link>
      </nav>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/users/:id" element={<User />} />
      </Routes>
    </BrowserRouter>
  );
}
```

---

## 12) データ取得（fetch/axios、SWR/React Query）

```jsx
// fetch + useEffect
function Posts() {
  const [posts, setPosts] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    let active = true;
    setLoading(true);
    fetch("/api/posts")
      .then(r => r.ok ? r.json() : Promise.reject(r))
      .then(data => active && setPosts(data))
      .catch(err => active && setError(err))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div role="alert">Error</div>;
  return <ul>{posts.map(p => <li key={p.id}>{p.title}</li>)}</ul>;
}
```

```bash
# 代替: SWR
npm i swr
```

```jsx
import useSWR from "swr";
const fetcher = url => fetch(url).then(r => r.json());

function PostsSWR() {
  const { data, error, isLoading } = useSWR("/api/posts", fetcher);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  return <ul>{data.map(p => <li key={p.id}>{p.title}</li>)}</ul>;
}
```

---

## 13) エラーバウンダリ

関数コンポーネントでは直接作れないため、クラスで包むのが定石。

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error, info) { console.error(error, info); }
  render() {
    if (this.state.hasError) return <h1>Something went wrong.</h1>;
    return this.props.children;
  }
}

// 使用
<ErrorBoundary>
  <DangerComponent />
</ErrorBoundary>
```

---

## 14) 状態管理（Redux Toolkit / Zustand）

```bash
npm i @reduxjs/toolkit react-redux
```

```jsx
// store.js
import { configureStore, createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    inc: s => { s.value += 1; }, // Immer でミューテーション風に書ける
    add: (s, a) => { s.value += a.payload; }
  }
});

export const { inc, add } = counterSlice.actions;
export const store = configureStore({ reducer: { counter: counterSlice.reducer } });
```

```jsx
// App.jsx
import { Provider, useDispatch, useSelector } from "react-redux";
import { store, inc, add } from "./store";

function Counter() {
  const value = useSelector(s => s.counter.value);
  const dispatch = useDispatch();
  return (
    <>
      <div>{value}</div>
      <button onClick={() => dispatch(inc())}>+1</button>
      <button onClick={() => dispatch(add(5))}>+5</button>
    </>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}
```

```bash
# より軽量: Zustand
npm i zustand
```

```jsx
import create from "zustand";

const useStore = create(set => ({ value: 0, inc: () => set(s => ({ value: s.value + 1 })) }));

function CounterZ() {
  const { value, inc } = useStore();
  return <button onClick={inc}>Value: {value}</button>;
}
```

---

## 15) TypeScript 簡易メモ

```tsx
type User = { id: number; name: string };

type Props = {
  user: User;
  onSelect?: (userId: number) => void;
};

function UserCard({ user, onSelect }: Props) {
  return (
    <div onClick={() => onSelect?.(user.id)}>{user.name}</div>
  );
}
```

- ジェネリクス、ユニオン、Optional で安全性を確保。
- イベント型例: `React.ChangeEvent<HTMLInputElement>`、`React.MouseEvent<HTMLButtonElement>`。

---

## 16) テスト（React Testing Library）

```bash
npm i -D @testing-library/react @testing-library/jest-dom
```

```jsx
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

function Counter() {
  const [c, setC] = React.useState(0);
  return <button onClick={() => setC(c+1)}>Count: {c}</button>;
}

test("increments", () => {
  render(<Counter />);
  fireEvent.click(screen.getByText(/Count/));
  expect(screen.getByText("Count: 1")).toBeInTheDocument();
});
```

---

## 17) よくある落とし穴

- **state を直接ミュートしない**: 配列/オブジェクトはコピーして新規に。
- **key の誤用**: `index`を key にすると並べ替え/削除でバグ。安定IDを。
- **非同期 setState**: 直後に古い値を読む誤り。関数アップデート`setX(prev => ...)`を使う。
- **重い計算の直書き**: `useMemo`でメモ化。
- **無限ループ useEffect**: 依存配列を正しく設定。

---

## 18) CLI・ビルド・デプロイ

```bash
# 開発
npm start

# テスト
npm test

# ビルド
npm run build
```

静的ファイルを`build/`に出力。任意の静的ホスティングに配備可能。

---

## 19) スニペット集（コピペ可）

```jsx
// 1) デバウンス入力
function useDebouncedValue(value, delay = 300) {
  const [v, setV] = React.useState(value);
  React.useEffect(() => {
    const id = setTimeout(() => setV(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return v;
}

// 2) 外側クリック検出
function useClickOutside(ref, onOutside) {
  React.useEffect(() => {
    const handler = e => { if (ref.current && !ref.current.contains(e.target)) onOutside?.(e); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [ref, onOutside]);
}

// 3) メディアクエリ
function useMediaQuery(query) {
  const [match, setMatch] = React.useState(() => matchMedia(query).matches);
  React.useEffect(() => {
    const m = matchMedia(query);
    const cb = () => setMatch(m.matches);
    m.addEventListener("change", cb);
    cb();
    return () => m.removeEventListener("change", cb);
  }, [query]);
  return match;
}

// 4) フェッチ with abort
function useFetch(url, options) {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    const ctrl = new AbortController();
    setLoading(true);
    fetch(url, { ...options, signal: ctrl.signal })
      .then(r => r.ok ? r.json() : Promise.reject(r))
      .then(setData, setError)
      .finally(() => setLoading(false));
    return () => ctrl.abort();
  }, [url]);
  return { data, error, loading };
}

// 5) コンポジション: Slot パターン
function Card({ Header, Footer, children }) {
  return (
    <div className="card">
      {Header && <Header />}
      <div className="body">{children}</div>
      {Footer && <Footer />}
    </div>
  );
}
```

---

## 補遺: C++/C#/Python 観点の覚え書き

- **イミュータブル更新**が基本。C++の`const`厳守、C#のレコード型、Pythonの`tuple`的発想。
- **参照同一性**が再レンダリングを左右。`useCallback/useMemo`で安定化。
- **関数は第一級**: 子にイベントを渡す感覚は C#のデリゲート、C++の`std::function`、Pythonのコールバックと同等。
- **例外はバブルアップ**: UI崩壊を防ぐのにエラーバウンダリを使う。

---

以上。必要な箇所だけコピペして使ってください。長期運用では TypeScript の導入・Lint/Format（ESLint/Prettier）・テスト整備を推奨します。





