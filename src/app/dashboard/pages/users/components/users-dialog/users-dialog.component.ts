import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { User } from '../../models';
import { UsersService } from '../../user.service';

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
    @Inject(MAT_DIALOG_DATA) public userID?: number
  ) {
    console.log('UserID:', userID);

    if (userID) {
      this.usersService.getUserByID$(userID).subscribe({
        next: (u) => {
          console.log('User data:', u);
          if (u) {
            this.userForm.patchValue(u);
          }
        },
      });
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
