import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { initialQuizSlice } from './quiz.slice';
import { computed } from '@angular/core';

export const QuizStore = signalStore(
  {
    providedIn: 'root',
    //protectedState: false, // questo ti permette di modificare lo stato direttamente It looks like you're working with Angular's signal
  },
  withState(initialQuizSlice),
  withComputed((p) => {
    const currentQuestionIndex = computed(() => p.answers().length); // conta il numero delle risposte che ho già dato
    // se il numero delle risposte date è uguale al numero delle domande allora ho finito il quiz
    const isDone = computed(() => p.answers().length === p.questions().length);
    // per currentQuestion occorre che currentQuestionIndex sia già stato calcolato
    // quindi importante è l'ordine
    const currentQuestion = computed(
      () => p.questions()[currentQuestionIndex()],
    );
    const questionsCount = computed(() => p.questions().length);
    return {
      currentQuestionIndex,
      isDone,
      currentQuestion,
      questionsCount,
    };
  }),

  // withComputed((p) => ({
  //   1° metodo x ritornare la domanda corrente ma ... migliorabile
  //   currentQuestion: computed(() => p.questions()[p.currentQuestionIndex()]),
  // })),

  // Espone i metodi dello store: qui viene registrata la risposta selezionata.
  withMethods((store) => ({
    addAnswer: (index: number) => {
      patchState(store, (state) => ({
        answers: [...state.answers, index],
      }));
    },
  })),
);
