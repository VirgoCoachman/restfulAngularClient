import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarDialogFormComponent } from './car-dialog-form.component';

describe('CarDialogFormComponent', () => {
  let component: CarDialogFormComponent;
  let fixture: ComponentFixture<CarDialogFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarDialogFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarDialogFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
