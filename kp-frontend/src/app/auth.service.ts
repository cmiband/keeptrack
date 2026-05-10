import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs";
import { API_ENDPOINT } from "./constants";

@Injectable({providedIn: 'root'})
export class AuthService {
    private http = inject(HttpClient);

    isLoggedIn() {
        return !!localStorage.getItem('token');
    }

    login(credentials: {email: string, password: string}) {
        return this.http.post<any>(`${API_ENDPOINT}/auth/login`, credentials).pipe(
            tap(response => {
                if (response && response.token && response.userData) {
                    localStorage.setItem('token', response.token);
                    localStorage.setItem('user', JSON.stringify(response.userData));
                }
            })
        );
    }
   
    register(data: {username: string, password: string, email: string}) {
        return this.http.post<any>(`${API_ENDPOINT}/users/register`, data);
    }

    logout() {
        localStorage.removeItem('token');
    }
}