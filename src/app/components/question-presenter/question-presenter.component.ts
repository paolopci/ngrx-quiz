import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  signal,
} from '@angular/core';
import { Question } from '../../models/question.model';
import { SharedModule } from '../../shared.module';
import { FormControl, Validators } from '@angular/forms';
import { QuizStore } from '../../store/quiz.store';
import { patchState } from '@ngrx/signals';

@Component({
  selector: 'app-question-presenter',
  imports: [SharedModule],
  templateUrl: './question-presenter.component.html',
  styleUrl: './question-presenter.component.scss',
})
export class QuestionPresenterComponent {
  readonly store = inject(QuizStore);

  // Perché qui non stai leggendo il valore del signal: stai copiando il riferimento al signal.
  // Quindi question diventa semplicemente un alias locale del signal.
  // Per questo non usi () in TypeScript.
  readonly question = this.store.currentQuestion;

  onSelect(index: number) {
    console.log('Selecte answer: ', index);

    patchState(this.store,state=>({
      answers: [...state.answers,index]
    
    }))
  }
}
