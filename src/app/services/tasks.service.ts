import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TasksService {

  public url: string;

  constructor(public _http: HttpClient) {
    // Pega aquí tu endpoint de MockAPI (recurso tasks)
    // Ejemplo: https://xxxxx.mockapi.io/tasks
    this.url = 'https://TU-ENDPOINT.mockapi.io/tasks';
  }

  // READ (All)
  Read(): Observable<any> {
    return this._http.get(this.url);
  }

  // READ (ById)
  ReadById(id: string): Observable<any> {
    return this._http.get(this.url + '/' + id);
  }

  // CREATE (POST)
  Create(task: any): Observable<any> {
    return this._http.post<any>(this.url, task);
  }

  // UPDATE (PUT)
  Update(id: string, task: any): Observable<any> {
    return this._http.put<any>(this.url + '/' + id, task);
  }

  // DELETE
  Delete(id: string): Observable<any> {
    return this._http.delete<any>(this.url + '/' + id);
  }
}
