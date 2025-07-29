import { Component, inject, input, output } from '@angular/core';
import { TaskTicket } from '../task/task';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskModal } from '../create-task-modal/create-task-modal';
import { TaskFields, Task } from '../../../models/task.type';

export type CreateTaskFormData = Omit<TaskFields, 'status_id' | 'project_id'>;

@Component({
  selector: 'app-tasks-list',
  imports: [TaskTicket, MatIconModule],
  templateUrl: './tasks-list.html',
  styleUrl: './tasks-list.scss',
})
export class TasksList {
  readonly dialog = inject(MatDialog);
  saveTask = output<CreateTaskFormData>();
  tasks = input.required<Task[]>();

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateTaskModal, {
      panelClass: 'main-dialog',
    });

    dialogRef.afterClosed().subscribe((result: CreateTaskFormData) => {
      if (result) {
        console.log(result);
        this.saveTask.emit(result);
      }
    });
  }
}
