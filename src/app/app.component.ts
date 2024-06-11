import { Component } from '@angular/core';
import { RouterModule }  from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { RegistroComponent } from './registro/registro.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RegistroComponent, LoginComponent, CommonModule, RouterModule],
  template: `
    <nav>
      <a routerLink="/login">Login</a>
      <a routerLink="/register">Registro</a>
    </nav>
    <router-outlet></router-outlet>`,
  styleUrl: './app.component.css'
})
export class AppComponent {
}
