import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.html',
  styleUrls: ['./task-detail.css'],
  standalone: false,
  providers: [TasksService]
})
export class TaskDetailComponent implements OnInit {

  public id: string = '';
  public task: any = null;

  public loading: boolean = true;
  public errorMsg: string = '';

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _tasksService: TasksService,
    private _cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this._route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.getTaskById();
    });
  }

  getTaskById(): void {
    this.loading = true;
    this.errorMsg = '';
    this.task = null;

    this._tasksService.ReadById(this.id).subscribe({
      next: (data) => {
        this.task = data;
        this.loading = false;
        console.log('TASK DETAIL:', this.task);
        this._cdr.detectChanges();
      },
      error: (error) => {
        this.loading = false;
        this.errorMsg = 'Error al cargar la tarea';
        console.log('ReadById Error', error);
        this._cdr.detectChanges();
      }
    });
  }

  deleteTask(): void {
    if (!confirm('¿Seguro que quieres borrar esta tarea?')) return;

    this._tasksService.Delete(this.id).subscribe({
      next: (data) => {
        console.log('Delete OK', data);
        this._router.navigate(['/tasks']);
      },
      error: (error) => {
        console.log('Delete Error', error);
      }
    });
  }
}
