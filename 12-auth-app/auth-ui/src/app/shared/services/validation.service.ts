import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  public isValidField(form: FormGroup, field: string): boolean {
    return form.get(field)!.valid || !form.get(field)!.touched;
  }
}
