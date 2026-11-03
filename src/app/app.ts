import { Component, signal, inject } from '@angular/core';
import { ViewToggle, ViewMode } from './shared/components/view-toggle/view-toggle';
import { ProjectList } from './features/projects/components/project-list/project-list';
import { UserList } from './features/users/components/user-list/user-list';
import { FavoritesService } from './core/services/favorites.service';
import { RecentProjectsService } from './core/services/recent-projects.service';
import { ThemeService } from './core/services/theme.service';
import { NotificationService } from './core/services/notification.service';




@Component({
  selector: 'app-root',
  imports: [ViewToggle, ProjectList, UserList],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  currentView = signal<ViewMode>('task');
  favorites = inject(FavoritesService);
  recentService = inject(RecentProjectsService);
  theme = inject(ThemeService);
  notification = inject(NotificationService);
 
}