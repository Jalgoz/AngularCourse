import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { getErrorFunction } from 'src/app/shared/helpers/errors';
import { GetError } from 'src/app/shared/interfaces/getError.interface';
import {
  GET_ERROR_TOKEN,
  GetMessageErrorsService,
} from 'src/app/shared/services/getMessageErrors.service';
import { ValidatorsService } from 'src/app/shared/services/validators.service';

@Component({
  selector: 'app-basic-page',
  templateUrl: './basic-page.component.html',
  styles: [],
  providers: [
    {
      provide: GetMessageErrorsService,
      useFactory: (getError: GetError) => new GetMessageErrorsService(getError),
      deps: [GET_ERROR_TOKEN],
    },
    {
      provide: GET_ERROR_TOKEN,
      useValue: getErrorFunction,
    },
  ],
})
export class BasicPageComponent implements OnInit {
  /* public myForm: FormGroup = new FormGroup(
    {
      name: new FormControl(''),
      price: new FormControl(0),
      inStorage: new FormControl(0),
    }
  );
 */
  public myForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
    private getMessageErrorsService: GetMessageErrorsService
  ) {
    this.myForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: [0, [Validators.required, Validators.min(0)]],
      inStorage: [0, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    // Here we can set the default values for the form
  }

  public isValidField(field: string): boolean | null {
    return this.validatorsService.isValidField(this.myForm, field);
  }

  getFieldError(field: string): string | null {
    return this.getMessageErrorsService.getFieldError(this.myForm, field);
  }

  public onSave(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);
    this.myForm.reset({ price: 0, inStorage: 0 });
  }
}
