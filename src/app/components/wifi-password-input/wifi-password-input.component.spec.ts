import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WifiPasswordInputComponent } from './wifi-password-input.component';

describe('WifiPasswordInputComponent', () => {
  let component: WifiPasswordInputComponent;
  let fixture: ComponentFixture<WifiPasswordInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WifiPasswordInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WifiPasswordInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
