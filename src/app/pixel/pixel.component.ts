import { PixelDrawService } from './../services/pixel-draw.service';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { nanoid } from 'nanoid';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-pixel',
  templateUrl: './pixel.component.html',
  styleUrls: ['./pixel.component.scss']
})
export class PixelComponent implements OnInit, AfterViewInit {

  private subsink = new SubSink();
  colorConfig: any;
  color: string;
  mode = 'draw';
  isMouseDown = false;
  @ViewChild('pixel') pixelElement: ElementRef;
  @Output() changedColor = new EventEmitter<string>();
  @Input() pixelId = nanoid();

  constructor(private pdService: PixelDrawService) { }

  ngOnInit(): void {
    this.subsink.add(this.pdService.mode$.subscribe(mode => {
      this.mode = mode;
    }));

    this.subsink.add(this.pdService.colorConf$.subscribe(colorConf => {
      this.colorConfig = colorConf;
    }));
    this.subsink.add(this.pdService.isMouseDown$.subscribe(isMouseDown => {
      this.isMouseDown = isMouseDown;
    }));
    this.subsink.add(this.pdService.reset$.subscribe(isReset => {
      if(isReset) {
        this.reset();
      }
    }));

    this.color = this.colorConfig.pixelDefaultColor;
    this.changedColor.emit(this.color);

  }

  onMouseOver(event: Event): void {
    const ele = event.target as HTMLElement;
    if (ele.classList.contains('pixel') && this.isMouseDown) {
      this.processAction(ele);
    }
  }

  onClick(event: Event): void {
    const ele = event.target as HTMLElement;
    if (ele.classList.contains('pixel')) {
      this.processAction(ele);
    }
  }

  private drawMode(element: HTMLElement, color: string): void {
    element.style.backgroundColor = color;
  }

  private eraseMode(element: HTMLElement): void {
    element.style.backgroundColor = this.colorConfig.pixelDefaultColor;
  }

  private processAction(ele: HTMLElement): void {

    switch (this.mode) {
      case 'draw':
        this.color = this.colorConfig.drawColor;
        this.drawMode(ele, this.color);
        this.changedColor.emit(this.color);
        break;
      case 'erase':
        this.color = this.colorConfig.pixelDefaultColor;
        this.eraseMode(ele);
        this.changedColor.emit(this.color);
        break;
    }

  }


  reset(): void{
    this.color = this.colorConfig.pixelDefaultColor;
    this.changedColor.emit(this.color);
  }

  ngOnDestroy(): void {
    this.subsink.unsubscribe();
  }


  ngAfterViewInit(){
    // const ele: HTMLElement = this.pixelElement.nativeElement as HTMLElement;
    // const pixelWidth = ele.clientWidth;
    // this.pixelElement.nativeElement.style.height = pixelWidth + 'px';
    // console.log("PixelWidth: ", pixelWidth);
  }
}
