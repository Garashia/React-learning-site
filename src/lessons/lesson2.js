export const lesson2 = {
  id: 'lesson2',
  title: 'フォーム入力と制御コンポーネント',
  description: 'input の値を state で管理し、入力値を表示・送信する基本を学びます。',
  files: {
    '/App.js': {
      code: `import React from 'react';

export default function App() {
  return (
    <div style={{ fontFamily: 'sans-serif', padding: 16 }}>
      <h1>Lesson 2: フォーム</h1>
      <LoginForm />
    </div>
  );
}

function LoginForm() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [submitted, setSubmitted] = React.useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted({ email });
  };

  return (
    <form onSubmit={onSubmit} style={{ display: 'grid', gap: 8, maxWidth: 320 }}>
      <label>
        メールアドレス
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
      </label>
      <label>
        パスワード
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button>ログイン</button>
      {submitted && (
        <p data-testid="result">送信しました: {submitted.email}</p>
      )}
    </form>
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
    <title>Lesson 2</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
`
    }
  }
};


