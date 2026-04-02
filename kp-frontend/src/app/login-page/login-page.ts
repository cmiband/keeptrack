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
  
  }
}
