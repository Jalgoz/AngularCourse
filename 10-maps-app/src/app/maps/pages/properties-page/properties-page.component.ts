import { Component } from '@angular/core';
import { House, housesInformation } from '../../interfaces/house.interface';

@Component({
  templateUrl: './properties-page.component.html',
  styleUrls: ['./properties-page.component.css'],
})
export class PropertiesPageComponent {
  public houses: House[] = housesInformation;
}
