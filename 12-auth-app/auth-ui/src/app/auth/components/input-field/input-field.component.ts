import { Component, Input, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GetErrorsService } from 'src/app/shared/services/get-errors.service';
import { ValidationService } from 'src/app/shared/services/validation.service';

@Component({
  selector: 'auth-input-field',
  templateUrl: './input-field.component.html',
  styles: [],
})
export class InputFieldComponent {
  @Input() public field: string = '';
  @Input() public type: string = '';
  @Input() public myForm?: FormGroup;
  private validationService = inject(ValidationService);
  private getErrorsService = inject(GetErrorsService);

  public getErrors(field: string, message?: string): string | null {
    return this.getErrorsService.getFieldError(
      this.myForm!.get(field) as FormControl,
      message
    );
  }

  public isValidField(field: string): boolean {
    return this.validationService.isValidField(this.myForm!, field);
  }
}
