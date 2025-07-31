import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddTaskSidebarService {
  private _showAddTask = new BehaviorSubject(false);
  showAddTask$ = this._showAddTask.asObservable();

  openAddTask() {
    this._showAddTask.next(true);
  }
  closeAddTask() {
    this._showAddTask.next(false);
  }
}
