import { Component } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-categories',
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './categories.html',
  styleUrl: './categories.scss',
})
export class Categories {
  categories: Category[] = [];
  categoryName: string = '';
  editingCategoryId: string | null = null;

  faPenToSquare = faPenToSquare;
  faTrash = faTrash;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((c) => {
      this.categories = c;
    });
  }

  addCategory(): void {
    const name = this.categoryName.trim();
    if (!name) {
      alert('Category name cannot be empty');
      return;
    }

    if (this.editingCategoryId) {
      this.categoryService.updateCategory(this.editingCategoryId, name);
      this.editingCategoryId = null;
    } else {
      this.categoryService.addCategory(name);
    }

    this.categoryName = '';
  }

  editCategory(category: Category): void {
    this.editingCategoryId = category.id;
    this.categoryName = category.name;
  }

  deleteCategory(id: string): void {
    const confirmed = confirm('Are you sure you want to delete this category?');
    if (!confirmed) return;

    this.categoryService.deleteCategory(id);

    if (this.editingCategoryId === id) {
      this.editingCategoryId = null;
      this.categoryName = '';
    }
  }
}
