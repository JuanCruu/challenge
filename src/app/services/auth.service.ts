import { Injectable, afterRender } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private users = [
    {
      username: 'user@gmail.com',
      password: 'user1234',
      isAdmin: true
    },
    {
      username: 'admin@gmail.com',
      password: 'admin1234',
      isAdmin: false
    },
  ];

  token: any
  constructor(private router: Router) { }

  /**
   * Authenticates a user by checking their username and password against the stored users.
   * @param {string} username - The username of the user to authenticate.
   * @param {string} password - The password of the user to authenticate.
   * @return {boolean} Returns true if the user is authenticated, false otherwise.
   */
  login(username: string, password: string): boolean {
    const user = this.users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      const token = this.generateFakeJwtToken({ username });
      localStorage.setItem('token', token);
      this.router.navigate(['/home']);
      return true;
    }
    return false;
  }


  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }


  isAuth(): boolean {
    this.token = localStorage.getItem('token');
    if (this.token) {
      const decodedToken = this.decodeToken(this.token);
      return !!decodedToken;
    }
    return false;
  }

  private generateFakeJwtToken(payload: object): string {
    const header = {
      alg: 'HS256',
      typ: 'JWT',
    };
    const encodedHeader = btoa(JSON.stringify(header));
    const encodedPayload = btoa(JSON.stringify(payload));
    const signature = 'simulated-signature'; // Simula la firma del token

    return `${encodedHeader}.${encodedPayload}.${signature}`;
  }


  private decodeToken(token: string): any {
    try {
      return jwtDecode(this.token);
    } catch (error) {
      console.error('Token inválido', error);
      return null;
    }
  }
}
