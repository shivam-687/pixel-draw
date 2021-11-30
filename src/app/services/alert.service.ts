import { AlertType } from './../alert-type';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private alert = new Subject<AlertType>();
  private _alert = this.alert.asObservable();
  constructor() { }

  get alert$(){
    return this._alert;
  }

  private setAlert(error: AlertType){
    this.alert.next(error);
  }

  success(message: string){
    this.setAlert({
      message,
      type: 'success'
    });
  }

  error(message: string){
    this.setAlert({
      message,
      type: 'danger'
    });
  }

  warning(message: string){
    this.setAlert({
      message,
      type: 'warning'
    });
  }

  info(message: string){
    this.setAlert({
      message,
      type: 'info'
    });
  }

}
