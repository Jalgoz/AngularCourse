import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]',
})
export class CustomLabelDirective implements OnInit {
  private _color?: string;
  private htmlElement?: ElementRef<HTMLElement>;
  private _errors?: ValidationErrors | null | undefined;

  @Input()
  public set color(value: string) {
    this._color = value;
    this.setStyle();
  }

  @Input()
  public set errors(value: ValidationErrors | null | undefined) {
    this._errors = value;
    this.setErrorMessage();
  }

  constructor(private element: ElementRef<HTMLElement>) {
    this.htmlElement = element;
  }

  public ngOnInit(): void {
    if (!this.htmlElement) return;

    this.htmlElement.nativeElement.style.color = this._color!;
  }

  public setStyle(): void {
    if (!this.htmlElement) return;

    this.htmlElement.nativeElement.style.color = this._color!;
  }

  public setErrorMessage(): void {
    if (!this.htmlElement) return;
    if (!this._errors) {
      this.htmlElement.nativeElement.innerHTML = '';

      return;
    }

    const errors = Object.keys(this._errors);

    errors.forEach((error) => {
      const message = this.getErrorMessage(error);
      this.htmlElement!.nativeElement.innerHTML = message;
    });
  }

  private getErrorMessage(error: string): string {
    switch (error) {
      case 'required':
        return 'This field is required';
      case 'minlength':
        return `This field is too short (min ${
          this._errors![error].requiredLength
        } characters)`;
      case 'email':
        return 'This field is not an email';
      default:
        return 'This field is invalid';
    }
  }
}
