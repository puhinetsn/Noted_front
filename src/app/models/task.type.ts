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
  ChangeLog: [];
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
