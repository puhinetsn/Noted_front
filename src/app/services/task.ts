import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task, TaskFields } from '../models/task.type';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private httpClient = inject(HttpClient);
  private url = 'http://localhost:1337/api';

  getTasks(id: string): Observable<Task[]> {
    return this.httpClient.get<Task[]>(`${this.url}/tasks/projects/${id}`);
  }

  createTask(info: TaskFields): Observable<Task> {
    return this.httpClient.post<Task>(`${this.url}/tasks`, info);
  }
}
