import { Component, inject, signal, AfterViewInit } from '@angular/core';
import { Router,RouterOutlet } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit {
  private router = inject(Router);
  private authService = inject(AuthService);

  protected readonly title = signal('kp-frontend');

  ngAfterViewInit(): void {
    if(!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
  }
}
