export interface Task {
  id: number;
  name: string;
  description: string;
  project_id: number;
  created_at: Date;
  status_id: number;
  last_update: Date;
  priority: TaskPriority;
  begin_date: Date | null;
  end_date: Date | null;
  ChangeLog: [TaskChange];
}

export interface TaskChange {
  created_at: Date;
  task_id: number;
  old_field_value: string;
  new_field_value: string;
  changed_field: keyof TaskFields;
}

export interface TaskFields {
  name: string;
  description: string;
  project_id: number;
  status_id: number;
  priority: TaskPriority;
  begin_date: Date | null;
  end_date: Date | null;
}

export enum TaskPriority {
  LOW = 'LOW',
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  CRITICAL = 'CRITICAL',
}
