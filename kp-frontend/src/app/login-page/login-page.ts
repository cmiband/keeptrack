import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { inject, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-login-page',
  imports: [RouterLink, FormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage implements AfterViewInit {
  email : string = "";
  password : string = "";

  authService = inject(AuthService);
  router = inject(Router);

  ngAfterViewInit(): void {
    if(this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }
  
  handleLogin() : void {
    
  console.log("Dane:", this.email, this.password);
    const loginData = {
    username: this.email, 
    password: this.password
  };

  this.authService.login(loginData).subscribe({
    next: (response) => {
      console.log('Sukces! Token jest w localStorage');
      this.router.navigate(['/home']); 
    },
    error: (err) => {
      console.error('Błąd logowania:', err);
      alert('Nieprawidłowy login lub hasło');
    }
  });
  }
  
}
