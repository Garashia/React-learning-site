export const lesson6 = {
  id: 'lesson6',
  title: 'ルーティング入門（React Router）',
  description: 'ページ遷移とURLパラメータ、リンクの基本を学びます。',
  files: {
    '/App.js': {
      code: `import React from 'react';
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';

export default function App(){
  return (
    <BrowserRouter>
      <div style={{ fontFamily:'sans-serif', padding:16 }}>
        <h1>Lesson 6: ルーティング</h1>
        <nav style={{ display:'flex', gap:12 }}>
          <Link to="/">ホーム</Link>
          <Link to="/users/42">ユーザー42</Link>
        </nav>
        <Routes>
          <Route path="/" element={<div>ホームです</div>} />
          <Route path="/users/:id" element={<User />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function User(){
  const { id } = useParams();
  return <div>ユーザーID: {id}</div>;
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
<title>Lesson 6</title></head><body><div id="root"></div></body></html>` }
  }
};




