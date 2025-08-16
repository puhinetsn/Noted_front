import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Status, StatusFields } from '../models/status.type';

@Injectable({
  providedIn: 'root',
})
export class StatusesService {
  private httpClient = inject(HttpClient);
  private url = 'http://localhost:1337/api';
  getStatuses(id: string): Observable<Status[]> {
    return this.httpClient.get<Status[]>(`${this.url}/statuses/projects/${id}`);
  }

  createStatus(info: StatusFields): Observable<Status> {
    return this.httpClient.post<Status>(`${this.url}/statuses`, info);
  }
}
