import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgIf],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {

  // Indicates whether the user is an admin
  isAdmin: boolean;

  // Constructor that injects AuthService
  constructor(private authService: AuthService) {
    // Initialize isAdmin based on the AuthService
    this.isAdmin = this.authService.isAdmin();
  }

  /**
   * Logs out the current user by calling AuthService.logout
   */
  logout() {
    this.authService.logout();
  }
}
