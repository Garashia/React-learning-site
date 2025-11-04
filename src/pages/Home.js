import { Link } from 'react-router-dom';
import { listLessons } from '../lessons/db';

export default function Home() {
  const lessons = listLessons();
  return (
    <div>
      <h1>React 学習サイト（MVP）</h1>
      <p>入力→実行→フィードバックで学べるインタラクティブ教材です。</p>
      <ul>
        {lessons.map(l => (
          <li key={l.id}>
            <Link to={`/lesson/${l.slug}`}>{l.title}</Link>
            <div style={{ color: '#666', fontSize: 12 }}>{l.description}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}



