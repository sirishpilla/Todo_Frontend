export interface Task {
  id: number;
  title: string;
  color: string;
  completed: boolean;
}

export type CreateTaskInput = Omit<Task, 'id' | 'completed'>;
export type UpdateTaskInput = Partial<Omit<Task, 'id'>>;