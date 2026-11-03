import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  theme = signal<'light' | 'dark'>('light');

  toggle(): void {
    this.theme.update(t => (t === 'light' ? 'dark' : 'light'));
    document.body.classList.toggle('dark', this.theme() === 'dark');
  }
}