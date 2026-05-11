import { Component, inject, AfterViewInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-page',
  imports: [RouterLink, FormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage implements AfterViewInit {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  authService = inject(AuthService);
  router = inject(Router);

  ngAfterViewInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  handleLogin(): void {
    this.errorMessage = '';

    // --- NATYCHMIASTOWA WALIDACJA FRONTENDOWA ---
    if (!this.email || !this.password) {
      this.errorMessage = 'Email and password are required.';
      return; // Zatrzymujemy wysyłanie zapytania
    }
    // --------------------------------------------

    console.log('Data:', this.email, this.password);

    const loginData = {
      email: this.email,
      password: this.password,
    };

    this.authService.login(loginData).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: (err) => {
        if (err.status === 401) {
          this.errorMessage = 'Invalid email or password';
        } else {
          this.errorMessage = 'Login error';
        }
      },
    });
  }
}
