import { Injectable, signal } from '@angular/core';
import { Project } from '../../features/projects/models/project.model';

@Injectable({ providedIn: 'root' })
export class RecentProjectsService {
  recent = signal<Project[]>([]);

  add(project: Project): void {
    this.recent.update(list =>
      [project, ...list.filter(p => p.id !== project.id)].slice(0, 5)
    );
  }
}