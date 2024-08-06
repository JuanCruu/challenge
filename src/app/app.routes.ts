import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { authGuard } from './auth/guards/auth.guard';
import { loginGuard } from './auth/guards/login.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { adminGuard } from './auth/guards/admin.guard';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, canActivate: [authGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [adminGuard] },
    { path: 'login', component: LoginComponent, canActivate: [loginGuard] },
    { path: '**', component: NotFoundComponent },
];
