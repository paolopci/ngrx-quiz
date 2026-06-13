import { Component, computed, input, Input, signal } from '@angular/core';
import { SharedModule } from '../../shared.module';

@Component({
  selector: 'app-progress',
  imports: [SharedModule],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.scss',
})
export class ProgressComponent {
  readonly value = input.required<number>();
  readonly max = input.required<number>();

  readonly displayValue = computed(() =>
    this.max() === 0 ? 0 : Math.min(this.value() + 1, this.max()),
  );

  readonly ratio = computed(() => this.displayValue() / this.max());
}
