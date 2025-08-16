import {
  Component,
  DestroyRef,
  inject,
  model,
  OnInit,
  signal,
} from '@angular/core';
import { Projects } from '../projects/projects';
import { NewProject } from '../new-project/new-project';
import { Project } from '../../../models/project.type';
import { ProjectsService } from '../../../services/projects';
import { MatDialog } from '@angular/material/dialog';
import { NewProjectModal } from '../new-project-modal/new-project-modal';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-project-list',
  imports: [Projects, NewProject, RouterLink],
  templateUrl: './project-list.html',
  styleUrl: './project-list.scss',
})
export class ProjectList implements OnInit {
  projects = signal<Project[] | undefined>(undefined);
  private destroyRef = inject(DestroyRef);
  private projectsService = inject(ProjectsService);

  ngOnInit(): void {
    const subsc = this.projectsService.getProjects().subscribe({
      next: (projects) => {
        this.projects.set(projects);
      },
    });
    this.destroyRef.onDestroy(() => {
      subsc.unsubscribe();
    });
  }

  readonly dialog = inject(MatDialog);

  openDialog(): void {
    const dialogRef = this.dialog.open(NewProjectModal, {
      panelClass: 'main-dialog',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.createProject(result);
      }
    });
  }

  onProjectDelete(id: number) {
    this.projectsService.removeProject(id).subscribe(() => {
      this.projects.update((projects) =>
        projects ? projects.filter((p) => p.id !== id) : []
      );
    });
  }

  projectLink(project: Project): string {
    return `${project.id}`;
  }

  private createProject(name: string) {
    this.projectsService
      .createProject({ name })
      .subscribe((project) =>
        this.projects.update((projects) =>
          projects ? [...projects, project] : [project]
        )
      );
  }
}
