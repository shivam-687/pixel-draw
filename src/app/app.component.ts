import { PixelDrawService } from './services/pixel-draw.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pixel-draw';
  isDesktop = true;

  constructor(private pdService: PixelDrawService) {
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
      this.isDesktop = false;
    }
    window.addEventListener('mousedown', (e: Event) => {
      const targetElement: HTMLElement = e.target as HTMLElement;
      if (targetElement.classList.contains('pixel')) {
        this.pdService.setMouseDownStatus(true);
      }
    });
    window.addEventListener('mouseup', (e) => {
      const targetElement: HTMLElement = e.target as HTMLElement;
      if (targetElement.classList.contains('pixel')) {
        this.pdService.setMouseDownStatus(false);
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'e' && e.ctrlKey) {
        e.preventDefault();
        console.log('Change mode to: eraseMode' );
        this.pdService.setMode('erase');
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'd' && e.ctrlKey) {
        e.preventDefault();
        console.log('Change mode to: drawMode' );
        this.pdService.setMode('draw');
      }
    });
    window.addEventListener('keydown', (e) => {
      if (e.key === 'o' && e.ctrlKey) {
        e.preventDefault();
        console.log('Change mode to: objectMode' );
        this.pdService.setMode('object');
      }
    });
    window.addEventListener('keydown', (e) => {
      if (e.key === 'r' && e.ctrlKey) {
        e.preventDefault();
        console.log('Plane is reset' );
        this.pdService.setReset(true);
      }
    });
  }
}
