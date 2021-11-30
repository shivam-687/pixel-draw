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


  private subsink = new SubSink();

  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
    this.subsink.add(this.alertService.alert$.subscribe(error => {
      this.alertsArray.push(error);
      console.log(`${error} is pushed size: ${this.alertsArray.length}`);
    }))
  }

  onAlertClose(index: number){

    this.alertsArray.splice(index, 1);
    this.alertsArray.forEach(element => {
      console.log(JSON.parse(JSON.stringify(element)));
    });
  }


}
