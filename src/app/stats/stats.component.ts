import { Component, OnInit } from '@angular/core';
import { TasksService } from '../services/tasks.service';


@Component({
  selector: 'app-stats',
  templateUrl: './stats.html',
  styleUrls: ['./stats.css'],
  standalone: false,
  providers: [TasksService]
})
export class StatsComponent implements OnInit {

  public tasks: any[] = [];

  public total: number = 0;
  public completed: number = 0;
  public pending: number = 0;
  public percentCompleted: number = 0;

  public loading: boolean = true;
  public errorMsg: string = '';

  constructor(
    private _tasksService: TasksService
  ) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.loading = true;
    this.errorMsg = '';

    this._tasksService.Read().subscribe({
      next: (data) => {
        this.tasks = data;

        this.total = this.tasks.length;
        this.completed = this.tasks.filter(t => t.completed).length;
        this.pending = this.total - this.completed;

        if (this.total > 0) {
          this.percentCompleted = Math.round((this.completed / this.total) * 100);
        } else {
          this.percentCompleted = 0;
        }

        this.loading = false;

        console.log('STATS:', {
          total: this.total,
          completed: this.completed,
          pending: this.pending,
          percent: this.percentCompleted
        });
      },
      error: (error) => {
        this.loading = false;
        this.errorMsg = 'Error al cargar estadísticas';
        console.log('Stats Error', error);
      }
    });
  }
}
