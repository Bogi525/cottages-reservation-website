import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationForm1Component } from './reservation-form1.component';

describe('ReservationForm1Component', () => {
  let component: ReservationForm1Component;
  let fixture: ComponentFixture<ReservationForm1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservationForm1Component]
    });
    fixture = TestBed.createComponent(ReservationForm1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
