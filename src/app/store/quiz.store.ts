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
  withState(initialQuizSlice),
  withComputed((p) => {
    const currentQuestionIndex = computed(() => p.answers().length); // Indice della domanda corrente, basato sul numero di risposte date.
    // Il quiz è terminato quando il numero di risposte date coincide con il numero totale di domande.
    const isDone = computed(() => p.answers().length === p.questions().length);
    // Usa l'indice corrente per recuperare la domanda da mostrare.
    const currentQuestion = computed(
      () => p.questions()[currentQuestionIndex()],
    );
    const questionsCount = computed(() => p.questions().length);
    const correctCount = computed(
      () =>
        p
          .answers()
          .filter(
            (answer, index) => answer === p.questions()[index]?.correctIndex,
          ).length,
    );
    return {
      currentQuestionIndex,
      isDone,
      currentQuestion,
      questionsCount,
      correctCount,
    };
  }),
  // Espone i metodi dello store per registrare una risposta o reimpostare il quiz.
  withMethods((store) => ({
    addAnswer: (index: number) => patchState(store, addAnswer(index)),
    reset: () => patchState(store, resetQuiz()),
  })),
  withHooks((store) => ({
    // Hook eseguito all'inizializzazione dello store.
    onInit: () => {
      // Recupera dal localStorage lo stato del quiz salvato in precedenza.
      const stateJson = localStorage.getItem('quiz');

      // Se esiste uno stato salvato, ripristina solo un quiz ancora in corso.
      if (stateJson) {
        const state = JSON.parse(stateJson) as Partial<QuizSlice>;
        const answers = Array.isArray(state.answers) ? state.answers : [];
        const questionsCount = initialQuizSlice.questions.length;

        if (answers.length > 0 && answers.length < questionsCount) {
          patchState(store, { answers });
        }
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
