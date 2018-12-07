import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovePropertyComponent } from './approve-property.component';

describe('ApprovePropertyComponent', () => {
  let component: ApprovePropertyComponent;
  let fixture: ComponentFixture<ApprovePropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovePropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovePropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
