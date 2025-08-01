import { Component, HostListener, inject } from '@angular/core';
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
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar, AddTask, CommonModule, FontAwesomeModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  currentTitle: string = '';
  showAddTaskSidebar = false;
  sidebarOpen = true;
  faBars = faBars;
  isMobile = false;

  ngOnInit() {
    this.checkIfMobile();
  }

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

  closeSidebar() {
    if (this.isMobile) {
      this.sidebarOpen = false;
    }
  }

  @HostListener('window:resize', [])
  onResize() {
    this.checkIfMobile();
  }

  checkIfMobile() {
    if (typeof window !== 'undefined') {
      this.isMobile = window.innerWidth <= 768;
      if (!this.isMobile) {
        this.sidebarOpen = true;
      }
    }
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
