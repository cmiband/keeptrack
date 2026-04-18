import { Component, inject, AfterViewInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register-page',
  imports: [RouterLink, FormsModule],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css',
})
export class RegisterPage implements AfterViewInit {
  email: string = "";
  password: string = "";
  username: string = "";
  errorMessage: string = "";

  authService = inject(AuthService);
  router = inject(Router);

  ngAfterViewInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  handleRegister() {
    this.errorMessage = "";

    const registerData = {
      username: this.username,
      password: this.password,
      email: this.email
    };

    this.authService.register(registerData).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        if (err.error?.message) {
          this.errorMessage = err.error.message;
        } else {
          this.errorMessage = 'Registration error';
        }
      }
    });
  }
}
