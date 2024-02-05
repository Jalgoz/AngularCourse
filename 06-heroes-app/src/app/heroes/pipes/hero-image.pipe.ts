import { Pipe, PipeTransform } from '@angular/core';

import type { Hero } from '../interfaces/hero.interface';

@Pipe({
  name: 'heroImage',
})
export class HeroImagePipe implements PipeTransform {
  private defaultImage: string = 'assets/no-image.png';

  transform(hero: Hero): Promise<string> {
    if (!hero.id && !hero.alt_img) return Promise.resolve(this.defaultImage);

    if (hero.alt_img) {
      return new Promise<string>((resolve, reject) => {
        const img = new Image();
        img.src = hero.alt_img!;

        img.onload = () => resolve(hero.alt_img!);
        img.onerror = () => resolve(this.defaultImage);
      });
    }

    return Promise.resolve(`assets/heroes/${hero.id}.jpg`);
  }
}
