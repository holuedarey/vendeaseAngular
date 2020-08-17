import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepurchaseComponent } from './repurchase.component';

describe('RepurchaseComponent', () => {
  let component: RepurchaseComponent;
  let fixture: ComponentFixture<RepurchaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepurchaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
