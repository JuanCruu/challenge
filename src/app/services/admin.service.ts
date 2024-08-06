import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  // Base URL for the API
  private apiUrl = 'https://jsonplaceholder.typicode.com/';

  constructor() { }

  /**
   * Retrieves a list of users from the API
   * @returns A promise that resolves to the list of users
   */
  async getUsers() {
    try {
      const response = await axios.get(`${this.apiUrl}/users/`, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error; // Re-throwing the error to allow calling code to handle it
    }
  }

  /**
   * Retrieves a single user by ID from the API
   * @param id - The ID of the user to retrieve
   * @returns A promise that resolves to the user data
   */
  async getUser(id: number) {
    try {
      const response = await axios.get(`${this.apiUrl}/users/${id}`, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error(`Error fetching user with ID ${id}:`, error);
      throw error; // Re-throwing the error to allow calling code to handle it
    }
  }

  /**
   * Updates an existing user in the API
   * @param user - The user data to update
   * @returns A promise that resolves to the updated user data
   */
  async editUser(user: any) {
    try {
      const response = await axios.put(`${this.apiUrl}/users/${user.id}`, user, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      console.log('User updated:', response);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error('Error updating user:', error);
      throw error; // Re-throwing the error to allow calling code to handle it
    }
  }

  /**
   * Creates a new user in the API
   * @param user - The user data to create
   * @returns A promise that resolves to the created user data
   */
  async newUser(user: any) {
    try {
      const response = await axios.post(`${this.apiUrl}/users/`, user, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      console.log('User created:', response);
      if (response.status === 201) { // Changed to 201 as the standard status code for resource creation
        return response.data;
      }
    } catch (error) {
      console.error('Error creating user:', error);
      throw error; // Re-throwing the error to allow calling code to handle it
    }
  }
}
