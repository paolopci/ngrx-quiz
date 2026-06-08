import { signalStore, withState } from '@ngrx/signals';
import { initialQuizSlice } from './quiz.slice';
export const QuizStore = signalStore(
  // { providedIn: 'root' },
  withState(initialQuizSlice),
);
