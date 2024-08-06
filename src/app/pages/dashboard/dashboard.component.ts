import { Component } from '@angular/core';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { TableComponent } from '../../components/table/table.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarComponent,TableComponent],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {

}
