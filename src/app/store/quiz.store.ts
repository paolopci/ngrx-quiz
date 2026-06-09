import {
  getState,
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { initialQuizSlice, QuizSlice } from './quiz.slice';
import { computed, effect } from '@angular/core';
import { addAnswer, resetQuiz } from './quiz.updaters';

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
  // Espone i metodi dello store: qui viene registrata la risposta selezionata.
  withMethods((store) => ({
    addAnswer: (index: number) => patchState(store, addAnswer(index)),
    reset: () => patchState(store, resetQuiz()),
  })),
  withHooks((store) => ({
    // Hook eseguito all'inizializzazione dello store.
    onInit: () => {
      // Recupera dal localStorage lo stato del quiz salvato in precedenza.
      const stateJson = localStorage.getItem('quiz');

      // Se esiste uno stato salvato, lo deserializza e lo applica allo store.
      if (stateJson) {
        const state = JSON.parse(stateJson) as QuizSlice;
        patchState(store, state);
      }

      // Effetto che osserva lo stato dello store e lo salva nel localStorage.
      effect(() => {
        // Legge lo stato corrente dello store.
        const state = getState(store);

        // Converte lo stato in formato JSON.
        const stateJson = JSON.stringify(state);

        // Persiste lo stato del quiz nel localStorage.
        localStorage.setItem('quiz', stateJson);
      });
    },
  })),
);
