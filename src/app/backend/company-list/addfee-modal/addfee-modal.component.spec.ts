import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddfeeModalComponent } from './addfee-modal.component';

describe('AddfeeModalComponent', () => {
  let component: AddfeeModalComponent;
  let fixture: ComponentFixture<AddfeeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddfeeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddfeeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
