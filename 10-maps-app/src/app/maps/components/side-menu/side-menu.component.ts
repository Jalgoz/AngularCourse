import { Component } from '@angular/core';

interface MenuItem {
  title: string;
  link: string;
  icon?: string;
}

@Component({
  selector: 'maps-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css'],
})
export class SideMenuComponent {
  public menuItems: MenuItem[] = [
    { title: 'FullScreen', link: '/maps/fullscreen' },
    { title: 'Zoom', link: '/maps/zoom-range' },
    { title: 'Markers', link: '/maps/markers' },
    { title: 'Houses', link: '/maps/properties' },
  ];
}
