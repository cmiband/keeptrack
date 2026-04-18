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
    const token = localStorage.getItem('token');
    
    console.log('--- SESSION TEST ---');
    if (token) {
      console.log('Token found:', token);
    } else {
      console.warn('No token in localStorage!');
    }
  }
  
  private authService = inject(AuthService);
  private router = inject(Router);

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
