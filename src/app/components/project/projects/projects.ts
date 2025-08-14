import { Component, inject, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ProjectsService } from '../../../services/projects';

@Component({
  selector: 'app-projects',
  imports: [MatIconModule],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  project_name = input.required<string>();
  projectRemoved = output<void>();

  removeProject() {
    this.projectRemoved.emit();
  }
}
