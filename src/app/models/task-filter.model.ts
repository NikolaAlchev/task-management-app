export interface TaskFilter {
  category?: string;
  dueDate?: Date;
  priority?: 'Low' | 'Medium' | 'High';
  status?: 'Completed' | 'Not Completed';
}
