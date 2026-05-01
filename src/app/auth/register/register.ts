import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  form = { firstName:'', lastName:'', email:'', cpf:'', phone:'', password:'', confirmPassword:'' };
  acceptTerms = false;
  loading = false;
  passwordMismatch = false;
  strengthPct = 0;
  strengthColor = '#e5e7eb';
  strengthLabel = '';

  constructor(private router: Router) {}

  maskCpf(e: Event) {
    const el = e.target as HTMLInputElement;
    let v = el.value.replace(/\D/g, '');
    v = v.replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    el.value = v; this.form.cpf = v;
  }

  maskPhone(e: Event) {
    const el = e.target as HTMLInputElement;
    let v = el.value.replace(/\D/g, '');
    v = v.replace(/^(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d{1,4})$/, '$1-$2');
    el.value = v; this.form.phone = v;
  }

  checkMatch() {
    this.passwordMismatch = !!this.form.confirmPassword && this.form.password !== this.form.confirmPassword;
  }

  checkStrength() {
    const p = this.form.password;
    let score = 0;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    const map: Record<number, [number, string, string]> = {
      0: [0,   '#e5e7eb', ''],
      1: [25,  '#ef4444', 'Fraca'],
      2: [50,  '#f59e0b', 'Razoável'],
      3: [75,  '#3b82f6', 'Boa'],
      4: [100, '#10b981', 'Forte'],
    };
    [this.strengthPct, this.strengthColor, this.strengthLabel] = map[score];
  }

  onSubmit() {
    this.loading = true;
    setTimeout(() => { this.loading = false; this.router.navigate(['/login']); }, 1200);
  }
}
