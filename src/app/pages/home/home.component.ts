import { Component } from '@angular/core';
import { AlbumsService } from '../../services/albums.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent {
  albums: any
  filterWorld = ''

  constructor(private albumsService: AlbumsService) { }
  async ngOnInit() {
    try {
      const response = await this.albumsService.getPhotos();
      this.albums = response
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  }


  getFilterPhotos() {
    if (this.filterWorld === '') {
      return this.albums
    }
    return this.albums.filter((album: any) => album.title.includes(this.filterWorld))
  }

}
