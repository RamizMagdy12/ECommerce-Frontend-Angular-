import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  onLogin(form: any) {
    if (form.invalid) {
      Object.values(form.controls).forEach((c: any) => c.markAsTouched && c.markAsTouched());
      return;
    }

    const success = this.auth.login(this.email, this.password);
    if (success) {
      Swal.fire('Welcome!', 'You have logged in successfully.', 'success');
      this.router.navigate(['/']);
    } else {
      Swal.fire('Error', 'Invalid email or password.', 'error');
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
