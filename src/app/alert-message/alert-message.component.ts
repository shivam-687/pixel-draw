import { ThrowStmt } from '@angular/compiler';
import { Component, Input, OnInit, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.scss']
})
export class AlertMessageComponent implements OnInit {
  @Input('alert-data') data: {class: string, message: string, index: number};
  @Input() show: boolean = true;
  @Input() isAutoClose: boolean = true;
  @Output() close = new EventEmitter<number>();
  timerId = 0;

  constructor() { }

  ngOnInit(): void {
    console.log(`Alert Index ${this.data.index} initialized`);
  }

  onClose(){
    this.close.emit(this.data.index);
    console.log(`Alert Index ${this.data.index} closed`);
  }




}
