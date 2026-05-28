import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },

  // Auth — lazy loaded
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES),
  },

  // Tasks — lazy loaded + protegidas
  {
    path: 'tasks',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./tasks/task-list/task-list.component').then(m => m.TaskListComponent),
  },
  {
    path: 'tasks/new',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./tasks/task-form/task-form.component').then(m => m.TaskFormComponent),
  },
  {
    path: 'tasks/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./tasks/task-detail/task-detail.component').then(m => m.TaskDetailComponent),
  },
  {
    path: 'tasks/:id/edit',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./tasks/task-form/task-form.component').then(m => m.TaskFormComponent),
  },

  { path: '**', redirectTo: 'tasks' },
];