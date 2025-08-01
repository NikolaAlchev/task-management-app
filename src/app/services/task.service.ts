import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = [
    {
      id: '693a3687-be7b-40c0-88a5-c1ae732c270f',
      title: 'Example Task 1',
      description:
        'Lorem ipsum dolor sit amet consectetur adipiscing elit. Pretium tellus duis convallis tempus leo eu aenean. Iaculis massa nisl malesuada lacinia integer nunc posuere. Conubia nostra inceptos himenaeos orci varius natoque penatibus. Nulla molestie mattis scelerisque maximus eget fermentum odio. Blandit quis suspendisse aliquet nisi sodales consequat magna. Ligula congue sollicitudin erat viverra ac tincidunt nam. Velit aliquam imperdiet mollis nullam volutpat porttitor ullamcorper. Dui felis venenatis ultrices proin libero feugiat tristique.',
      category: 'Work',
      dueDate: new Date('2025-08-01'),
      priority: 'Medium',
      completed: false,
    },
    {
      id: 'b2c1f3e4-5d6e-4f7a-8b9c-d0e1f2a3b4c5',
      title: 'Example Task 2',
      description: 'Description 2',
      category: 'Personal',
      dueDate: new Date('2025-07-31'),
      priority: 'Low',
      completed: true,
    },
    {
      id: 'f4e5d6c7-8b9a-0b1c-2d3e-4f5g6h7i8j9k',
      title: 'Example Task 3',
      description: 'Description 3',
      category: 'Urgent',
      dueDate: new Date('2025-07-29'),
      priority: 'High',
      completed: false,
    },
  ];

  private tasksSubject = new BehaviorSubject<Task[]>(this.tasks);
  tasks$ = this.tasksSubject.asObservable();

  /**
   * Returns an observable of all tasks.
   * @returns {Observable<Task[]>} Observable stream of the task list.
   */
  getAll(): Observable<Task[]> {
    return this.tasks$;
  }

  /**
   * Returns an observable for a task matching the provided ID.
   * @param {string} id - The unique identifier of the task.
   * @returns {Observable<Task | undefined>} Observable stream of the matched task or undefined if not found.
   */
  getTaskById(id: string): Observable<Task | undefined> {
    return this.tasks$.pipe(
      map((tasks) => tasks.find((task) => task.id === id))
    );
  }

  /**
   * Adds a new task to the task list.
   * @param {Omit<Task, 'id'>} task - Task object without the ID; ID will be generated.
   */
  add(task: Omit<Task, 'id'>): void {
    const currentTasks = this.tasksSubject.getValue();
    const newTask: Task = {
      id: crypto.randomUUID(),
      ...task,
    };
    this.tasksSubject.next([...currentTasks, newTask]);
  }

  /**
   * Edits an existing task by replacing it with the updated one.
   * @param {Task} updatedTask - The task object with updated fields.
   */
  edit(updatedTask: Task): void {
    const tasks = this.tasksSubject.getValue();
    const index = tasks.findIndex((t) => t.id === updatedTask.id);
    if (index !== -1) {
      tasks[index] = updatedTask;
      this.tasksSubject.next([...tasks]);
    }
  }

  /**
   * Deletes a task by its ID.
   * @param {string} id - The unique identifier of the task to delete.
   */
  delete(id: string): void {
    const tasks = this.tasksSubject.getValue();
    const filteredTasks = tasks.filter((t) => t.id !== id);
    this.tasksSubject.next(filteredTasks);
  }
}
