import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import { Map, LngLat, Marker } from 'mapbox-gl';

import { getRgbFromHexColor } from '../../utils/getRgbFromHexColor';
import type { PlainMarker } from '../../interfaces/plainMarker.interface';
import type { MarkerAndColor } from '../../interfaces/markerAndColor.interface';

@Component({
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.css'],
})
export class MarkersPageComponent implements AfterViewInit {
  @ViewChild('map')
  public divMap?: ElementRef;

  public markers: MarkerAndColor[] = [];
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
      zoom: 14, // starting zoom
    });

    /* const markerHtml = document.createElement('div');
    markerHtml.innerHTML = 'Jose Lozada';

    const marker = new Marker({
      // color: 'red',
      element: markerHtml,
    })
      .setLngLat(this.currentCenter)
      .addTo(this.map); */

    this.readFromLocalStorage();
  }

  public createMarker(): void {
    if (!this.map) return;

    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );
    const lngLat = this.map?.getCenter();

    this.addMarker(lngLat, color);
    this.saveToLocalStorage();
  }

  public addMarker(lngLat: LngLat, color: string): void {
    if (!this.map) return;

    const marker = new Marker({
      color,
      draggable: true,
    })
      .setLngLat(lngLat)
      .addTo(this.map);

    this.markers.push({ color, marker });

    // This is a listener for the dragend event
    marker.on('dragend', () => {
      // We can call saveToLocalStorage here because marker is a reference to the marker in the array, so we are modifying the same object
      this.saveToLocalStorage();
    });
  }

  public deleteMarker(index: number): void {
    console.log('delete', index);
    this.markers[index].marker.remove();
    this.markers.splice(index, 1);
  }

  public flyTo(marker: Marker): void {
    if (!this.map) return;

    this.map.flyTo({
      zoom: 15,
      center: marker.getLngLat(),
    });
  }

  public saveToLocalStorage(): void {
    const plainMarkers = this.markers.map(({ color, marker }) => {
      return {
        color,
        lngLat: marker.getLngLat().toArray(),
      };
    });

    localStorage.setItem('plainMarkers', JSON.stringify(plainMarkers));
  }

  public readFromLocalStorage(): void {
    const plainMarkersString = localStorage.getItem('plainMarkers');

    if (!plainMarkersString) return;

    const plainMarkers: PlainMarker[] = JSON.parse(plainMarkersString);

    plainMarkers.forEach(({ color, lngLat }) => {
      const [lng, lat] = lngLat;
      const coords = new LngLat(lng, lat);
      this.addMarker(coords, color);
    });
  }

  public setColor(color: string, alpha: number): string {
    return getRgbFromHexColor(color, alpha);
  }
}
