import { Component, Input } from '@angular/core';

@Component({
  selector: 'auth-button-form',
  templateUrl: './button-form.component.html',
  styles: [],
})
export class ButtonFormComponent {
  @Input() public label: string = '';
  @Input() public type: string = '';
}
