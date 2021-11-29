import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PixelContainerComponent } from './pixel-container/pixel-container.component';
import { PixelComponent } from './pixel/pixel.component';
import { ColorPickerComponent } from './color-picker/color-picker.component';
import {ReactiveFormsModule, FormsModule } from '@angular/forms'
import { ColorPickerModule } from 'ngx-color-picker';
import { AlertComponent } from './alert/alert.component';
import { AlertMessageComponent } from './alert-message/alert-message.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PixelContainerComponent,
    PixelComponent,
    ColorPickerComponent,
    AlertComponent,
    AlertMessageComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    ColorPickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
