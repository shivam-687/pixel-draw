import { AlertType } from './../alert-type';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private error = new Subject<AlertType>();
  private _error = this.error.asObservable();
  constructor() { }

  get error$(){
    return this._error;
  }

  setError(error: AlertType){
    this.error.next(error);
  }

}
