import { ColorConfig } from './../pdColorConfig';
import { SubSink } from 'subsink';
import { PixelDrawService } from './../services/pixel-draw.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  color: string = '';
  colorData: ColorConfig = {
    pixelDefaultColor: '',
    drawColor: ''
  }

  private subSink: SubSink = new SubSink();
  constructor(private pdService: PixelDrawService) { }
  currentSize: number;

  currentMode: string;

  ngOnInit(): void {
    this.subSink.add(this.pdService.mode$.subscribe(mode => {
      this.currentMode = mode;
    }));

    this.subSink.add(this.pdService.size$.subscribe(size => {
      this.currentSize = size;
    }));

    this.subSink.add(this.pdService.colorConf$.subscribe(colorData => {
      this.colorData = colorData;
      console.log("ColorData: ", this.colorData);
    }));
  }

  setToDrawMode(event: Event) {
    this.pdService.setMode('draw');
  }

  setToEraseMode(event: Event) {
    this.pdService.setMode('erase');
  }

  reset(event: Event) {
    this.pdService.setReset(true);
  }

  setObjectMode(event: Event) {
    this.pdService.setMode('object');
  }

  setGridSize(event:Event){
    this.pdService.setReset(true);
    this.pdService.setSize(this.currentSize);
    console.log("Size: ", this.currentSize);
  }

  onColorChange(event: Event){
    const ele: any = event.target as any;
    console.log("ColorPicker color change: ", ele.value);
    this.colorData.drawColor = ele.value;
    this.pdService.setColorConfig(this.colorData);
  }



}
