import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';
  showPassword = false;
  loading = false;
  error = '';

  constructor(private router: Router) {}

  onSubmit() {
    this.error = '';
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      if (this.email === 'admin@officeprime.com') {
        this.router.navigate(['/admin']);
      } else if (this.email && this.password) {
        this.router.navigate(['/']);
      } else {
        this.error = 'E-mail ou senha inválidos.';
      }
    }, 1000);
  }
}
