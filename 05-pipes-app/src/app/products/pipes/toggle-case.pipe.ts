import { Pipe, PipeTransform } from '@angular/core';

// jose | toggleCase: 'upper' -> JOSE
// JOSE | toggleCase: 'lower' -> jose
@Pipe({
  name: 'toggleCase',
})
export class ToggleCasePipe implements PipeTransform {
  transform(value: string, toUpper: boolean = false): string {
    return toUpper ? value.toUpperCase() : value.toLowerCase();
  }
}
