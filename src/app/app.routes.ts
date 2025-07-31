import { Routes } from '@angular/router';
import { Overview } from './pages/overview/overview';
import { Categories } from './pages/categories/categories';
import { AddTask } from './pages/add-task/add-task';

export const routes: Routes = [
    {path: '', redirectTo: '/overview', pathMatch: 'full'},
    { path: 'overview', component: Overview, data: { title: 'Overview' } },
    { path: 'categories', component: Categories, data: { title: 'Categories' } },
    { path: 'add-task', component: AddTask, data: { title: 'Add Task' } },
];
