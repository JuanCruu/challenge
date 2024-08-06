import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  // Injects MatDialog to manage dialog components
  private readonly _dialog = inject(MatDialog);

  constructor() {}

  /**
   * Opens a modal dialog with the specified component and data.
   * @param ComponentRef - The component to be displayed in the modal
   * @param data - Optional data to pass to the modal component
   * @param IsEditing - Flag indicating if the modal is for editing (default is false)
   */
  openModal<CT, T>(ComponentRef: ComponentType<CT>, data?: T, IsEditing = false): void {
    // Configuration object for the dialog
    const config = {
      data: { data, IsEditing },
      width: '800px',
    };

    // Opens the dialog with the specified component and configuration
    this._dialog.open(ComponentRef, config);
  }

  /**
   * Closes all open modal dialogs
   */
  closeModal(): void {
    this._dialog.closeAll();
  }
}
