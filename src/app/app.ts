import { Component, inject } from '@angular/core';
import {
  RouterOutlet,
  Router,
  NavigationEnd,
  ActivatedRoute,
} from '@angular/router';
import { Sidebar } from './components/sidebar/sidebar';
import { filter, map } from 'rxjs/operators';
import { AddTaskSidebarService } from './services/add-task-sidebar.service';
import { AddTask } from './components/add-task/add-task';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar, AddTask, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  currentTitle: string = '';
  showAddTaskSidebar = false;

  constructor(private addTaskSidebarService: AddTaskSidebarService) {
    this.addTaskSidebarService.showAddTask$.subscribe(
      (show) => (this.showAddTaskSidebar = show)
    );

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let currentRoute = this.route.root;
          while (currentRoute.firstChild) {
            currentRoute = currentRoute.firstChild;
          }
          return currentRoute.snapshot.data['title'] || '';
        })
      )
      .subscribe((title) => {
        this.currentTitle = title;
      });
  }
}
