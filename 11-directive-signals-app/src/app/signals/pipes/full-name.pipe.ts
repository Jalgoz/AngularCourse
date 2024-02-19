import { Pipe, PipeTransform } from '@angular/core';

import type { User } from '../interfaces/user.interface';

@Pipe({
  name: 'fullName',
})
export class FullNamePipe implements PipeTransform {
  transform(user: User | undefined): unknown {
    return user ? user.first_name + ' ' + user.last_name : '';
  }
}
