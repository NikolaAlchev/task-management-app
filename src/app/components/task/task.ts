import { Component, Input } from '@angular/core';
import { Task } from '../../models/task.model';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'tr[app-task]',
  imports: [CommonModule],
  templateUrl: './task.html',
  styleUrl: './task.scss',
})
export class TaskComponent {
  @Input() task!: Task;

  constructor(private router: Router) {}

  getPriorityClass(priority: string): string {
    switch (priority?.toLowerCase()) {
      case 'low':
        return 'priority-low';
      case 'medium':
        return 'priority-medium';
      case 'high':
        return 'priority-high';
      default:
        return '';
    }
  }

  getStatusClass(completed: boolean): string {
    if (completed) {
      return 'status-completed';
    }
    return 'status-not-completed';
  }

  toggleStatus(event: MouseEvent) {
    event.stopPropagation();

    this.task.completed = !this.task.completed;

    // Optionally: update the task in a service
    // this.taskService.updateTask(this.task).subscribe();

    console.log(
      `Task "${this.task.title}" marked as`,
      this.task.completed ? 'completed' : 'not completed'
    );
  }
}
