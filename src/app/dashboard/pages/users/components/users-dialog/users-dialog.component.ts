import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UsersService } from '../../user.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models';

@Component({
  selector: 'app-users-dialog',
  templateUrl: './users-dialog.component.html',
  styleUrls: ['./users-dialog.component.scss'],
})
export class UsersDialogComponent {
  nameControl = new FormControl();
  lastNameControl = new FormControl();
  emailControl = new FormControl();
  ageControl = new FormControl();

  userForm = new FormGroup({
    name: this.nameControl,
    lastName: this.lastNameControl,
    email: this.emailControl,
    age: this.ageControl,
  });

  constructor(
    private matDialogRef: MatDialogRef<UsersDialogComponent>,
    private usersService: UsersService,
    @Inject(MAT_DIALOG_DATA) public user?: User
  ) {
    if (user) {
      console.log(user);

      this.userForm.patchValue(user);
    }
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      return this.userForm.markAllAsTouched();
    } else {
      this.matDialogRef.close(this.userForm.value);
    }
  }
}
