import { Component, inject, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router'; // Usuwamy RouterLink, aby uniknąć ostrzeżeń
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register-page',
  imports: [FormsModule], // Usuwamy RouterLink
  templateUrl: './register-page.html',
  styleUrl: './register-page.css',
})
export class RegisterPage implements AfterViewInit {
  // Poprawione nazwy zmiennych dla natychmiastowej walidacji w inputach
  email: string = '';
  password: string = '';
  username: string = '';
  firstName: string = ''; // NAPRAWIONE: camelCase!
  lastName: string = ''; // NAPRAWIONE: camelCase!

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

    // --- NATYCHMIASTOWA WALIDACJA FRONTENDOWA ---
    // 1. Sprawdzamy brakujące wymagane pola
    if (!this.username || !this.email || !this.password || !this.firstName || !this.lastName) {
      this.errorMessage = 'Wszystkie pola są wymagane.';
      return;
    }

    // 2. Prosta walidacja formatu e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.errorMessage = 'Proszę podać poprawny adres e-mail.';
      return;
    }

    // 3. Sprawdzenie długości hasła
    if (this.password.length < 6) {
      this.errorMessage = 'Hasło musi mieć co najmniej 6 znaków.';
      return;
    }
    // --------------------------------------------

    // --- MAPOWANIE KONTRAKTU DANYCH ---
    // Upewniamy się, że nazwy pól tutaj idealnie pasują do obiektu Java @RequestBody
    const registerData = {
      username: this.username,
      password: this.password,
      email: this.email,
      firstName: this.firstName, // KLUCZOWA POPRAWKA: camelCase!
      lastName: this.lastName, // KLUCZOWA POPRAWKA: camelCase!
    };
    // ------------------------------------

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
