export const lesson4 = {
  id: 'lesson4',
  title: 'リストと key / 条件分岐',
  description: '配列の描画と key、条件表示の基本パターンを学びます。',
  files: {
    '/App.js': {
      code: `import React from 'react';

export default function App() {
  return (
    <div style={{ fontFamily: 'sans-serif', padding: 16 }}>
      <h1>Lesson 4: リストと条件</h1>
      <TodoApp />
    </div>
  );
}

function TodoApp() {
  const [text, setText] = React.useState('');
  const [items, setItems] = React.useState([
    { id: 1, title: '牛乳を買う', done: false },
    { id: 2, title: 'メール返信', done: true },
  ]);
  const add = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setItems(list => [...list, { id: Date.now(), title: text.trim(), done: false }]);
    setText('');
  };
  const toggle = (id) => setItems(list => list.map(it => it.id===id? { ...it, done: !it.done } : it));

  const hasDone = items.some(it => it.done);

  return (
    <div>
      <form onSubmit={add} style={{ display:'flex', gap:8 }}>
        <input value={text} onChange={e=>setText(e.target.value)} placeholder="やること" />
        <button>追加</button>
      </form>
      <ul>
        {items.map(it => (
          <li key={it.id}>
            <label style={{ textDecoration: it.done ? 'line-through' : 'none' }}>
              <input type="checkbox" checked={it.done} onChange={()=>toggle(it.id)} /> {it.title}
            </label>
          </li>
        ))}
      </ul>
      {hasDone ? <p>完了した項目があります。</p> : <p>まだ完了はありません。</p>}
    </div>
  );
}
`
    },
    '/index.js': { code: `import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
const root = createRoot(document.getElementById('root'));
root.render(<App />);
` },
    '/index.html': { code: `<!DOCTYPE html>
<html><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Lesson 4</title></head><body><div id="root"></div></body></html>` }
  }
};




