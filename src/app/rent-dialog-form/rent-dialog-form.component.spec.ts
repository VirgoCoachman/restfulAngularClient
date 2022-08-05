import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentDialogFormComponent } from './rent-dialog-form.component';

describe('RentDialogFormComponent', () => {
  let component: RentDialogFormComponent;
  let fixture: ComponentFixture<RentDialogFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentDialogFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentDialogFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
