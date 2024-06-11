import { Component } from '@angular/core';
import { RouterModule }  from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { RegistroComponent } from './registro/registro.component';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RegistroComponent, LoginComponent, CommonModule, RouterModule],
  template: `
    <nav>
      <a *ngIf="!isLoggedIn()" routerLink="/login">Login</a>
      <a *ngIf="!isLoggedIn()" routerLink="/register">Registro</a>
      <span *ngIf="isLoggedIn()">Welcome, {{ userInfo?.name }}</span>
      <button *ngIf="isLoggedIn()" (click)="logout()">Logout</button>
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  userInfo: any;

  constructor(private authService: AuthService) {
    this.userInfo = this.authService.getUserInfo();
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout();
    window.location.reload();
  }
}
