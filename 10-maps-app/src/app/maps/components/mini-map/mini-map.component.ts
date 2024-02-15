import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';

import { Map, Marker } from 'mapbox-gl';

@Component({
  selector: 'mini-map',
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.css'],
})
export class MiniMapComponent implements AfterViewInit {
  @ViewChild('map')
  public divMap?: ElementRef;
  @Input()
  public lngLat?: [number, number];

  public ngAfterViewInit(): void {
    if (!this.divMap || !this.lngLat) {
      throw new Error('Html element or lngLat is not available');
    }

    const map = new Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: 14, // starting zoom
      interactive: false,
    });

    const marker = new Marker().setLngLat(this.lngLat).addTo(map);
  }
}
