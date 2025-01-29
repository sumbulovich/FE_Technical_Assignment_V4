import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { computed, inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';

@Injectable()
export class BreakpointService {
  private breakpointObserver = inject(BreakpointObserver);
  breakpoint: WritableSignal<string> = signal<string>(Breakpoints.Medium);
  isMobile: Signal<boolean> = computed(() => this.breakpoint() === Breakpoints.XSmall || this.breakpoint() === Breakpoints.Small);

  observeBreakpoints() {
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ]).subscribe(result => {
      // Check which breakpoint is active and update the store
      const breakpoint = Object.keys(result.breakpoints).find((key) => result.breakpoints[key]);
      if (breakpoint) this.breakpoint.set(breakpoint);
    });
  }
}
