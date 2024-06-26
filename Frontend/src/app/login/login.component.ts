import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onLogin() {
    const { username, password } = this.loginForm.value;
    this.authService.login(username, password).subscribe(
      success => {
        if (success) {
          this.router.navigate(['/fuel-table']);
        } else {
          this.loginError = 'Invalid username or password';
        }
      },
      error => {
        console.error('Error during login:', error);
      }
    );
  }
}
