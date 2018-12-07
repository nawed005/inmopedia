import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralComponentComponent } from './general-component.component';

describe('GeneralComponentComponent', () => {
  let component: GeneralComponentComponent;
  let fixture: ComponentFixture<GeneralComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
