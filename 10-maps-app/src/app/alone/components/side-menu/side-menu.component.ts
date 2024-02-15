import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

interface MenuItem {
  title: string;
  link: string;
  icon?: string;
}

@Component({
  standalone: true,
  selector: 'side-menu',
  imports: [CommonModule, RouterModule],
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css'],
})
export class SideMenuComponent {
  public menuItems: MenuItem[] = [
    { title: 'FullScreen', link: '/maps/fullscreen' },
    { title: 'Zoom', link: '/maps/zoom-range' },
    { title: 'Markers', link: '/maps/markers' },
    { title: 'Houses', link: '/maps/properties' },
    { title: 'Alone Page', link: '/alone' },
  ];
}
