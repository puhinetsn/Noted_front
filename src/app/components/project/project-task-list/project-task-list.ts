import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { StatusTasks } from '../../statuses/status-tasks/status-tasks';
import { AddStatus } from '../../statuses/add-status/add-status';
import { Status } from '../../../models/status.type';
import { StatusesService } from '../../../services/statuses';
import { ActivatedRoute } from '@angular/router';
import { CreateStatus } from '../../statuses/create-status/create-status';

@Component({
  selector: 'app-project-task-list',
  imports: [StatusTasks, AddStatus, CreateStatus],
  templateUrl: './project-task-list.html',
  styleUrl: './project-task-list.scss',
})
export class ProjectTaskList implements OnInit {
  statuses = signal<Status[] | undefined>(undefined);
  private destroyRef = inject(DestroyRef);
  private statusesService = inject(StatusesService);
  private activatedRoute = inject(ActivatedRoute);
  newStatusCreation = signal(false);
  projectId = '';

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
    const subsc = this.statusesService.getStatuses(id).subscribe({
      next: (statuses) => {
        this.statuses.set(statuses);
      },
    });
    this.destroyRef.onDestroy(() => {
      subsc.unsubscribe();
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

  addNewStatus() {
    this.newStatusCreation.set(true);
  }
}
