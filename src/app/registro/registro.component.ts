import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
   registroForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
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
        },
        error => {
            console.error("Resgistration failed: ", error);
          }
      );
    }
  }
}
