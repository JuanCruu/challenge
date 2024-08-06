import { Injectable, inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private readonly _dialog = inject(MatDialog);

  constructor() { }

  openModal<CT, T>(ComponentRef: ComponentType<CT>, data?: T, IsEditing = false): MatDialogRef<CT> {
    const config = {
      data, IsEditing
    };
    
    return this._dialog.open(ComponentRef, {
      data: config,
      width: '800px',
    });
  }

  closeModal(): void {
    this._dialog.closeAll();
  }
}
