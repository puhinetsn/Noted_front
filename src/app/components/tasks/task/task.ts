import { Component, inject, input, output } from '@angular/core';
import { Task } from '../../../models/task.type';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TaskService } from '../../../services/task';

@Component({
  selector: 'app-task',
  imports: [DatePipe, MatButtonModule, MatIconModule],
  templateUrl: './task.html',
  styleUrl: './task.scss',
})
export class TaskTicket {
  task = input.required<Task>();
  tasksService = inject(TaskService);
  taskRemoved = output<void>();

  removeTask() {
    this.tasksService.removeTask(this.task().id).subscribe(() => {
      this.taskRemoved.emit();
    });
  }
}
