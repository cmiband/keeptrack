import { Component, inject, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register-page',
  imports: [FormsModule], 
  templateUrl: './register-page.html',
  styleUrl: './register-page.css',
})
export class RegisterPage implements AfterViewInit {

  email: string = '';
  password: string = '';
  username: string = '';
  firstName: string = ''; 
  lastName: string = ''; 

  errorMessage: string = '';

  authService = inject(AuthService);
  router = inject(Router);

  ngAfterViewInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  handleRegister() {
    this.errorMessage = '';

  
    if (!this.username || !this.email || !this.password || !this.firstName || !this.lastName) {
      this.errorMessage = 'Wszystkie pola są wymagane.';
      return;
    }

  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.errorMessage = 'Proszę podać poprawny adres e-mail.';
      return;
    }

    
    if (this.password.length < 6) {
      this.errorMessage = 'Hasło musi mieć co najmniej 6 znaków.';
      return;
    }
   
    
    const registerData = {
      username: this.username,
      password: this.password,
      email: this.email,
      firstName: this.firstName, 
      lastName: this.lastName, 
    };
   

    console.log('Wysyłane dane rejestracji:', registerData);

    this.authService.register(registerData).subscribe({
      next: () => {
        console.log('Rejestracja pomyślna!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Błąd rejestracji z backendu:', err);
        if (err.error?.message) {
          this.errorMessage = err.error.message;
        } else {
          this.errorMessage = 'Wystąpił błąd podczas rejestracji.';
        }
      },
    });
  }
}
