import { Routes } from '@angular/router';
import { SelectProject } from './components/project/select-project/select-project';
import { ProjectTaskList } from './components/project/project-task-list/project-task-list';

export const routes: Routes = [
  {
    path: '',
    component: SelectProject,
  },
  {
    path: ':id',
    component: ProjectTaskList,
  },
];
