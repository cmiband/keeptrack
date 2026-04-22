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

  activebutton: string = 'list';

  boards: [string, number, string][] = [
    ['projectszpont', 7, '#4CAF50'],
    ['fdp-palindromy', 3, '#FF9800'],
    ['splendor', 22, '#2196F3'],
    ['sprawdko-swiecik', 4, '#8BC34A'],
    ['keeptrack2', 4, '#E91E63']
  ];

  users: [string, string, string][] = [
    ['Barosz', 'Adamowicz', '#D37EF1'],
    ['Witold', 'Filipek', '#99E98F'],
    ['Igor', 'Kucharski', '#E99B8F'],
    ['Igor', 'Czarnogłowski', '#83E5F4'],
    ['Albert', 'Gmitrzak', '#F48385'],
    ['Daniel', 'Gwozdecki', '#F4ED83']
  ];

  currentUser = ['Adam', 'Domzalowicz'];

  directMeesageExpand: boolean = true;

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

  handleClick(name: string) {
    this.activebutton = name;
  }

  toggleDirectMessages() {
    this.directMeesageExpand = !this.directMeesageExpand;
  }
}
