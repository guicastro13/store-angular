import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from '../service/auth.guard';
import { loginRedirectGuard } from '../service/login.redirect.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [loginRedirectGuard] },
  { path: 'register', component: RegistroComponent, canActivate: [loginRedirectGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard]},
];
