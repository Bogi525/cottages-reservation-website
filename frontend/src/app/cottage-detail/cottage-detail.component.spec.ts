import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CottageDetailComponent } from './cottage-detail.component';

describe('CottageDetailComponent', () => {
  let component: CottageDetailComponent;
  let fixture: ComponentFixture<CottageDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CottageDetailComponent]
    });
    fixture = TestBed.createComponent(CottageDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
