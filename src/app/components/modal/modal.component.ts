import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatLabel, MatFormField } from '@angular/material/form-field'
import { MatInput } from '@angular/material/input'
import { AdminService } from '../../services/admin.service';
import { ModalService } from '../../services/modal.service';
import { APP_CONSTANTS } from '../../shared/constans';

const MATERIAL_MODULES = [
  MatLabel, MatFormField, MatInput, MatDialogModule
];

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [ReactiveFormsModule, MATERIAL_MODULES],
  templateUrl: './modal.component.html',
})
export class ModalComponent implements OnInit {

  // Reactive form group instance
  form!: FormGroup;

  // Dependency injections
  private readonly _fb = inject(FormBuilder);
  private readonly _matDialog = inject(MAT_DIALOG_DATA);
  private readonly _adminSvc = inject(AdminService);
  private readonly _modalSVC = inject(ModalService);

  /**
   * Lifecycle hook that is called after data-bound properties are initialized
   */
  ngOnInit(): void {
    this._buildForm();
  }

  /**
   * Builds the reactive form with validation.
   * Initializes the form with existing user data if editing, otherwise creates an empty form.
   */
  private _buildForm(): void {
    const data = this._matDialog.IsEditing ? this._matDialog.data : {
      name: '',
      username: '',
      email: '',
      phone: '',
      website: ''
    };

    this.form = this._fb.nonNullable.group({
      name: [data.name, Validators.required],
      username: [data.username, Validators.required],
      email: [data.email, Validators.required],
      phone: [data.phone, Validators.required],
      website: [data.website, Validators.required],
    });
  }

  /**
   * Returns the appropriate title for the modal based on the editing status.
   * @returns The title of the modal
   */
  getTitle(): string {
    if (this._matDialog.IsEditing) {
      return 'Edit User';
    }
    return "Add User";
  }

  /**
   * Handles form submission. Depending on the editing status, it will either update an existing user
   * or add a new user. Closes the modal after submission.
   */
  async onSubmit() {
    let message = APP_CONSTANTS.MESSAGES.CONTACT_UPDATED;

    if (this._matDialog.data) {
      await this._adminSvc.editUser(this._matDialog.data);
    } else {
      await this._adminSvc.newUser(this._matDialog.data);
      message = APP_CONSTANTS.MESSAGES.CONTACT_ADDED;
    }
    this._modalSVC.closeModal();
  }
}
