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
export class DashboardComponent  {

}
