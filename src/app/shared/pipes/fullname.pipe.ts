import { Pipe, PipeTransform } from '@angular/core';
import { Student } from 'src/app/dashboard/pages/students/models';
import { User } from 'src/app/dashboard/pages/users/models';

@Pipe({
  name: 'fullname',
})
export class FullnamePipe implements PipeTransform {
  transform(value: User | Student, ...args: unknown[]): unknown {
    return value.name + ' ' + value.lastName;
  }
}
