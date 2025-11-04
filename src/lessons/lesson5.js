export const lesson5 = {
  id: 'lesson5',
  title: 'コンテキストとカスタムフック',
  description: 'グローバルに近い状態共有とロジックの再利用（カスタムフック）を学びます。',
  files: {
    '/App.js': {
      code: `import React from 'react';

const ThemeContext = React.createContext('light');

export default function App() {
  const [theme, setTheme] = React.useState('light');
  return (
    <ThemeContext.Provider value={theme}>
      <div style={{ fontFamily: 'sans-serif', padding: 16 }}>
        <h1>Lesson 5: コンテキストとフック</h1>
        <button onClick={()=>setTheme(t=> t==='light'?'dark':'light')}>
          テーマ切替: {theme}
        </button>
        <ThemedCard />
      </div>
    </ThemeContext.Provider>
  );
}

function useLocalStorage(key, initialValue){
  const [value, setValue] = React.useState(()=>{
    const raw = localStorage.getItem(key);
    return raw!=null? JSON.parse(raw) : initialValue;
  });
  React.useEffect(()=>{
    localStorage.setItem(key, JSON.stringify(value));
  },[key, value]);
  return [value, setValue];
}

function ThemedCard(){
  const theme = React.useContext(ThemeContext);
  const [memo, setMemo] = useLocalStorage('memo', 'メモを書いてみよう');
  const styles = theme==='dark' ? { background:'#111827', color:'#fff', padding:16, borderRadius:8 } : { background:'#f9fafb', padding:16, borderRadius:8 };
  return (
    <div style={styles}>
      <p>現在のテーマ: {theme}</p>
      <textarea value={memo} onChange={e=>setMemo(e.target.value)} style={{ width:'100%', minHeight:80 }} />
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
<title>Lesson 5</title></head><body><div id="root"></div></body></html>` }
  }
};




