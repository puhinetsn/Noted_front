import { Component, inject, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ProjectsService } from '../../../services/projects';
import { NewProjectModal } from '../new-project-modal/new-project-modal';
import { MatChipsModule } from '@angular/material/chips';
import { NgTemplateOutlet } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Project } from '../../../models/project.type';

@Component({
  selector: 'app-projects',
  imports: [MatIconModule],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  project = input.required<Project>();
  projectRemoved = output<void>();
  readonly dialog = inject(MatDialog);
  projectService = inject(ProjectsService);

  removeProject() {
    this.projectRemoved.emit();
  }

  openDialog() {
    const dialogRef = this.dialog.open(NewProjectModal, {
      data: this.project(),
      panelClass: 'main-dialog',
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result) {
        this.projectService
          .findAndUpdateProject(this.project().id, {
            name: result,
          })
          .subscribe(() => {
            this.project().name = result;
          });
      }
    });
  }
}
