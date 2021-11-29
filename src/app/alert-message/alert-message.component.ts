import { ThrowStmt } from '@angular/compiler';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.scss']
})
export class AlertMessageComponent implements OnInit {
  @Input('alert-data') data: {class: string, message: string, index: number};
  @Input() show: boolean = true;
  @Input() isAutoClose: boolean = true;
  @Output() autoClose = new EventEmitter<number>();
  timerId = 0;

  constructor() { }

  ngOnInit(): void {
    console.log(`Alert Index ${this.data.index} initialized`);
    if(this.isAutoClose && this.show){
      setTimeout(()=>{
        this.show = false;
        this.autoClose.emit(this.data.index);
        console.log("Alert Index ${this.data.index} auto closed");
      }, 2000);
    }
  }




}
