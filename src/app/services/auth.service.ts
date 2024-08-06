import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Sample users for authentication
  private users = [
    {
      id: 1,
      username: 'user@gmail.com',
      password: 'user1234',
      isAdmin: false
    },
    {
      id: 9991,
      username: 'admin@gmail.com',
      password: 'admin1234',
      isAdmin: true
    },
  ];

  // Token stored in local storage
  token: any;

  constructor(private router: Router) {
    // Initialize the token and check if the user is an admin
    this.isAdmin();
  }

  /**
   * Authenticates a user by checking their username and password against stored users.
   * @param {string} username - The username of the user to authenticate.
   * @param {string} password - The password of the user to authenticate.
   * @returns {boolean} Returns true if the user is authenticated, false otherwise.
   */
  login(username: string, password: string): boolean {
    const user = this.users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      const token = this.generateFakeJwtToken({ user });
      localStorage.setItem('token', token);
      this.router.navigate(['/home']);
      return true;
    }
    
    return false;
  }

  /**
   * Logs out the user by removing the token from local storage and redirecting to the login page.
   */
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  /**
   * Checks if the user is authenticated by verifying the presence and validity of the token.
   * @returns {boolean} Returns true if the user is authenticated, false otherwise.
   */
  isAuth(): boolean {
    this.token = localStorage.getItem('token');

    if (this.token) {
      const decodedToken = this.decodeToken(this.token);
      return !!decodedToken;
    }

    return false;
  }

  /**
   * Generates a fake JWT token for the given payload.
   * @param {object} payload - The payload to include in the token.
   * @returns {string} The generated JWT token.
   */
  private generateFakeJwtToken(payload: object): string {
    const header = {
      alg: 'HS256',
      typ: 'JWT',
    };
    const encodedHeader = btoa(JSON.stringify(header));
    const encodedPayload = btoa(JSON.stringify(payload));
    const signature = 'simulated-signature'; // Simulated token signature

    return `${encodedHeader}.${encodedPayload}.${signature}`;
  }

  /**
   * Decodes the JWT token.
   * @param {string} token - The token to decode.
   * @returns {any} The decoded token data, or null if the token is invalid.
   */
  private decodeToken(token: string): any {
    try {
      return jwtDecode(token); // Decoding the token
    } catch (error) {
      console.error('Invalid token', error);
      return null;
    }
  }

  /**
   * Checks if the authenticated user is an admin.
   * @returns {boolean} Returns true if the user is an admin, false otherwise.
   */
  isAdmin(): boolean {
    this.token = localStorage.getItem('token');

    if (this.token) {
      const decodedToken = this.decodeToken(this.token);
      return decodedToken?.user?.isAdmin ?? false; // Safely accessing nested properties
    }

    return false;
  }
}
