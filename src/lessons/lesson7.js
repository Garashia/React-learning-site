export const lesson7 = {
  id: 'lesson7',
  title: 'エラーバウンダリ',
  description: '子コンポーネントの例外を捕捉してUI崩壊を防ぐパターンを学びます。',
  files: {
    '/App.js': { code: `import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props){ super(props); this.state={ hasError:false }; }
  static getDerivedStateFromError(){ return { hasError:true }; }
  componentDidCatch(err, info){ console.error(err, info); }
  render(){ return this.state.hasError ? <h2>何か問題が発生しました。</h2> : this.props.children; }
}

export default function App(){
  return (
    <div style={{ fontFamily:'sans-serif', padding:16 }}>
      <h1>Lesson 7: エラーバウンダリ</h1>
      <ErrorBoundary>
        <Danger />
      </ErrorBoundary>
    </div>
  );
}

function Danger(){
  const [boom, setBoom] = React.useState(false);
  if(boom) throw new Error('Boom');
  return <button onClick={()=>setBoom(true)}>爆発させる</button>;
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
<title>Lesson 7</title></head><body><div id="root"></div></body></html>` }
  }
};




