import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsPageComponent } from './forms-page.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FormsPageComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  exports: [FormsPageComponent],
})
export class FormsPageModule {}
