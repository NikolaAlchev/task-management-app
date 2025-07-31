import { Component } from '@angular/core';
import { TaskList } from '../../components/task-list/task-list';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskFilter } from '../../models/task-filter.model';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-overview',
  imports: [RouterLink, TaskList, FormsModule, CommonModule, FontAwesomeModule],
  templateUrl: './overview.html',
  styleUrl: './overview.scss',
})
export class Overview {
  faFilter = faFilter;
  filter: TaskFilter = {};

  categories: Category[] = [];
  priorities = ['Low', 'Medium', 'High'];
  statuses = ['Completed', 'Not Completed'];

  showFilters = false;

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((c) => {
      this.categories = c;
    });
  }
}
