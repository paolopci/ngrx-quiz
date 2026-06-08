import { Component, inject, signal } from '@angular/core';
import { SharedModule } from './shared.module';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ProgressComponent } from './components/progress/progress.component';
import { DoneComponent } from './components/done/done.component';
import { BusyComponent } from './components/busy/busy.component';
import { QuizStore } from './store/quiz.store';

@Component({
  selector: 'app-root',
  imports: [SharedModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [QuizStore],
})
export class AppComponent {
  title = 'ngrx-quiz';

  readonly store = inject(QuizStore);
}
