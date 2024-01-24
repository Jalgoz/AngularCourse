import { Component } from '@angular/core';

import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  constructor(private gifsService: GifsService) {}

  public get tags() {
    return this.gifsService.tagsHistory;
  }

  public loadTag(tag: string): void {
    this.gifsService.searchTag(tag);
  }
}
