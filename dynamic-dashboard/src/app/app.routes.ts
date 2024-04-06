import { Routes } from '@angular/router';
import { DashboardComponent } from './page/dashboard/dashboard.component';

export const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent},
    { path: '**', component: DashboardComponent }
];
