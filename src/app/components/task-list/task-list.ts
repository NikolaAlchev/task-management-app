import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskFilter } from '../../models/task-filter.model';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskComponent } from '../task/task';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TaskComponent],
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.scss'],
})
export class TaskList implements OnChanges {
  @Input() filters: TaskFilter = {};

  tasks: Task[] = [];
  filteredTasks: Task[] = [];

  sortColumn: keyof Task = 'title';
  sortDirection: 'asc' | 'desc' | '' = '';

  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit(): void {
    this.taskService.getAll().subscribe((tasks) => {
      this.tasks = tasks;
      this.applyFilters();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filters']) {
      this.applyFilters();
    }
  }

  applyFilters(): void {
    this.filteredTasks = this.tasks.filter((task) => {
      if (this.filters.category && task.category !== this.filters.category) {
        return false;
      }
      if (
        this.filters.dueDate &&
        new Date(task.dueDate).toDateString() !==
          new Date(this.filters.dueDate).toDateString()
      ) {
        return false;
      }
      if (this.filters.priority && task.priority !== this.filters.priority) {
        return false;
      }
      if (this.filters.status) {
        const completed = this.filters.status === 'Completed';
        if (task.completed !== completed) {
          return false;
        }
      }
      return true;
    });
    this.applySort();
  }

  applySort(): void {
    if (!this.sortColumn || this.sortDirection === '') {
      return;
    }
    this.filteredTasks.sort((a, b) => {
      return (
        this.compare(a[this.sortColumn], b[this.sortColumn]) *
        (this.sortDirection === 'asc' ? 1 : -1)
      );
    });
  }

  compare(v1: any, v2: any): number {
    if (v1 == null) return -1;
    if (v2 == null) return 1;

    const priorityOrder: Record<string, number> = {
      low: 1,
      medium: 2,
      high: 3,
    };

    if (typeof v1 === 'string' && typeof v2 === 'string') {
      const p1 = v1.toLowerCase();
      const p2 = v2.toLowerCase();

      if (p1 in priorityOrder && p2 in priorityOrder) {
        return priorityOrder[p1] - priorityOrder[p2];
      }

      return p1.localeCompare(p2);
    }

    if (typeof v1 === 'boolean' && typeof v2 === 'boolean') {
      return v1 === v2 ? 0 : v1 ? 1 : -1;
    }

    if (v1 instanceof Date && v2 instanceof Date) {
      v1 = v1.getTime();
      v2 = v2.getTime();
    }

    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
  }

  onSort(column: keyof Task): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.applySort();
  }

  onTaskRowClick(task: Task) {
    this.router.navigate(['/task-details', task.id]);
  }
}
