import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProjectFields, Project } from '../models/project.type';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private httpClient = inject(HttpClient);
  private url = 'http://localhost:1337/api';

  getProjects(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(`${this.url}/projects`);
  }

  createProject(info: ProjectFields): Observable<Project> {
    return this.httpClient.post<Project>(`${this.url}/projects`, info);
  }
}
