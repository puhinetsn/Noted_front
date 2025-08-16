import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Project } from '../../../models/project.type';

@Component({
  selector: 'app-new-project-modal',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    ReactiveFormsModule,
  ],
  templateUrl: './new-project-modal.html',
  styleUrl: './new-project-modal.scss',
})
export class NewProjectModal {
  readonly dialogRef = inject(MatDialogRef<NewProjectModal>);
  data = inject<Project>(MAT_DIALOG_DATA);
  isEditMode = !!this.data;
  projectName = new FormGroup({
    name: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(120)],
    }),
  });

  constructor() {
    if (this.isEditMode && this.data) {
      this.projectName.patchValue({
        name: this.data.name,
      });
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onCreate(): void {
    this.dialogRef.close(this.projectName.value.name);
  }
}
