import { Component, OnInit } from '@angular/core';
import { User } from '../../types/entity/user';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  template: `
    <h1 class="text-3xl font-bold underline" >Dashboard</h1>
    <div>
      <p>You are accessing dashboard, wellcome!</p>
    </div>
  `,
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  user: User | null = null;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    console.log(this.user)
    this.authService.fetchUserDetails().subscribe(
      userDetails => console.log(userDetails),
      error => console.error('Failed to fetch user details', error)
    );
  }
}
