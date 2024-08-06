import { Component, ViewChild, TemplateRef, inject } from '@angular/core';
import { NgxDatatableModule, ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { AdminService } from '../../services/admin.service';
import { ModalService } from '../../services/modal.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NgxDatatableModule],
  templateUrl: './table.component.html',
})
export class TableComponent {

  // Injects ModalService
  private readonly _ModalSvc = inject(ModalService);

  // Reference to the "name" column template
  @ViewChild('nameTemplate', { static: true }) nameTemplate!: TemplateRef<any>;

  // Data retrieved from the service
  data: any

  // Filtered data
  tempData: any = [];

  // Table columns
  columns = [
    { name: 'ID', prop: 'id' },
    { name: 'Name', prop: 'name' },
    { name: 'Username', prop: 'username' },
    { name: 'Email', prop: 'email' },
    { name: 'Phone', prop: 'phone' },
    { name: 'Website', prop: 'website' },
    { name: 'Address - Street', prop: 'address.street' },
    { name: 'Address - Suite', prop: 'address.suite' },
    { name: 'Address - City', prop: 'address.city' },
    { name: 'Address - Zipcode', prop: 'address.zipcode' },
    { name: 'Address - Geo Lat', prop: 'address.geo.lat' },
    { name: 'Address - Geo Lng', prop: 'address.geo.lng' },
    { name: 'Company - Name', prop: 'company.name' },
    { name: 'Company - CatchPhrase', prop: 'company.catchPhrase' },
    { name: 'Company - BS', prop: 'company.bs' }
  ];

  // Column mode and selection type (ngx-datatable configuration)
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;

  // Selected rows in the table
  selected: any = [];

  // Constructor that injects AdminService
  constructor(private adminService: AdminService) { }

  /**
   * Called on component initialization, fetches user data
   */
  async ngOnInit() {
    try {
      const response = await this.adminService.getUsers();
      this.data = response;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    this.tempData = [...this.data];
  }

  /**
   * Filters the table data based on the input search value
   * @param event Event triggered by the search input
   */
  updateFilter(event: any = "") {
    const val = event.target.value.toLowerCase();
    const filterData = this.data.filter((item: { [s: string]: unknown; } | ArrayLike<unknown>) => {
      return Object.values(item).some(prop => {
        return prop?.toString().toLowerCase().includes(val);
      });
    });
    this.tempData = filterData.length > 0 ? filterData : this.data;
  }

  /**
   * Triggered when rows are selected in the table
   * @param event Event triggered by row selection
   */
  onSelect(event: any) {
    this.selected = event.selected;
    this.onOpenModal(true);
  }

  /**
   * Opens a modal with the selected row data
   * @param IsEditing Indicates whether the modal is in editing mode
   */
  onOpenModal(IsEditing = false) {
    const dialogRef = this._ModalSvc.openModal<ModalComponent, any>(ModalComponent, this.selected[0], IsEditing);
    dialogRef.afterClosed().subscribe(result => {
      if (result.success) {
        let id = this.selected[0].id;
        this.data[id] = result.data;
        this.tempData = [...this.data];
      }
    });
  }
}
