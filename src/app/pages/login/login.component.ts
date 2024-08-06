import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent {
  loginForm: FormGroup;
  isFormValid = true
  mailValid: any
  passwordValid: any

  constructor(private authService: AuthService, private toastr: ToastrService, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  /**
   * Handles the login action, checking form validity and authentication status.
   */
  login() {

    this.isFormValid = this.loginForm.valid
    this.mailValid = this.loginForm.get('email')?.errors
    this.passwordValid = this.loginForm.get('password')?.errors

    if (this.isFormValid) {
      const { email, password } = this.loginForm.value;
      const isAuthenticated = this.authService.login(email, password);
      if (isAuthenticated) {
        this.toastr.success('Login successful!', 'Success');
      } else {
        this.toastr.error('Invalid email or password', 'Error');
      }
    } else {
      this.toastr.warning('Please fill in all required fields correctly', 'Warning');
    }
  }
}
