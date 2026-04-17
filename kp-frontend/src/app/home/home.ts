import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  ngOnInit() {
    // Wyciągamy bilet z szuflady i pokazujemy go w konsoli
    const mojToken = localStorage.getItem('token');
    
    console.log('--- TEST SESJI ---');
    if (mojToken) {
      console.log('Znaleziono token:', mojToken);
    } else {
      console.warn('Brak tokena w localStorage!');
    }
  }
  
  private authService = inject(AuthService);
  private router = inject(Router);

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
