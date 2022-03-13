import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/Heroe';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(heroe: Heroe): string {
    if (!heroe) {
      return `assets/no-image.png`
    } else if (heroe.alt_img) {
      return heroe.alt_img
    }
    return `assets/heroes/${heroe.id}.jpg`;
  }

}
