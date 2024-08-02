import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent {


  constructor(private authService: AuthService) { }

  login(username: string, password: string) {
    const isAuthenticated = this.authService.login(username, password);
    if (isAuthenticated) {
      alert('isAuthenticated:');
    }
  }
}