export type TaskStatus = 'pendiente' | 'en progreso' | 'completada';
export type TaskPriority = 'baja' | 'media' | 'alta';
export type TaskCategory = 'desarrollo' | 'diseño' | 'documentación' | 'testing' | 'devops' | 'otro';

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  category: TaskCategory;
  dueDate: string;
}

export interface TaskFormData {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  category: TaskCategory;
  dueDate: string;
}