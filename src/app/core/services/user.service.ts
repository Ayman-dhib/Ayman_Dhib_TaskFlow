import { Observable, of } from 'rxjs';
import { User } from '../../features/users/models/user.model';
import { USERS } from '../../features/users/data/users.data';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import {  catchError, finalize, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {

    readonly id = Math.random().toString(36).substring(2, 8);
    private http = inject(HttpClient);
    private url = "http://localhost:3000/users";
    loading = signal(false);
    error = signal<string | null>(null);

    constructor() {
    console.log('UserService créé, id =', this.id);
  }
   getUsers(): Observable<User[]> {
      this.loading.set(true);
      this.error.set(null);
  
      return this.http.get<User[]>(this.url).pipe(
        catchError(err => {
          this.error.set('Impossible de charger les utilisateurs.');
          return throwError(() => err);
        }),
        finalize(() => this.loading.set(false))
      );
    }
  
    getUser(id: number): Observable<User> {
      this.loading.set(true);
      this.error.set(null);
  
      return this.http.get<User>(`${this.url}/${id}`).pipe(
        catchError(err => {
          this.error.set('Utilisateur introuvable.');
          return throwError(() => err);
        }),
        finalize(() => this.loading.set(false))
      );
    }
  
}