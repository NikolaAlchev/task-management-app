import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = [
    {
      id: crypto.randomUUID(),
      title: 'Example Task 1',
      description: 'Description 1',
      category: 'Work',
      dueDate: new Date('2025-08-01'),
      priority: 'medium',
      completed: false,
    },
    {
      id: crypto.randomUUID(),
      title: 'Example Task 2',
      description: 'Description 2',
      category: 'Personal',
      dueDate: new Date('2025-07-31'),
      priority: 'low',
      completed: true,
    },
    {
      id: crypto.randomUUID(),
      title: 'Example Task 3',
      description: 'Description 3',
      category: 'Urgent',
      dueDate: new Date('2025-07-29'),
      priority: 'high',
      completed: false,
    },
  ];

  private tasksSubject = new BehaviorSubject<Task[]>(this.tasks);
  tasks$ = this.tasksSubject.asObservable();

  getAll(): Observable<Task[]> {
    return this.tasks$;
  }

  add(task: Omit<Task, 'id'>): void {
    const currentTasks = this.tasksSubject.getValue();
    const newTask: Task = {
      id: crypto.randomUUID(),
      ...task,
    };
    this.tasksSubject.next([...currentTasks, newTask]);
  }

  edit(updatedTask: Task): void {
    const tasks = this.tasksSubject.getValue();
    const index = tasks.findIndex((t) => t.id === updatedTask.id);
    if (index !== -1) {
      tasks[index] = updatedTask;
      this.tasksSubject.next([...tasks]);
    }
  }

  delete(id: string): void {
    const tasks = this.tasksSubject.getValue();
    this.tasksSubject.next(tasks.filter((t) => t.id !== id));
  }
}
