import { signalStore, withComputed, withState } from '@ngrx/signals';
import { initialQuizSlice } from './quiz.slice';
import { computed } from '@angular/core';

export const QuizStore = signalStore(
  { providedIn: 'root' },
  withState(initialQuizSlice),
  withComputed((p) => ({
    currentQuestionIndex: computed(() => p.answers().length), // conta il numero delle risposte che ho già dato
    // se il numero delle risposte date è uguale al numero delle domande allora ho finito il quiz
    isDone: computed(() => p.answers().length === p.questions().length),
  })),
);
