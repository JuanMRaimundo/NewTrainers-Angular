import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FullnamePipe } from './pipes/fullname.pipe';
import { MatTableModule } from '@angular/material/table';
import { ErrorFormsPipe } from './pipes/error-forms.pipe';
import { MatListModule } from '@angular/material/list';
import { TitleFontDirective } from './directives/title-font.directive';

@NgModule({
  declarations: [FullnamePipe, ErrorFormsPipe, TitleFontDirective],
  imports: [CommonModule],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    FullnamePipe,
    MatTableModule,
    ErrorFormsPipe,
    MatListModule,
    TitleFontDirective,
  ],
})
export class SharedModule {}
