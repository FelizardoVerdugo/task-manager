import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  form: FormGroup;
  loading = false;
  error: string | null = null;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      email:    ['felizardo@demo.com', [Validators.required, Validators.email]],
      password: ['123456',      [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() { return this.form.controls; }

  async onSubmit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading = true;
    this.error = null;
    try {
      await this.auth.login(this.form.value as any);
      this.router.navigate(['/tasks']);
    } catch (e: any) {
      this.error = e.message;
    } finally {
      this.loading = false;
    }
  }
}