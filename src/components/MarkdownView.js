import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

function slugify(text){
  return text.toLowerCase().trim()
    .replace(/[^a-z0-9\u3040-\u30ff\u4e00-\u9faf\s-]/g,'')
    .replace(/\s+/g,'-');
}

function buildToc(md){
  const lines = md.split(/\r?\n/);
  const items = [];
  for(const line of lines){
    const m2 = line.match(/^##\s+(.+)/);
    const m3 = line.match(/^###\s+(.+)/);
    if(m2){ const text=m2[1].trim(); items.push({level:2, text, id: slugify(text)}); }
    if(m3){ const text=m3[1].trim(); items.push({level:3, text, id: slugify(text)}); }
  }
  return items;
}

export default function MarkdownView({ src }) {
  const [content, setContent] = useState('');
  const [toc, setToc] = useState([]);
  useEffect(() => {
    let active = true;
    if (!src) return;
    // process.env.PUBLIC_URL を頭にくっつける
    const targetUrl = src.startsWith('http') ? src : (process.env.PUBLIC_URL + src);
    fetch(targetUrl)
      .then(r => r.ok ? r.text() : Promise.reject(r.statusText))
      .then(t => { if (active){ setContent(t); setToc(buildToc(t)); } })
      .catch(() => { if (active) setContent('# 読み込みエラー'); });
    return () => { active = false; };
  }, [src]);
  return (
    <div style={{ padding: 16, overflow: 'auto' }}>
      {toc.length > 0 && (
        <div className="toc">
          <div className="toc-title">目次</div>
          <ul style={{margin:0, paddingLeft:18}}>
            {toc.map((t,i) => (
              <li key={i} style={{marginLeft: t.level===3 ? 12 : 0}}>
                <a href={`#${t.id}`}>{t.text}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
      <ReactMarkdown
        components={{
          h2({children}){
            const text = String(children);
            const id = slugify(text);
            return <h2 id={id}>{children}</h2>;
          },
          h3({children}){
            const text = String(children);
            const id = slugify(text);
            return <h3 id={id}>{children}</h3>;
          },
          code({inline, className, children, ...props}) {
            const codeText = String(children).replace(/\n$/, '');
            if (inline) {
              return <code className={className} {...props}>{children}</code>;
            }
            return (
              <div className="codeblock">
                <CopyButton text={codeText} />
                <pre className={className}><code {...props}>{codeText}</code></pre>
              </div>
            );
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

function CopyButton({ text }){
  const [copied, setCopied] = useState(false);
  return (
    <button
      className="copy-btn"
      onClick={() => { navigator.clipboard?.writeText(text); setCopied(true); setTimeout(()=>setCopied(false),1200); }}
      aria-label="コードをコピー"
      title="コピー"
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}


