import { AlertType } from './../alert-type';
import { Subject } from 'rxjs';
import { AlertService } from './../services/alert.service';
import { Component, OnInit } from '@angular/core';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  alerts = {
    info: 'alert-info',
    danger: 'alert-danger',
    success: 'alert-success',
    warning: 'alert-warning'
  }
  alertsArray: AlertType[] = [];
  private counter = 0;

  private subsink = new SubSink();

  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
    this.subsink.add(this.alertService.error$.subscribe(error => {
      this.alertsArray.push(error);
      console.log(`${error} is pushed size: ${this.alertsArray.length}`);
    }))
  }

  onAutoClose(index: number){

  }

  addError(){
    const count = this.counter++;
    this.alertService.setError({message: `This is alert ${count}`, type: 'info'});
  }

}
