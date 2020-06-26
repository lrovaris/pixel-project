import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaletteService {

  constructor() { }

  palettes: any;

  setPalettes(palettes) {
    this.palettes = palettes;
  }

  getPalettes() {
    return this.palettes;
  }
}
