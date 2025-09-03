import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCottageComponent } from './edit-cottage.component';

describe('EditCottageComponent', () => {
  let component: EditCottageComponent;
  let fixture: ComponentFixture<EditCottageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditCottageComponent]
    });
    fixture = TestBed.createComponent(EditCottageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
