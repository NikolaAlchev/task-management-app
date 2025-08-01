import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-details',
  imports: [CommonModule, FontAwesomeModule, FormsModule],
  templateUrl: './task-details.html',
  styleUrl: './task-details.scss',
})
export class TaskDetails {
  task: Task | undefined = undefined;
  editableTask: Task | undefined;

  categories: Category[] = [];

  faPenToSquare = faPenToSquare;
  faTrash = faTrash;

  editMode: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit() {
    this.categoryService.getCategories().subscribe((c) => {
      this.categories = c;
    });
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.task = this.taskService.getTaskById(id);
      if (!this.task) {
        alert('Task not found');
      }
    }
  }

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

  toggleEdit(): void {
    if (!this.editMode && this.task) {
      this.editableTask = structuredClone(this.task);
      this.editMode = true;
    } else {
      this.editMode = false;
      this.editableTask = undefined;
    }
  }

  saveChanges(): void {
    if (this.editableTask) {
      this.taskService.edit(this.editableTask);
      this.task = { ...this.editableTask };
      this.editMode = false;
      this.editableTask = undefined;
    }
  }

  get dueDateString(): string {
    if (!this.editableTask?.dueDate) return '';
    const date = new Date(this.editableTask.dueDate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  set dueDateString(value: string) {
    if (this.editableTask) {
      this.editableTask.dueDate = new Date(value);
    }
  }

  deleteTask(): void {
    if (!this.task) return;

    const confirmed = confirm('Are you sure you want to delete this task?');
    if (!confirmed) return;

    this.taskService.delete(this.task.id);
    this.router.navigate(['/overview']);
  }
}
