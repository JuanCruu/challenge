import { Injectable } from '@angular/core';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  // Base URL for the API
  private apiUrl = 'https://jsonplaceholder.typicode.com/';

  constructor(private toastr: ToastrService) { }

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
      this.toastr.error('Error fetching users:', "error");
      throw error;
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
      this.toastr.error(`Error fetching user with ID ${id}:`, "error");
      console.error(`Error fetching user with ID ${id}:`, error);
      throw error;
    }
  }

  /**
   * Updates an existing user in the API
   * @param user - The user data to update
   * @returns A promise that resolves to the updated user data
   */
  async editUser(user: any) {
    console.log('editUser: ', user);
    try {
      const response = await axios.put(`${this.apiUrl}/users/${user.id}`, user, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      if (response.status === 200) {

        console.log("response user", response.data);

        this.toastr.success('User updated:', "success");
        return response.data;
      }
    } catch (error) {
      this.toastr.error('Error updating user:', "error");
      console.error('Error updating user:', error);
      throw error;
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
      if (response.status === 201) {
        this.toastr.success('User created:', "success");
        return response.data;
      }
    } catch (error) {
      this.toastr.error('Error creating user:', "error");
      console.error('Error creating user:', error);
      throw error;
    }
  }
}
