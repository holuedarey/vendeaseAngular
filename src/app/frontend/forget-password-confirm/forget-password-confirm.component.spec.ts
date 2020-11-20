import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetPasswordConfirmComponent } from './forget-password-confirm.component';

describe('ForgetPasswordConfirmComponent', () => {
  let component: ForgetPasswordConfirmComponent;
  let fixture: ComponentFixture<ForgetPasswordConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgetPasswordConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgetPasswordConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
