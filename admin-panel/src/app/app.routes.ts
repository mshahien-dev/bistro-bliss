import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ItemsComponent } from './items/items.component';
import { RegisterComponent } from './register/register.component';
import { adminGuard } from './services/admin.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
  },

  {
    path: 'user',
    loadComponent: () =>
      import('./register/register.component').then((m) => m.RegisterComponent),
    canActivate: [adminGuard],
  },

  {
    path: 'adminpanelapp',
    loadComponent: () =>
      import('./items/items.component').then((m) => m.ItemsComponent),
    canActivate: [adminGuard],
  },

  { path: '**', redirectTo: '/login' },
];
