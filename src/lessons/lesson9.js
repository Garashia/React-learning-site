export const lesson9 = {
  id: 'lesson9',
  title: 'useReducer で状態管理入門',
  description: '複雑な状態遷移を reducer で整理し、dispatch で操作します。',
  files: {
    '/App.js': { code: `import React from 'react';

function reducer(state, action){
  switch(action.type){
    case 'add': return { ...state, todos: [...state.todos, { id:Date.now(), title: action.title, done:false }] };
    case 'toggle': return { ...state, todos: state.todos.map(t => t.id===action.id ? { ...t, done:!t.done } : t) };
    case 'clearDone': return { ...state, todos: state.todos.filter(t => !t.done) };
    default: return state;
  }
}

export default function App(){
  const [state, dispatch] = React.useReducer(reducer, { todos: [] });
  const [text, setText] = React.useState('');
  const submit = (e)=>{ e.preventDefault(); if(!text.trim()) return; dispatch({ type:'add', title:text.trim() }); setText(''); };
  return (
    <div style={{ fontFamily:'sans-serif', padding:16 }}>
      <h1>Lesson 9: useReducer</h1>
      <form onSubmit={submit} style={{ display:'flex', gap:8 }}>
        <input value={text} onChange={e=>setText(e.target.value)} placeholder="やること" />
        <button>追加</button>
      </form>
      <ul>
        {state.todos.map(t => (
          <li key={t.id}>
            <label>
              <input type="checkbox" checked={t.done} onChange={()=>dispatch({ type:'toggle', id:t.id })} /> {t.title}
            </label>
          </li>
        ))}
      </ul>
      <button onClick={()=>dispatch({ type:'clearDone' })}>完了を削除</button>
    </div>
  );
}
` },
    '/index.js': { code: `import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
const root = createRoot(document.getElementById('root'));
root.render(<App />);
` },
    '/index.html': { code: `<!DOCTYPE html>
<html><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Lesson 9</title></head><body><div id="root"></div></body></html>` }
  }
};




