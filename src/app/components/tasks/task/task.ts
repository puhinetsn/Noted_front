import { Component, input } from '@angular/core';
import { Task } from '../../../models/task.type';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-task',
  imports: [DatePipe],
  templateUrl: './task.html',
  styleUrl: './task.scss',
})
export class TaskTicket {
  task = input.required<Task>();
}
