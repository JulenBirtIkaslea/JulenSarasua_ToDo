import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { TasksService } from '../services/tasks.service';
import { Task } from '../models/Task';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.html',
  styleUrls: ['./task-form.css'],
  standalone: false,
  providers: [TasksService]
})
export class TaskFormComponent implements OnInit {

  public task: Task;
  public id: string = '';
  public editMode: boolean = false;

  public loading: boolean = false;
  public errorMsg: string = '';

  constructor(
    private _tasksService: TasksService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _cdr: ChangeDetectorRef
  ) {
    // Modelo inicial (como en clase)
    this.task = new Task('', false);
  }

  ngOnInit(): void {
    // Si viene id en la ruta, estamos editando
    this._route.params.subscribe((params: Params) => {
      if (params['id']) {
        this.id = params['id'];
        this.editMode = true;
        this.loadTaskForEdit();
      } else {
        this.editMode = false;
      }
    });
  }

  loadTaskForEdit(): void {
    this.loading = true;
    this.errorMsg = '';

    this._tasksService.ReadById(this.id).subscribe({
      next: (data) => {
        // Rellenamos el modelo con lo que viene de API
        this.task = new Task(data.title, data.completed);
        this.loading = false;
        console.log('EDIT TASK:', data);
        this._cdr.detectChanges();
      },
      error: (error) => {
        this.loading = false;
        this.errorMsg = 'Error al cargar la tarea para editar';
        console.log('ReadById Error', error);
        this._cdr.detectChanges();
      }
    });
  }

  onSubmit(form: any): void {
    if (form.invalid) return;

    this.loading = true;
    this.errorMsg = '';

    if (this.editMode) {
      // UPDATE
      this._tasksService.Update(this.id, this.task).subscribe({
        next: (data) => {
          this.loading = false;
          console.log('Update OK', data);
          this._router.navigate(['/tasks']);
        },
        error: (error) => {
          this.loading = false;
          this.errorMsg = 'Error al actualizar la tarea';
          console.log('Update Error', error);
        }
      });
    } else {
      // CREATE
      this._tasksService.Create(this.task).subscribe({
        next: (data) => {
          this.loading = false;
          console.log('Create OK', data);
          this._router.navigate(['/tasks']);
        },
        error: (error) => {
          this.loading = false;
          this.errorMsg = 'Error al crear la tarea';
          console.log('Create Error', error);
        }
      });
    }
  }
}
