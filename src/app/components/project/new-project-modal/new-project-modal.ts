import { Component, inject, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

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
  ],
  templateUrl: './new-project-modal.html',
  styleUrl: './new-project-modal.scss',
})
export class NewProjectModal {
  readonly dialogRef = inject(MatDialogRef<NewProjectModal>);
  name = signal<string>('');

  onClose(): void {
    this.dialogRef.close();
  }

  onCreate(): void {
    this.dialogRef.close(this.name());
  }
}
