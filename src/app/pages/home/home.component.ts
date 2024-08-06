import { Component } from '@angular/core';
import { AlbumsService } from '../../services/albums.service';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { CardComponent } from "../../components/card/card.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SidebarComponent, CardComponent],
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent {
  // List of albums retrieved from the service
  albums: any[] = [];

  // Filter criteria for photos
  filterWorld = '';

  // Injects AlbumsService to fetch data
  constructor(private albumsService: AlbumsService) { }

  /**
   * Lifecycle hook that is called after data-bound properties are initialized
   * Fetches the list of photos from the AlbumsService
   */
  async ngOnInit() {
    try {
      const response = await this.albumsService.getPhotos();
      this.albums = response;
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  }

  /**
   * Updates the filter criteria based on user input
   * @param event - The event triggered by user input
   */
  filterPhotos(event: any) {
    this.filterWorld = event.target.value;
  }

  /**
   * Filters the list of albums based on the filter criteria
   * @returns The filtered list of albums
   */
  getFilterPhotos() {
    if (this.filterWorld === '') {
      return this.albums;
    }
    return this.albums.filter((album: any) => album.title.includes(this.filterWorld));
  }
}
