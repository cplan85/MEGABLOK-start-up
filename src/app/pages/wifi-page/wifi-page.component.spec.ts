import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WifiPageComponent } from './wifi-page.component';

describe('WifiPageComponent', () => {
  let component: WifiPageComponent;
  let fixture: ComponentFixture<WifiPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WifiPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WifiPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
