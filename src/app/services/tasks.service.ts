import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TasksService {
  public url: string;

  constructor(public _http: HttpClient) {
    this.url = 'https://69613938e7aa517cb7986633.mockapi.io/tasks';
  }

  Read(): Observable<any> {
    return this._http.get(this.url);
  }

  ReadById(id: string): Observable<any> {
    return this._http.get(this.url + '/' + id);
  }

  Create(task: any): Observable<any> {
    return this._http.post<any>(this.url, task);
  }

  Update(id: string, task: any): Observable<any> {
    return this._http.put<any>(this.url + '/' + id, task);
  }

  Delete(id: string): Observable<any> {
    return this._http.delete<any>(this.url + '/' + id);
  }
}
