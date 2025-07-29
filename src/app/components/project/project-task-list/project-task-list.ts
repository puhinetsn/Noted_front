import {
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import {
  CreateStatusTask,
  StatusTasks,
} from '../../statuses/status-tasks/status-tasks';
import { AddStatus } from '../../statuses/add-status/add-status';
import { Status } from '../../../models/status.type';
import { StatusesService } from '../../../services/statuses';
import { ActivatedRoute } from '@angular/router';
import { CreateStatus } from '../../statuses/create-status/create-status';
import { TaskService } from '../../../services/task';
import { Task } from '../../../models/task.type';

@Component({
  selector: 'app-project-task-list',
  imports: [StatusTasks, AddStatus, CreateStatus],
  templateUrl: './project-task-list.html',
  styleUrl: './project-task-list.scss',
})
export class ProjectTaskList implements OnInit {
  statuses = signal<Status[] | undefined>(undefined);
  tasks = signal<Task[] | undefined>(undefined);
  private destroyRef = inject(DestroyRef);
  private statusesService = inject(StatusesService);
  private activatedRoute = inject(ActivatedRoute);
  private taskService = inject(TaskService);
  newStatusCreation = signal(false);
  projectId = '';

  filteredTasks = computed(() => {
    const statuses = this.statuses();
    const tasks = this.tasks();

    if (!statuses || !tasks) return [];

    const result = [];

    for (let i = 0; i < statuses.length; i++) {
      const status = statuses[i];
      const statusTasks = tasks.filter((task) => task.status_id === status.id);
      result.push({ status, statusTasks });
    }

    return result;
  });

  ngOnInit(): void {
    const subsc = this.activatedRoute.params.subscribe((data) => {
      this.projectId = data['id'];
      this.getStatuses(data['id']);
    });

    this.destroyRef.onDestroy(() => {
      subsc.unsubscribe();
    });
  }

  getStatuses(id: string) {
    const subscStatuses = this.statusesService.getStatuses(id).subscribe({
      next: (statuses) => {
        this.statuses.set(statuses);
      },
    });
    const subscTasks = this.taskService.getTasks(id).subscribe({
      next: (tasks) => {
        this.tasks.set(tasks);
      },
    });
    this.destroyRef.onDestroy(() => {
      subscStatuses.unsubscribe();
      subscTasks.unsubscribe();
    });
  }

  onSaveStatus({ name, color }: { name: string; color: string }) {
    this.newStatusCreation.set(false);
    this.statusesService
      .createStatus({
        status_name: name.toUpperCase(),
        status_color: color,
        project_id: +this.projectId,
      })
      .subscribe((status) =>
        this.statuses.update((statuses) =>
          statuses ? [...statuses, status] : [status]
        )
      );
  }

  onSaveTask(result: CreateStatusTask) {
    this.taskService
      .createTask({
        ...result,
        project_id: +this.projectId,
      })
      .subscribe((task) =>
        this.tasks.update((tasks) => (tasks ? [...tasks, task] : [task]))
      );
  }

  addNewStatus() {
    this.newStatusCreation.set(true);
  }
}
