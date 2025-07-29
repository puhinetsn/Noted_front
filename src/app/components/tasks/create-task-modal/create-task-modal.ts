import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { TaskFields, TaskPriority } from '../../../models/task.type';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

interface PrioritySelectOption {
  value: TaskPriority;
  name: string;
  color: string;
}

@Component({
  selector: 'app-create-task-modal',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    ReactiveFormsModule,
    MatIconModule,
    MatDatepickerModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './create-task-modal.html',
  styleUrl: './create-task-modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTaskModal {
  readonly dialogRef = inject(MatDialogRef<CreateTaskModal>);
  task = new FormGroup({
    name: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(60)],
    }),
    description: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.maxLength(120)],
    }),
    priority: new FormControl<TaskPriority | null>(TaskPriority.MEDIUM, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    begin_date: new FormControl<Date | null>(null),
    end_date: new FormControl<Date | null>(null),
  });

  prioritySelectOptions: PrioritySelectOption[] = [
    {
      value: TaskPriority.LOW,
      name: 'Low',
      color: 'low_priority',
    },
    {
      value: TaskPriority.MEDIUM,
      name: 'Medium',
      color: 'medium_priority',
    },
    {
      value: TaskPriority.HIGH,
      name: 'High',
      color: 'high_priority',
    },
    {
      value: TaskPriority.CRITICAL,
      name: 'Critical',
      color: 'critical_priority',
    },
  ];

  selectedPriority = this.prioritySelectOptions[1].value;

  onClose(): void {
    this.dialogRef.close();
  }

  onCreate(): void {
    this.dialogRef.close(this.task.value);
  }
}
