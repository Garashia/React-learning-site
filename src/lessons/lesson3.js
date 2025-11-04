export const lesson3 = {
  id: 'lesson3',
  title: 'useEffect でデータ取得（fetch/ローディング/エラー）',
  description: '外部APIからデータを取得し、ローディングとエラーを扱う基本パターンを学びます。',
  files: {
    '/App.js': {
      code: `import React from 'react';

export default function App() {
  return (
    <div style={{ fontFamily: 'sans-serif', padding: 16 }}>
      <h1>Lesson 3: 記事の取得</h1>
      <Posts />
    </div>
  );
}

function Posts() {
  const [posts, setPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    let active = true;
    setLoading(true);
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
      .then(r => r.ok ? r.json() : Promise.reject(r))
      .then(data => { if (active) setPosts(data); })
      .catch(err => { if (active) setError(err); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  if (loading) return <p>読み込み中...</p>;
  if (error) return <p role="alert">エラーが発生しました</p>;
  return (
    <ul>
      {posts.map(p => (
        <li key={p.id}>
          <strong>{p.title}</strong>
          <div style={{ color: '#555' }}>{p.body}</div>
        </li>
      ))}
    </ul>
  );
}
`
    },
    '/index.js': {
      code: `import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const root = createRoot(document.getElementById('root'));
root.render(<App />);
`
    },
    '/index.html': {
      code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Lesson 3</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
`
    }
  }
};


