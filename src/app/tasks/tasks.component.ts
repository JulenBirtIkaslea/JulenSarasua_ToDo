import { Component, OnInit } from '@angular/core';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  standalone: false,
  providers: [TasksService]
})
export class TasksComponent implements OnInit {

  public tasks: any[] = [];
  public loading: boolean = true;
  public errorMsg: string = '';

  constructor(
    private _tasksService: TasksService
  ) {}

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.loading = true;
    this.errorMsg = '';

    this._tasksService.Read().subscribe({
      next: (data) => {
        this.tasks = data;
        this.loading = false;
        console.log('TASKS:', this.tasks);
      },
      error: (error) => {
        this.loading = false;
        this.errorMsg = 'Error al cargar las tareas';
        console.log('Read Error', error);
      }
    });
  }

  deleteTask(id: string): void {
    if (!confirm('¿Seguro que quieres borrar esta tarea?')) return;

    this._tasksService.Delete(id).subscribe({
      next: (data) => {
        console.log('Delete', data);
        this.getTasks();
      },
      error: (error) => {
        console.log('Delete Error', error);
      }
    });
  }
}
