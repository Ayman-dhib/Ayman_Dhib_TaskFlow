import { Component, input } from '@angular/core';
import { DatePipe, NgClass } from '@angular/common';
import { Task, TaskPriority, TaskStatus } from '../../models/task.model';
import { TruncatePipe } from '../../../../shared/components/pipes/TruncatePipe';
import { DeadlinePipe } from '../../../../shared/components/pipes/DeadlinePipe';
import { HighlightDirective } from '../../../../shared/directives/highlight.directive';
import { OverdueDirective } from '../../../../shared/directives/overdue.directive';
import { TooltipDirective } from '../../../../shared/directives/tooltip.directive';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [
    DatePipe, NgClass, TruncatePipe, DeadlinePipe,
    HighlightDirective, OverdueDirective, TooltipDirective,
  ],
  templateUrl: './task-item.html',
})
export class TaskItem {
  task = input.required<Task>();
  showAssignee = input<boolean>(false);
  assigneeName = input<string>('');      // given by the parent

  statusBorder: Record<TaskStatus, string> = {
    'En attente': 'border-slate-400 bg-slate-50',
    'En cours': 'border-blue-500 bg-blue-50',
    'Terminé': 'border-green-500 bg-green-50',
  };

  priorityBadge: Record<TaskPriority, string> = {
    'Haute': 'bg-red-100 text-red-700',
    'Moyenne': 'bg-amber-100 text-amber-700',
    'Basse': 'bg-emerald-100 text-emerald-700',
  };
}