import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

// Páginas / componentes del To-Do
import { HomeComponent } from './pages/home/home.component';
import { TaskListComponent } from './pages/tasks/task-list/task-list.component';
import { TaskDetailComponent } from './pages/tasks/task-detail/task-detail.component';
import { TaskFormComponent } from './pages/tasks/task-form/task-form.component';

// Navbar (opcional pero recomendado)
import { NavbarComponent } from './core/navbar/navbar.component';

// Routing estilo clase
import { routing, appRoutingProviders } from './app.routing';
import { Navbar } from './navbar/navbar';
import { Home } from './home/home';
import { Tasks } from './tasks/tasks';
import { TaskDetail } from './task-detail/task-detail';
import { TaskForm } from './task-form/task-form';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    TaskListComponent,
    TaskDetailComponent,
    TaskFormComponent,
    Navbar,
    Home,
    Tasks,
    TaskDetail,
    TaskForm
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    routing
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
