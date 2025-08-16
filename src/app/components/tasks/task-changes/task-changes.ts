import { Component, input } from '@angular/core';
import { TaskChange } from '../../../models/task.type';
import { DatePipe, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-task-changes',
  imports: [DatePipe, UpperCasePipe],
  templateUrl: './task-changes.html',
  styleUrl: './task-changes.scss',
})
export class TaskChanges {
  change = input.required<TaskChange>();
}
