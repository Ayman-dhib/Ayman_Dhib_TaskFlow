import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  message = signal<string | null>(null);

  show(text: string): void {
    this.message.set(text);
    setTimeout(() => this.message.set(null), 3000);
  }
}