export const lesson10 = {
  id: 'lesson10',
  title: '総合ミニ課題：メモアプリ',
  description: 'フォーム/リスト/検索/永続化を組み合わせて小さなアプリを完成させます。',
  files: {
    '/App.js': { code: `import React from 'react';

function useLocalStorage(key, initialValue){
  const [value, setValue] = React.useState(()=>{
    const raw = localStorage.getItem(key);
    return raw!=null? JSON.parse(raw) : initialValue;
  });
  React.useEffect(()=>{ localStorage.setItem(key, JSON.stringify(value)); },[key, value]);
  return [value, setValue];
}

export default function App(){
  const [memos, setMemos] = useLocalStorage('memos', []);
  const [text, setText] = React.useState('');
  const [q, setQ] = React.useState('');
  const add = (e)=>{ e.preventDefault(); if(!text.trim()) return; setMemos(ms=>[{ id:Date.now(), body:text.trim() }, ...ms]); setText(''); };
  const filtered = React.useMemo(()=> memos.filter(m=> m.body.includes(q)), [memos, q]);
  return (
    <div style={{ fontFamily:'sans-serif', padding:16 }}>
      <h1>Lesson 10: メモアプリ</h1>
      <form onSubmit={add} style={{ display:'grid', gap:8, maxWidth:480 }}>
        <textarea value={text} onChange={e=>setText(e.target.value)} placeholder="メモを書く" />
        <button>追加</button>
      </form>
      <div style={{ marginTop:12 }}>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="検索" />
      </div>
      <ul>
        {filtered.map(m => <li key={m.id}>{m.body}</li>)}
      </ul>
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
<title>Lesson 10</title></head><body><div id="root"></div></body></html>` }
  }
};




