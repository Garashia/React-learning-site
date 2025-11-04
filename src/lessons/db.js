import db from './db.json';

export function listLessons() {
  return db;
}

export async function loadLessonBySlug(slug) {
  const meta = db.find(x => x.slug === slug);
  if (!meta) return null;
  // 動的 import で Sandpack 用ファイルを取得
  const mod = await import(/* webpackChunkName: "lesson-[request]" */ `${meta.module}`);
  const lesson = mod[meta.id] || mod.default || mod;
  return { ...meta, sandboxFiles: lesson.files };
}


