# Lesson 9: useReducer で状態管理入門

複数の操作が絡むと `useState` だけでは煩雑。reducer で遷移を整理します。

学習ポイント:
- `reducer(state, action)` と `dispatch` の関係
- 不変更新（スプレッド/配列操作）
- アクション設計（`type` と `payload`）

## スニペットA: reducer
```jsx
function reducer(state, action){
  switch(action.type){
    case 'add': return { ...state, todos: [...state.todos, action.todo] };
    case 'toggle': return { ...state, todos: state.todos.map(t => t.id===action.id? { ...t, done:!t.done } : t) };
    default: return state;
  }
}
```

## スニペットB: 使い方
```jsx
const [state, dispatch] = React.useReducer(reducer, { todos: [] });
```

やってみよう:
1. `remove` アクションを追加
2. `edit` アクションでタイトルを編集
3. `persist`：localStorageに保存（発展）


