import { Component, Output, EventEmitter, Inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faTableColumns,
  faShapes,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { AddTaskSidebarService } from '../../services/add-task-sidebar.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, FontAwesomeModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  @Output() sidebarClosed = new EventEmitter<void>();

  faTableColumns = faTableColumns;
  faShapes = faShapes;
  faPlus = faPlus;

  constructor(public addTaskSidebarService: AddTaskSidebarService) {}

  handleLinkClick() {
    if (window.innerWidth <= 768) {
      this.sidebarClosed.emit();
    }
  }
}
