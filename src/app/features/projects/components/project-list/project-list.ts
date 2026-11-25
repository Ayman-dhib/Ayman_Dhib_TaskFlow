import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Project } from '../../models/project.model';
import { TaskStatus } from '../../models/task.model';
import { ProjectCard } from '../project-card/project-card';
import { ProjectForm } from '../project-form/project-form';
import { ProjectService } from '../../../../core/services/project.service';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({
  selector: 'app-project-list',
  imports: [ProjectCard, FormsModule, ProjectForm],
  templateUrl: './project-list.html',
  styleUrl: './project-list.css',
})
export class ProjectList implements OnInit {
  private projectService = inject(ProjectService);
  private notification = inject(NotificationService);

  projects = signal<Project[]>([]);
  searchTerm = signal('');
  selectedProject = signal<Project | null>(null);
  showForm = signal(false);

  filteredProjects = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    return this.projects().filter(p => p.name.toLowerCase().includes(term));
  });

  constructor() {
    console.log('ProjectList → ProjectService id =', this.projectService.id);
  }

  ngOnInit(): void {
    this.projectService.getProjects().subscribe(projects => {
      this.projects.set(projects);
    });
  }

  // ---- Form: creation / editing ----
  openCreate(): void {
    this.selectedProject.set(null);
    this.showForm.update(v => !v);
  }

  onEdit(project: Project): void {
    this.selectedProject.set(project);
    this.showForm.set(true);
  }

  onSave(project: Project): void {
    if (project.id) {
      // modification
      this.projects.update(list => list.map(p => (p.id === project.id ? project : p)));
      this.notification.show('Projet modifié !');
    } else {
      // création
      this.projects.update(list => {
        const nextId = list.length ? Math.max(...list.map(p => p.id)) + 1 : 1;
        return [{ ...project, id: nextId }, ...list];
      });
      this.searchTerm.set('');
      this.notification.show('Projet ajouté !');
    }
    this.closeForm();
  }

  closeForm(): void {
    this.selectedProject.set(null);
    this.showForm.set(false);
  }

  // ---- Tasks ----
  onTaskStatusChange(event: { projectId: number; taskId: number; status: TaskStatus }) {
    this.projects.update(list =>
      list.map(project =>
        project.id !== event.projectId
          ? project
          : {
              ...project,
              tasks: project.tasks.map(task =>
                task.id !== event.taskId ? task : { ...task, status: event.status }
              ),
            }
      )
    );
  }
}