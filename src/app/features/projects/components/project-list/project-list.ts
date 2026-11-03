import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Project } from '../../models/project.model';
import { TaskStatus } from '../../models/task.model';                 // NEW import
import { ProjectCard } from '../project-card/project-card';
import { ProjectService } from '../../../../core/services/project.service';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({
  selector: 'app-project-list',
  imports: [ProjectCard, FormsModule],
  templateUrl: './project-list.html',
  styleUrl: './project-list.css',
})
export class ProjectList implements OnInit {
  private projectService = inject(ProjectService);
  private notification = inject ( NotificationService)

   constructor() {
    console.log('ProjectList → ProjectService id =', this.projectService.id);
  }


  projects = signal<Project[]>([]);
  searchTerm = signal('');

  filteredProjects = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    return this.projects().filter(p => p.name.toLowerCase().includes(term));
  });

  ngOnInit(): void {
    this.projectService.getProjects().subscribe(projects => {
      this.projects.set(projects);
    });
  }

  addProject(): void {
    this.projects.update(list => {
      const nextId = list.length ? Math.max(...list.map(p => p.id)) + 1 : 1;
      return [
        {
          id: nextId,
          name: `Projet ${nextId}`,
          description: 'Nouveau projet',
          status: 'En attente',
          tasks: [],
          startDate: new Date().toISOString().slice(0, 10),
          budget: 0,
        },
        ...list,
      ];
    });
    this.searchTerm.set('');
    this.notification.show ('Project added !!!')
  }


onTaskStatusChange(event: { projectId: number; taskId: number; status: TaskStatus }) {
  this.projects.update(list =>
    list.map(project =>
      project.id !== event.projectId
        ? project                                   // untouched project: same object
        : {
            ...project,                             // NEW project object
            tasks: project.tasks.map(task =>
              task.id !== event.taskId
                ? task                              // untouched task: same object
                : { ...task, status: event.status } // NEW task object
            ),
          }
    )
  );
}
}