import { Routes } from '@angular/router';
import { LoginPage } from './login-page/login-page';
import { RegisterPage } from './register-page/register-page';
import { Home } from './home/home';
import { authGuard } from './auth-guard';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginPage
    },
    {
        path: 'register',
        component: RegisterPage
    },
    {
        path: 'home',
        component: Home,
        canActivate: [authGuard]
    }
];

