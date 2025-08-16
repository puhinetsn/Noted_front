import { Component, inject, input, output } from '@angular/core';
import { Task } from '../../../models/task.type';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TaskService } from '../../../services/task';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskModal } from '../create-task-modal/create-task-modal';

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
  taskUpdated = output<Task>();
  readonly dialog = inject(MatDialog);

  removeTask() {
    this.tasksService.removeTask(this.task().id).subscribe(() => {
      this.taskRemoved.emit();
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(CreateTaskModal, {
      data: this.task(),
      panelClass: 'main-dialog',
    });

    dialogRef.afterClosed().subscribe((result: Task) => {
      if (result) {
        this.tasksService
          .findAndUpdateTask(this.task().id, {
            ...result,
          })
          .subscribe((result) => {
            this.taskUpdated.emit(result);
          });
      }
    });
  }
}
