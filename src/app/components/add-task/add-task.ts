import { Component } from '@angular/core';
import { AddTaskSidebarService } from '../../services/add-task-sidebar.service';
import { CommonModule } from '@angular/common';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { TaskService } from '../../services/task.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-task.html',
  styleUrl: './add-task.scss',
})
export class AddTask {
  title: string = '';
  description: string = '';
  category: string = '';
  priority: 'Low' | 'Medium' | 'High' = 'Low';
  dueDate: string = '';

  categories: Category[] = [];

  constructor(
    private categoryService: CategoryService,
    private addTaskSidebarService: AddTaskSidebarService,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((c) => {
      this.categories = c;
    });
  }

  close() {
    this.addTaskSidebarService.closeAddTask();
  }

  saveTask() {
    if (!this.title || !this.category || !this.dueDate) {
      alert('Please fill in required fields.');
      return;
    }

    this.taskService.add({
      title: this.title,
      description: this.description,
      category: this.category,
      dueDate: new Date(this.dueDate),
      priority: this.priority,
      completed: false,
    });

    this.close();
  }
}
