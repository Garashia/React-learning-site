import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LessonPage from './pages/LessonPage';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="App">
      <NavBar />
      <div style={{ padding: 16 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lesson/:lessonId" element={<LessonPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
