import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NotFoundComponent],
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  title = 'eldarChallenge';
}
