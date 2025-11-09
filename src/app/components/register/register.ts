import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class Register {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';

  constructor(private auth: AuthService, private router: Router) {}

  get passwordsMismatch(): boolean {
    // true if both filled and not equal OR if confirm filled and not equal
    if (!this.password && !this.confirmPassword) return false;
    return this.password !== this.confirmPassword;
  }

  onRegister(form: any) {
    // Prevent submission if form invalid or passwords mismatch
    if (form.invalid) {
      // Mark all controls as touched to show validation messages
      Object.values(form.controls).forEach((control: any) => control.markAsTouched && control.markAsTouched());
      return;
    }

    if (this.passwordsMismatch) {
      Swal.fire({
        icon: 'error',
        title: 'Passwords do not match',
        text: 'Please make sure both password fields match.',
        confirmButtonText: 'OK'
      });
      return;
    }

    const success = this.auth.register({
      name: this.name,
      email: this.email,
      password: this.password
    });

    if (success) {
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful!',
        text: 'You can now log in to your account.',
        confirmButtonText: 'Login'
      }).then(() => this.router.navigate(['/login']));
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Email Already Registered',
        text: 'This email address is already in use.',
        confirmButtonText: 'OK'
      });
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
