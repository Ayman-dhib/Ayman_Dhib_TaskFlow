import { Component, inject, input, output, signal } from '@angular/core';   // + output
import { Task, TaskStatus } from '../../models/task.model';                 // + TaskStatus
import { User } from '../../../users/models/user.model';
import { UserService } from '../../../../core/services/user.service';
import { TaskItem } from '../task-item/task-item';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskItem],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList {
  private userService = inject(UserService);

  tasks = input.required<Task[]>();
  showAssignee = input<boolean>(true);

  // NEW: event going up to ProjectCard
  taskStatusChange = output<{ taskId: number; status: TaskStatus }>();

  private users = signal<User[]>([]);

  constructor() {
    this.userService.getUsers().subscribe(users => this.users.set(users));
  }

  getAssigneeName(assigneeId?: number): string {
    if (assigneeId === undefined) return 'Non assignée';
    return this.users().find(u => u.id === assigneeId)?.name ?? 'Inconnu';
  }

  // NEW: called when a TaskItem emits
  onStatusChange(taskId: number, status: TaskStatus) {
    this.taskStatusChange.emit({ taskId, status });
  }
}