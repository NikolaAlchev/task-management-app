import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categories: Category[] = [
    { id: crypto.randomUUID(), name: 'Work' },
    { id: crypto.randomUUID(), name: 'Personal' },
    { id: crypto.randomUUID(), name: 'Urgent' },
  ];

  private categoriesSubject = new BehaviorSubject<Category[]>(this.categories);
  categories$ = this.categoriesSubject.asObservable();

  getCategories(): Observable<Category[]> {
    return this.categories$;
  }

  addCategory(name: string) {
    const newCategory: Category = {
      id: crypto.randomUUID(),
      name,
    };
    this.categories.push(newCategory);
    this.categoriesSubject.next([...this.categories]);
  }

  updateCategory(id: string, name: string) {
    const category = this.categories.find((c) => c.id === id);
    if (category) {
      category.name = name;
      this.categoriesSubject.next([...this.categories]);
    }
  }

  deleteCategory(id: string) {
    this.categories = this.categories.filter((c) => c.id !== id);
    this.categoriesSubject.next([...this.categories]);
  }
}
