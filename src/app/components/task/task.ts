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
}
