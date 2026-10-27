import { Component, computed, input, output } from '@angular/core';   // + output
import { Project, ProjectStatus } from '../../models/project.model';
import { TaskStatus } from '../../models/task.model';                 // NEW import
import { TaskList } from '../task-list/task-list';
import {
  UpperCasePipe, DatePipe, CurrencyPipe, PercentPipe,
  DecimalPipe, SlicePipe, KeyValuePipe,
} from '@angular/common';

@Component({
  selector: 'app-project-card',
  imports: [
    TaskList,
    UpperCasePipe, DatePipe, CurrencyPipe, PercentPipe,
    DecimalPipe, SlicePipe, KeyValuePipe,
  ],
  templateUrl: './project-card.html',
  styleUrl: './project-card.css',
})
export class ProjectCard {
  project = input.required<Project>();

  // NEW: event going up to ProjectList, with the projectId added
  taskStatusChange = output<{ projectId: number; taskId: number; status: TaskStatus }>();

  statusClasses: Record<ProjectStatus, string> = {
    'En attente': 'bg-slate-100 text-slate-700',
    'En cours': 'bg-blue-100 text-blue-700',
    'Terminé': 'bg-green-100 text-green-700',
  };

  doneCount = computed(
    () => this.project().tasks.filter(t => t.status === 'Terminé').length
  );

  progress = computed(() => {
    const total = this.project().tasks.length;
    return total === 0 ? 0 : Math.round((this.doneCount() / total) * 100);
  });

  completionRate = computed(() => {
    const total = this.project().tasks.length;
    return total > 0 ? this.doneCount() / total : 0;
  });

  averageCost = computed(() => {
    const total = this.project().tasks.length;
    return total > 0 ? this.project().budget / total : 0;
  });

  tasksByPriority = computed(() => {
    const result: Record<string, number> = { Basse: 0, Haute: 0, Moyenne: 0 };
    for (const t of this.project().tasks) result[t.priority]++;
    return result;
  });

  // NEW: receives { taskId, status } from TaskList and adds the projectId
  onTaskStatusChange(event: { taskId: number; status: TaskStatus }) {
    this.taskStatusChange.emit({
      projectId: this.project().id,
      ...event,
    });
  }
}