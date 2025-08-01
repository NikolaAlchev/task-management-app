import { Routes } from '@angular/router';
import { Overview } from './pages/overview/overview';
import { Categories } from './pages/categories/categories';
import { TaskDetails } from './pages/task-details/task-details';

export const routes: Routes = [
  { path: '', redirectTo: '/overview', pathMatch: 'full' },
  { path: 'overview', component: Overview, data: { title: 'Overview' } },
  { path: 'categories', component: Categories, data: { title: 'Categories' } },
  {
    path: 'task-details/:id',
    component: TaskDetails,
    data: { title: 'Task Details' },
  },
];
