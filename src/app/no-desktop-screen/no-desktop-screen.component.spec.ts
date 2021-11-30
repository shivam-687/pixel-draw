import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoDesktopScreenComponent } from './no-desktop-screen.component';

describe('NoDesktopScreenComponent', () => {
  let component: NoDesktopScreenComponent;
  let fixture: ComponentFixture<NoDesktopScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoDesktopScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoDesktopScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
