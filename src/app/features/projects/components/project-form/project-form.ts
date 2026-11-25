import { Component, computed, effect, input, output } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Project, ProjectStatus } from '../../models/project.model';

// Same as Project, but allows empty values while the form is being filled in
type ProjectDraft = Omit<Project, 'status' | 'budget'> & {
  status: ProjectStatus | '';
  budget: number | null;
};

@Component({
  selector: 'app-project-form',
  imports: [FormsModule, JsonPipe],
  templateUrl: './project-form.html',
  styleUrl: './project-form.css',
})
export class ProjectForm {
  // ---- Communication with the parent ----
  projectToEdit = input<Project | null>(null);   // project received (edit mode)
  projectSaved  = output<Project>();             // validated data sent to the parent
  cancelled     = output<void>();

  isEditMode = computed(() => this.projectToEdit() !== null);

  statuts: ProjectStatus[] = ['En attente', 'En cours', 'Terminé'];

  project: ProjectDraft = this.emptyProject();

  constructor() {
    // Re-runs every time the parent changes projectToEdit
    effect(() => {
      const p = this.projectToEdit();
      this.project = p ? { ...p, tasks: [...p.tasks] } : this.emptyProject();
    });
  }

  // ---- Submission ----
  onSubmit(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    const data: Project = {
      ...this.project,
      status: this.project.status as ProjectStatus,
      budget: Number(this.project.budget),
    };

    console.log(this.isEditMode() ? 'Projet modifié :' : 'Projet ajouté :', data);
    console.log('Valeur groupée (ngModelGroup) :', form.value);

    this.projectSaved.emit(data);

    form.resetForm();
    this.project = this.emptyProject();
  }

  onCancel(form: NgForm) {
    form.resetForm();
    this.project = this.emptyProject();
    this.cancelled.emit();
  }

  private emptyProject(): ProjectDraft {
    return {
      id: 0,            // 0 = new project; the parent assigns the real id
      name: '',
      description: '',
      status: '',
      tasks: [],
      startDate: '',
      budget: null,
    };
  }
}