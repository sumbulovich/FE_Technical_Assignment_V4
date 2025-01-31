import { Component, DestroyRef, inject, signal, WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval, map, startWith } from 'rxjs';

@Component({
  selector: 'app-countdown',
  imports: [],
  templateUrl: './countdown.component.html',
  styleUrl: './countdown.component.scss'
})
export class CountdownComponent {
  private destroyRef = inject(DestroyRef)
  countdown: WritableSignal<string> = signal<string>('');

  constructor() {
    this.startCountdown();
  }

  private startCountdown(): void {
    interval(1000).pipe(
      startWith(0),
      map(() => {
        const now = new Date();
        const midnight = new Date();
        midnight.setHours(24, 0, 0, 0);
        const diff = midnight.getTime() - now.getTime();

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        return `${hours}h ${minutes}m ${seconds}s`;
      })
    ).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((time) => {
      this.countdown.set(time);
    });
  }
}
