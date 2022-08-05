import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsDialogFormComponent } from './clients-dialog-form.component';

describe('DialogFormComponent', () => {
  let component: ClientsDialogFormComponent;
  let fixture: ComponentFixture<ClientsDialogFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientsDialogFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientsDialogFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
