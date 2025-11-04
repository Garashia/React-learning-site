import { lesson1 } from './lesson1';
import { lesson2 } from './lesson2';

const lessons = {
  lesson1,
  lesson2,
};

export function getLesson(id) {
  return lessons[id];
}



