import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskFilter } from '../../models/task-filter.model';

@Component({
  selector: 'app-task-list',
  imports: [],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss',
})
export class TaskList {
  @Input() filters: TaskFilter = {};
}
