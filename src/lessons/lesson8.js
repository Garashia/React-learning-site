export const lesson8 = {
  id: 'lesson8',
  title: 'パフォーマンス最適化（memo/useMemo/useCallback）',
  description: '再レンダリング抑制と計算メモ化、関数参照の安定化を体験します。',
  files: {
    '/App.js': { code: `import React from 'react';

export default function App(){
  const [q, setQ] = React.useState('');
  const [items] = React.useState(()=> Array.from({length:1000}, (_,i)=> 'item-'+i));

  const filtered = React.useMemo(()=>{
    // 重い計算を模擬
    const t = performance.now();
    while(performance.now()-t < 30) {}
    return items.filter(x => x.includes(q));
  }, [items, q]);

  const onChange = React.useCallback(e => setQ(e.target.value), []);

  return (
    <div style={{ fontFamily:'sans-serif', padding:16 }}>
      <h1>Lesson 8: 最適化</h1>
      <input value={q} onChange={onChange} placeholder="検索" />
      <List items={filtered} />
    </div>
  );
}

const Row = React.memo(function Row({ value }){
  return <li>{value}</li>;
});

function List({ items }){
  return <ul>{items.map(v => <Row key={v} value={v} />)}</ul>;
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
<title>Lesson 8</title></head><body><div id="root"></div></body></html>` }
  }
};




