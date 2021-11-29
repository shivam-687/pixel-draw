import { SubSink } from 'subsink';
import { PixelDrawService } from './../services/pixel-draw.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { nanoid } from 'nanoid';

@Component({
  selector: 'app-pixel-container',
  templateUrl: './pixel-container.component.html',
  styleUrls: ['./pixel-container.component.scss']
})
export class PixelContainerComponent implements OnInit {
  private containerSize = 800;
  private pdServiceSubscription: Subscription;
  private subSink: SubSink = new SubSink();
  size = 50;
  pixelArray = [];
  // tslint:disable-next-line: no-trailing-whitespace
  constructor(private pdService: PixelDrawService) {

  }


  ngOnInit(): void {
    this.pdServiceSubscription = this.pdService.size$.subscribe(size => {
      this.size = size;
      this.pixelArray = this.createPixelArray();
    });

    this.subSink.add(this.pdService.size$.subscribe(size => this.changeSize(size)));

    for (let index = 0; index < this.size * this.size; index++) {
      let pixel = {
        id: nanoid(),
        color: undefined
      };
      this.pixelArray.push(pixel);
    }
  }

  onChangeColor(color: string, pixelId: string) {
    console.log(color, pixelId);
  }

  createPixelArray() {
    let pixelArray = [];
    for (let index = 0; index < this.size * this.size; index++) {
      let pixel = {
        id: nanoid(),
        color: undefined
      };
      pixelArray.push(pixel);
    }
    return pixelArray;
  }

  updatePixel(color, pixel) {
    const pix = this.pixelArray.find(p => p.id === pixel.id);
    pix.color = color;
  }

  changeSize(size: number){
    this.size = size;
    this.createPixelArray();
  }



}
