import 'p5/global';
import * as p5 from 'p5';

declare global {
  const p5: typeof p5;
}

declare module 'p5' {
  export interface p5InstanceExtensions {
    loadGif(path: string): p5.Image;
  }

  export class Image {
    width: number;
    height: number;
    pixels: number[];
    modified: boolean;

    constructor(width: number, height: number, pInst: p5);

    loadPixels(): void;
    updatePixels(x?: number, y?: number, w?: number, h?: number): void;
    get(x: number, y: number, w?: number, h?: number): p5.Image | [number, number, number, number];
    set(x: number, y: number, color: number | [number, number, number, number]): void;
    resize(width: number, height: number): void;
    copy(
      srcImage: p5.Image,
      sx: number,
      sy: number,
      sw: number,
      sh: number,
      dx: number,
      dy: number,
      dw: number,
      dh: number
    ): void;
    mask(srcImage: p5.Image): void;
    filter(filterType: string, filterParam?: number): void;
    blend(
      srcImage: p5.Image,
      sx: number,
      sy: number,
      sw: number,
      sh: number,
      dx: number,
      dy: number,
      dw: number,
      dh: number,
      blendMode: string
    ): void;
    save(filename: string, extension: string): void;
    delete(): void;
  }
}
