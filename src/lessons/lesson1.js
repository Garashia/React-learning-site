export const lesson1 = {
  id: 'lesson1',
  title: 'useState でカウンターを作る',
  description: 'ボタンをクリックしてカウントアップする基本のコンポーネントを作ってみましょう。',
  files: {
    '/App.js': {
      code: `import React from 'react';

export default function App() {
  return (
    <div style={{ fontFamily: 'sans-serif', padding: 16 }}>
      <h1>Lesson 1: カウンター</h1>
      <Counter />
    </div>
  );
}

function Counter() {
  const [count, setCount] = React.useState(0);
  return (
    <button onClick={() => setCount(c => c + 1)}>
      カウント: {count}
    </button>
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
    <title>Lesson 1</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
`
    }
  }
};



