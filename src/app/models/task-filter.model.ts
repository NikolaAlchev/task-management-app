export interface TaskFilter {
  category?: string;
  dueDate?: Date;
  priority?: 'low' | 'medium' | 'high';
  status?: 'completed' | 'not completed';
}
