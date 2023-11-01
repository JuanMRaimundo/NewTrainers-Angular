import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './students.component';
import { StudentDetailComponent } from './components/student-detail/student-detail.component';
import { StudentDialogComponent } from './components/student-dialog/student-dialog.component';
import { StudentTableComponent } from './components/student-table/student-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentsRoutingModule } from './students-routing.module';

@NgModule({
  declarations: [
    StudentsComponent,
    StudentDetailComponent,
    StudentDialogComponent,
    StudentTableComponent,
  ],
  imports: [CommonModule, SharedModule, StudentsRoutingModule],
  exports: [StudentsComponent],
})
export class StudentsModule {}
