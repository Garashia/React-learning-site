import { useParams } from 'react-router-dom';
import { Sandpack } from '@codesandbox/sandpack-react';
import { useEffect, useState } from 'react';
import { loadLessonBySlug } from '../lessons/db';
import MarkdownView from '../components/MarkdownView';

export default function LessonPage() {
  const { lessonId } = useParams();
  const [lesson, setLesson] = useState(null);

  useEffect(() => {
    let active = true;
    loadLessonBySlug(lessonId).then((l) => { if (active) setLesson(l); });
    return () => { active = false; };
  }, [lessonId]);

  if (!lesson) return <div>Loading...</div>;

  return (
    <div className="container root-typography">
      <div style={{ marginBottom: 12 }}>
        <h2 style={{ margin: 0 }}>{lesson.title}</h2>
        <div style={{ color: '#666', marginTop: 4 }}>{lesson.description}</div>
        <div style={{ marginTop: 8 }}>
          <button
            onClick={() => setLesson(prev => ({ ...prev, __ide: !prev?.__ide }))}
            className="btn"
            aria-pressed={lesson.__ide ? 'true' : 'false'}
          >
            {lesson.__ide ? 'IDEモード: ON' : 'IDEモード: OFF'}
          </button>
          <span style={{ marginLeft: 8, color:'#6b7280', fontSize: 12 }}>
            IDEモードはファイルツリーと広いエディタで編集重視に。OFFは読み物重視です。
          </span>
        </div>
      </div>
      <div className="lesson-stack">
        <section className="pane code-pane">
          <div className="pane-header">エディタ & プレビュー</div>
          <div className="pane-body">
            <Sandpack
              template="react"
              files={lesson.sandboxFiles}
              customSetup={{
                dependencies: {
                  mustache: "^4.2.0",
                  handlebars: "^4.7.8"
                }
              }}
              options={{
                showTabs: true,
                showLineNumbers: true,
                showConsole: true,
                autorun: true,
                showNavigator: !!lesson.__ide,
                editorHeight: lesson.__ide ? 520 : 360,
              }}
            />
          </div>
        </section>
        <section className="pane doc-pane">
          <div className="pane-header">解説</div>
          <div className="pane-body">
            <MarkdownView src={lesson.markdownUrl} />
          </div>
        </section>
      </div>
    </div>
  );
}



