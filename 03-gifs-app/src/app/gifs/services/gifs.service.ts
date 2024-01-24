import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import type { Gif, GifsResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root', // Because is global
})
export class GifsService {
  private _gifList: Gif[] = [];
  private _tagsHistory: string[] = [];
  private apiKey: string = 'XWzDAxk2aGJGqml4egCGbPHTDtCyNcWR';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {
    this.loadGifs();
  }

  public get tagsHistory(): string[] {
    return [...this._tagsHistory];
  }

  public get gifList(): Gif[] {
    return [...this._gifList];
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();

    if (this.tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0, 10);
  }

  private persistGifs(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadGifs(): void {
    if (!localStorage.getItem('history')) return;

    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);
    this.searchTag(this._tagsHistory.at(0)!);
  }

  public async searchTag(tag: string): Promise<void> {
    this.organizeHistory(tag);
    this.persistGifs();

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('q', tag)
      .set('limit', '10');

    this.http
      .get<GifsResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe((resp) => {
        this._gifList = resp.data;
      });
  }
}
