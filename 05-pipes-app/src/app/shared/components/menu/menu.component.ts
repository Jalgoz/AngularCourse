import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'shared-menu',
  templateUrl: './menu.component.html',
  styles: [],
})
export class MenuComponent implements OnInit {
  public menuItems: MenuItem[] = [];

  ngOnInit(): void {
    this.menuItems = [
      {
        label: 'Pipes Of Angular',
        icon: 'pi pi-desktop',
        items: [
          {
            label: 'Date and Texts',
            icon: 'pi pi-align-left',
            routerLink: '/',
          },
          {
            label: 'Numbers',
            icon: 'pi pi-dollar',
            routerLink: 'numbers',
          },
          {
            label: 'No common',
            icon: 'pi pi-globe',
            routerLink: 'uncommon',
          },
        ],
      },
      {
        label: 'Custom pipes',
        icon: 'pi pi-cog',
        items: [
          {
            label: 'Custom pipes',
            icon: 'pi pi-cog',
            routerLink: 'custom',
          },
        ],
      },
    ];
  }
}
