import { Pipe, PipeTransform } from '@angular/core';
import { User } from 'src/app/dashboard/pages/users/models';

@Pipe({
  name: 'fullname',
})
export class FullnamePipe implements PipeTransform {
  transform(value: User, ...args: unknown[]): unknown {
    return value.name + ' ' + value.lastName;
  }
}
