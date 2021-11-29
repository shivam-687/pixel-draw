import { ColorConfig } from './../pdColorConfig';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PixelDrawService {

  // tslint:disable-next-line: variable-name
  private modes = ['draw', 'erase', 'object'];

  private data = {
    pixelColor: '#242424',
    size: 10,
    drawColor: 'rgb(255, 0, 0)',
    mode: 'object'
  }


  private size: BehaviorSubject<number> = new BehaviorSubject<number>(this.data.size);
  private _size = this.size.asObservable();


  private isMouseDown = new BehaviorSubject<boolean>(false);
  private _isMouseDown = this.isMouseDown.asObservable();

  private mode = new BehaviorSubject<string>(this.data.mode);
  private _mode = this.mode.asObservable();

  private colorConfSubject = new BehaviorSubject<{pixelDefaultColor: string, drawColor: string}>({pixelDefaultColor: this.data.pixelColor, drawColor: this.data.drawColor});
  private _colorConfSubject = this.colorConfSubject.asObservable();

  private reset =  new BehaviorSubject<boolean>(false);
  private _reset = this.reset.asObservable();

  constructor() {
    const localData = JSON.parse(localStorage.getItem('pdData'));
    if(localData){
      this.data = localData;
      console.log("localdata", localData, this.data);
    }else{
      this.updateData();
    }

    this.initService();

  }

  initService(){
    this.setSize(this.data.size);
    this.setMode(this.data.mode);
    this.setColorConfig({pixelDefaultColor: this.data.pixelColor, drawColor: this.data.drawColor});
  }



  get size$(): Observable<number> {
    return this._size;
  }


  get mode$(): Observable<string> {
    return this._mode;
  }

  get isMouseDown$(): Observable<boolean> {
    return this._isMouseDown;
  }

  get colorConf$(): Observable<{pixelDefaultColor: string, drawColor: string}> {
    return this._colorConfSubject;
  }

  get reset$(): Observable<boolean> {
    return this._reset;
  }

  setReset(reset: boolean): void {
    this.reset.next(reset);
  }

  setSize(size: number): void {
    if (size >= 4 && size <= 100){
      this.size.next(size);
      this.updateDataByKey('size', size);
      return;
    }
    throw new Error('Invalid size : size must be between 4 to 100');
  }


  setMode(mode: string): void {
    if (this.modes.includes(mode)){
      console.log('CurrentMode is: ', mode);
      this.mode.next(mode);
      return;
    }
    throw new Error('Invalid mode');
  }

  setColorConfig(colorConfig: ColorConfig){
    this.data.drawColor = colorConfig.drawColor;
    this.data.pixelColor = colorConfig.pixelDefaultColor;
    this.colorConfSubject.next(colorConfig);

    this.updateData();
  }
  setMouseDownStatus(isMouseDown: boolean): void {
    // console.log('MouseDownStatus is: ', isMouseDown);
    this.isMouseDown.next(isMouseDown);
  }

  setColorConfiguration(colorConf: {pixelDefaultColor: string, drawColor: string}): void {
    this.colorConfSubject.next(colorConf);
  }

  private initData(){

  }

  private updateData(){
    const jData = JSON.stringify(this.data);
    localStorage.setItem('pdData', jData);
  }

  private updateDataByKey(key: string, value: any){
    const isKeyExists = Object.keys(this.data).includes(key);
    if(!isKeyExists){
      throw new Error("invalid key data!");
    }
    this.data[key] = value;
    this.updateData();
  }
}
