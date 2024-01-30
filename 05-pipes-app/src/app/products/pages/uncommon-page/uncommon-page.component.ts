import { Component } from '@angular/core';
import { interval, tap } from 'rxjs';

@Component({
  selector: 'app-uncommon-page',
  templateUrl: './uncommon-page.component.html',
  styleUrls: ['./uncommon-page.component.scss'],
})
export class UncommonPageComponent {
  // i18nSelect
  public name: string = 'Jose';
  public gender: 'male' | 'female' = 'male';
  public clients: string[] = [
    'Maria',
    'Pedro',
    'Juan',
    'Eduardo',
    'Fernando',
    'Jose',
    'Esmeralda',
  ];
  public invitationMap = {
    male: '👦',
    female: '👧',
  };
  public clientsMap = {
    '=0': "we don't have any clients waiting.",
    '=1': 'we have 1 client waiting.',
    other: 'we have # clients waiting.',
  };

  public changeClient(): void {
    this.name = 'Esmeralda';
    this.gender = 'female';
  }

  public deleteClient(): void {
    this.clients.shift();
  }

  // KeyValue Pipe
  public person = {
    name: 'Jose',
    age: 28,
    address: 'Madrid, Spain',
  };

  // Async Pipe
  public myObservableTimer = interval(2000).pipe(
    tap((value) => console.log('tap: ', value))
  );

  public promiseValue: Promise<string> = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Promise resolved');
    }, 3500);
  });
}
