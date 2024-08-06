import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {

  constructor() {}

  private apiUrl = 'https://jsonplaceholder.typicode.com/';
  async getPhotos(page: number = 1) {

    try {

      let response = await axios.get(`${this.apiUrl}/albums/${page}/photos`, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })

      if (response.status === 200) {
        return response.data
      }
    } catch (error) {
      console.error(error)
    }

  }

}
