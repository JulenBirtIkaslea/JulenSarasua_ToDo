import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { StatsComponent } from './stats/stats.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },

  { path: 'tasks', component: TasksComponent },
  { path: 'tasks/new', component: TaskFormComponent },
  { path: 'tasks/:id', component: TaskDetailComponent },
  { path: 'tasks/:id/edit', component: TaskFormComponent },

  { path: 'stats', component: StatsComponent },

  { path: '**', redirectTo: '' }
];

export const appRoutingProviders: any[] = [];
export const routing = RouterModule.forRoot(appRoutes);
