import { Component, inject, input, signal } from '@angular/core';
import { Task, TaskPriority, TaskStatus } from '../../models/task.model';
import { User } from '../../../users/models/user.model';
import { UserService } from '../../../../core/services/user.service';
import {
   DatePipe, 
   NgClass
} from '@angular/common';
import { TruncatePipe } from '../../../../shared/components/pipes/TruncatePipe';
import { DeadlinePipe } from '../../../../shared/components/pipes/DeadlinePipe';
import { HighlightDirective } from '../../../../shared/directives/highlight.directive';
import { OverdueDirective } from '../../../../shared/directives/overdue.directive';
import { TooltipDirective } from '../../../../shared/directives/tooltip.directive';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    DatePipe,
    TruncatePipe,
    DeadlinePipe,
    HighlightDirective,
    OverdueDirective,
    TooltipDirective,
    NgClass,
  ],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList {
  private userService = inject(UserService);

  tasks = input.required<Task[]>();
  showAssignee = input<boolean>(true);  

  private users = signal<User[]>([]);    

  constructor() {                         
    this.userService.getUsers().subscribe(users => this.users.set(users));
  }

  getAssigneeName(assigneeId?: number): string {   // NEW
    if (assigneeId === undefined) return 'Non assignée';
    return this.users().find(u => u.id === assigneeId)?.name ?? 'Inconnu';
  }

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