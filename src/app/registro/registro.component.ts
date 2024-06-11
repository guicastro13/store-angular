import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { ToastComponent } from '../toast/toast.component';
import { ToastService } from '../../service/toast.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastComponent],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  registroForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private router: Router,
    private toastService: ToastService 
  ) {
    this.registroForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      cep: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registroForm.valid) {
      this.authService.register(this.registroForm.value).subscribe(
        response => {
          console.log("Resgistration successful: ", response);
          this.toastService.setToast({ message: 'Registro realizado com sucesso!', type: 'success' });
          this.router.navigate(['/login']);
        },
        error => {
          console.error("Resgistration failed: ", error);
          this.toastService.setToast({ message: 'Erro ao registrar usuário. Por favor, tente novamente.', type: 'error' });
        }
      );
    }
  }
}
