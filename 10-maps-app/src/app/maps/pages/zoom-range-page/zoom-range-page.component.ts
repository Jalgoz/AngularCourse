import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';

import { LngLat, Map } from 'mapbox-gl';

@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrls: ['./zoom-range-page.component.css'],
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {
  @ViewChild('map')
  public divMap?: ElementRef;

  public zoom: number = 10;
  public map?: Map;
  public currentCenter: LngLat = new LngLat(
    -68.0878549061249,
    -16.526680116907713
  );

  // Use the ngAfterViewInit to make sure the divMap is available to use when the map is created
  public ngAfterViewInit(): void {
    if (!this.divMap) throw new Error('Html element is not available');

    this.map = new Map({
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentCenter, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });

    this.mapListeners();
  }

  public ngOnDestroy(): void {
    this.map?.remove();
  }

  public mapListeners(): void {
    if (!this.map) throw new Error('Map is not available');

    this.map.on('zoom', (event) => {
      if (!this.map) throw new Error('Map is not available');

      if (this.map.getZoom() > 18) {
        this.map.zoomTo(18);
      }

      if (this.map.getZoom() < 2) {
        this.map.zoomTo(2);
      }

      this.zoom = this.map?.getZoom() || 10;
    });

    this.map.on('move', (event) => {
      this.currentCenter =
        this.map?.getCenter() ||
        new LngLat(-68.0878549061249, -16.526680116907713);
    });
  }

  public zoomIn(): void {
    if (!this.map) throw new Error('Map is not available');
    if (this.map.getZoom() >= 18) return;

    this.map.zoomIn();
  }

  public zoomOut(): void {
    if (!this.map) throw new Error('Map is not available');
    if (this.map.getZoom() <= 2) return;

    this.map.zoomOut();
  }

  public zoomRangeChange(value: string): void {
    if (!this.map) throw new Error('Map is not available');

    this.zoom = Number(value);
    this.map.setZoom(this.zoom);
  }
}
