import { Component, inject, input, output } from '@angular/core';
import { TaskTicket } from '../task/task';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskModal } from '../create-task-modal/create-task-modal';
import { TaskFields, Task } from '../../../models/task.type';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
} from '@angular/cdk/drag-drop';
import { Status } from '../../../models/status.type';
import { TaskService } from '../../../services/task';

export type CreateTaskFormData = Omit<TaskFields, 'status_id' | 'project_id'>;

@Component({
  selector: 'app-tasks-list',
  imports: [TaskTicket, MatIconModule, CdkDropListGroup, CdkDropList, CdkDrag],
  templateUrl: './tasks-list.html',
  styleUrl: './tasks-list.scss',
})
export class TasksList {
  readonly dialog = inject(MatDialog);
  saveTask = output<CreateTaskFormData>();
  tasks = input.required<Task[]>();
  status = input.required<number>();
  statuses = input.required<Status[]>();
  tasksService = inject(TaskService);
  taskRemoved = output<number>();
  taskUpdated = output<Task>();

  onTaskDelete(id: number) {
    this.taskRemoved.emit(id);
  }

  createStatusIds() {
    return this.statuses().map((status) => `tasks-${status.id}`);
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

    this.onTaskUpdated(event.container.data[event.currentIndex]);
  }

  onTaskUpdated($event: Task) {
    this.tasksService
      .findAndUpdateTask($event.id, {
        status_id: this.status(),
      })
      .subscribe((result) => {
        this.taskUpdated.emit(result);
      });
  }

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
