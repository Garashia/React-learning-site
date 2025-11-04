import { Link } from 'react-router-dom';
import { listLessons } from '../lessons/db';

export default function NavBar() {
  const lessons = listLessons();
  return (
    <header className="navbar">
      <div className="navbar-inner container">
        <Link to="/" className="brand">React 学習</Link>
        <nav className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <div className="nav-dropdown">
            <span className="nav-link has-caret">Lessons</span>
            <div className="dropdown">
              {lessons.map(l => (
                <Link key={l.id} to={`/lesson/${l.slug}`} className="dropdown-item">
                  <div className="dropdown-title">{l.title}</div>
                  <div className="dropdown-desc">{l.description}</div>
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}




