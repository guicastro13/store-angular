import { Component, OnInit } from '@angular/core';
import { RouterModule, Router }  from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { RegistroComponent } from './registro/registro.component';
import { AuthService } from '../service/auth.service';
import { User } from '../types/entity/user';
import { ToastComponent } from './toast/toast.component';
import { Toast, ToastService } from '../service/toast.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RegistroComponent, LoginComponent, CommonModule, RouterModule, ToastComponent],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  userInfo: User | null = null;
  toasts: { toast: Toast, position: number }[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.toastService.getToast().subscribe(toasts => {
      this.toasts = toasts.map((toast, index) => ({ toast, position: index }));
    });

    this.authService.fetchUserDetails().subscribe(
      userDetails => this.userInfo = userDetails,
      error => console.error("faild to fetch user details", error)
    );
  }

  removeToast(position: number) {
    this.toastService.removeToast(position);
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.userInfo = null;
    this.authService.logout();
    this.toastService.setToast({ message: 'Logout realizado com sucesso!', type: 'success' });
    this.router.navigate(['/login'])
  }
}
