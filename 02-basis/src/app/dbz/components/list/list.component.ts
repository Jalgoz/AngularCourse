import { Component, EventEmitter, Input, Output } from '@angular/core';

import { v4 as uuid } from 'uuid';

import type { Character } from '../../interfaces/character.interface';

@Component({
  selector: 'app-dbz-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.sass',
})
export class ListComponent {
  @Output()
  public onEmitId: EventEmitter<string> = new EventEmitter();
  @Input()
  public characterList: Character[] = [
    {
      id: uuid(),
      name: 'Trunks',
      power: 10,
    },
  ];

  setEmitId(id?: string): void {
    if (!id) return;

    this.onEmitId.emit(id);
  }
}
