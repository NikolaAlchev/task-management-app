import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categories: Category[] = [
    { id: '5d415d95-e53f-4f51-906c-1eeb0c62fb14 ', name: 'Work' },
    { id: 'c4ce0a07-7471-4670-950c-8b230e3ea0d4', name: 'Personal' },
    { id: '2baaf713-74e7-4fcc-af27-bf9fa0ff09c4', name: 'Urgent' },
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
