import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PixelContainerComponent } from './pixel-container.component';

describe('PixelContainerComponent', () => {
  let component: PixelContainerComponent;
  let fixture: ComponentFixture<PixelContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PixelContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PixelContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
