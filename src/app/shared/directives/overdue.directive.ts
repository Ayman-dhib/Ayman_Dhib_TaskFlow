import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appOverdue]',
  standalone: true
})
export class OverdueDirective {
  @Input() dueDate?: string | null;  
  @Input() done = false;             

  @HostBinding('class')
  get classes(): string {
    if (this.done || !this.dueDate) {
      return '';
    }

    const [year, month, day] = this.dueDate.split('-').map(Number);
    const due = new Date(year, month - 1, day);

    if (isNaN(due.getTime())) {
      return '';
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return due < today ? 'border-red-500 bg-red-50' : '';
  }
}