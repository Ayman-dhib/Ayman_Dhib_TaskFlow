import { Component, computed, input, output } from '@angular/core';
import { NgClass, NgStyle, TitleCasePipe, LowerCasePipe } from '@angular/common';
import { User } from '../../models/user.model';
import { Project } from '../../../projects/models/project.model';
import { Task } from '../../../projects/models/task.model';
import { UserProjectGroup } from '../user-project-group/user-project-group';
import { InitialsPipe } from '../../../../shared/components/pipes/InitialsPipe';
import { HighlightDirective } from '../../../../shared/directives/highlight.directive';

interface ProjectTasks {
  projectId: number;
  projectName: string;
  tasks: Task[];
}

@Component({
  selector: 'app-user-card',
  imports: [
    UserProjectGroup,
    TitleCasePipe,
    LowerCasePipe,
    InitialsPipe,
    NgClass,
    NgStyle,
    HighlightDirective,
  ],
  templateUrl: './user-card.html',
  styleUrl: './user-card.css',
})
export class UserCard {
  user = input.required<User>();
  projects = input.required<Project[]>();

  userSelected = output<User>();

  // role -> color map (question 4)
  roleColors: Record<string, string> = {
    admin: '#ef4444',
    developer: '#3b82f6',
    designer: '#a855f7',
  };

  groups = computed<ProjectTasks[]>(() =>
    this.projects()
      .map(p => ({
        projectId: p.id,
        projectName: p.name,
        tasks: p.tasks.filter(t => t.assigneeId === this.user().id),
      }))
      .filter(g => g.tasks.length > 0)
  );

  private allTasks = computed(() => this.groups().flatMap(g => g.tasks));

  todoCount = computed(() => this.allTasks().filter(t => t.status === 'En attente').length);
  inProgressCount = computed(() => this.allTasks().filter(t => t.status === 'En cours').length);
  doneCount = computed(() => this.allTasks().filter(t => t.status === 'Terminé').length);

  selectUser(): void {
    this.userSelected.emit(this.user());
  }
}