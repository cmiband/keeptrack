import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs";

@Injectable({providedIn: 'root'})
export class AuthService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:8080/auth';

    isLoggedIn() {
        return !!localStorage.getItem('token');
    }

    login(credentials: {username: string, password: string}) {
        return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
            tap(response => {
               
                if (response && response.token) {
                    localStorage.setItem('token', response.token);
                    console.log('token zapisany!');
                }
            })
        );
    }
   
    logout() {
        localStorage.removeItem('token');
    }
}