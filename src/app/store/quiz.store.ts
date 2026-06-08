import { signalStore, withComputed, withState } from '@ngrx/signals';
import { initialQuizSlice } from './quiz.slice';
import { computed } from '@angular/core';

export const QuizStore = signalStore(
  { providedIn: 'root' },
  withState(initialQuizSlice),
  withComputed((p) => {
    const currentQuestionIndex = computed(() => p.answers().length); // conta il numero delle risposte che ho già dato
    const isDone = computed(() => p.answers().length === p.questions().length);
    return {
      currentQuestionIndex,
      // se il numero delle risposte date è uguale al numero delle domande allora ho finito il quiz
      isDone,
    };
  }),

  withComputed((p) => ({
    // 1° metodo x ritornare la domanda corrente ma ... migliorabile
    currentQuestion: computed(() => p.questions()[p.currentQuestionIndex()]),
  })),
);
