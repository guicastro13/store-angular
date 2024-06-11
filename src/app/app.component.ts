import { Component, OnInit } from '@angular/core';
import { RouterModule, Router }  from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { RegistroComponent } from './registro/registro.component';
import { AuthService } from '../service/auth.service';
import { User } from '../types/entity/user';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RegistroComponent, LoginComponent, CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  userInfo: User | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.fetchUserDetails().subscribe(
      userDetails => this.userInfo = userDetails,
      error => console.error("faild to fetch user details", error)
    );
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login'])
  }
}
