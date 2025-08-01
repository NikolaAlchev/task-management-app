import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddTaskSidebarService {
  private _showAddTask = new BehaviorSubject(false);
  showAddTask$ = this._showAddTask.asObservable();

  /**
   * Opens (shows) the Add Task sidebar.
   */
  openAddTask() {
    this._showAddTask.next(true);
  }

  /**
   * Closes (hides) the Add Task sidebar.
   */
  closeAddTask() {
    this._showAddTask.next(false);
  }
}
