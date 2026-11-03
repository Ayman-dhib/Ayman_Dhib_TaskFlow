import { Observable, of } from 'rxjs';
import { Project } from '../../features/projects/models/project.model';
import { PROJECTS } from '../../features/projects/data/projects.data';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import {  catchError, finalize, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  projects: Project[] = [ /* ... */ ];
  readonly id = Math.random().toString(36).substring(2, 8);
  private http = inject(HttpClient);
  private url = 'http://localhost:3000/projects';
  loading = signal(false);
  error = signal<string | null>(null);
  
    constructor() {
    console.log('ProjectService créé, id =', this.id);
  }


 getProjects(): Observable<Project[]> {
    this.loading.set(true);
    this.error.set(null);

    return this.http.get<Project[]>(this.url).pipe(
      catchError(err => {
        this.error.set('Impossible de charger les projets.');
        return throwError(() => err);
      }),
      finalize(() => this.loading.set(false))
    );
  }

  getProject(id: number): Observable<Project> {
    this.loading.set(true);
    this.error.set(null);

    return this.http.get<Project>(`${this.url}/${id}`).pipe(
      catchError(err => {
        this.error.set('Projet introuvable.');
        return throwError(() => err);
      }),
      finalize(() => this.loading.set(false))
    );
  }

  deleteProject(id: number): Observable<void> {
    this.error.set(null);

    return this.http.delete<void>(`${this.url}/${id}`).pipe(
      catchError(err => {
        this.error.set('La suppression a échoué.');
        return throwError(() => err);
      })
    );
  }
}