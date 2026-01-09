import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Route } from '@angular/router';

// Componentes (los crearemos luego)
import { HomeComponent } from './pages/home/home.component';
import { TaskListComponent } from './pages/tasks/task-list/task-list.component';
import { TaskDetailComponent } from './pages/tasks/task-detail/task-detail.component';
import { TaskFormComponent } from './pages/tasks/task-form/task-form.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tasks', component: TaskListComponent },
  { path: 'tasks/new', component: TaskFormComponent },
  { path: 'tasks/:id', component: TaskDetailComponent },
  { path: 'tasks/:id/edit', component: TaskFormComponent },
  { path: '**', component: HomeComponent }
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders<Route> =
  RouterModule.forRoot(appRoutes);
