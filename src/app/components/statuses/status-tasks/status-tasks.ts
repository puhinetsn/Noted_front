import { Component, input } from '@angular/core';
import { StatusChip } from '../status-chip/status-chip';
import { TasksList } from '../../tasks/tasks-list/tasks-list';
import { Status } from '../../../models/status.type';

@Component({
  selector: 'app-status-tasks',
  imports: [StatusChip, TasksList],
  templateUrl: './status-tasks.html',
  styleUrl: './status-tasks.scss',
})
export class StatusTasks {
  status = input.required<Status>();
}
