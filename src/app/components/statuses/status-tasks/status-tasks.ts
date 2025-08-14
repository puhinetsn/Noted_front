import { Component, input, output } from '@angular/core';
import { StatusChip } from '../status-chip/status-chip';
import {
  CreateTaskFormData,
  TasksList,
} from '../../tasks/tasks-list/tasks-list';
import { Status } from '../../../models/status.type';
import { Task, TaskFields } from '../../../models/task.type';
export type CreateStatusTask = Omit<TaskFields, 'project_id'>;
@Component({
  selector: 'app-status-tasks',
  imports: [StatusChip, TasksList],
  templateUrl: './status-tasks.html',
  styleUrl: './status-tasks.scss',
})
export class StatusTasks {
  status = input.required<Status>();
  saveTask = output<CreateStatusTask>();
  tasks = input.required<Task[]>();
  statuses = input.required<Status[]>();

  onSaveTask(info: CreateTaskFormData) {
    const task: CreateStatusTask = {
      ...info,
      status_id: this.status().id,
    };

    console.log(task);
    this.saveTask.emit(task);
  }
}
