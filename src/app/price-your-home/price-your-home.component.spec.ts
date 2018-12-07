import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceYourHomeComponent } from './price-your-home.component';

describe('PriceYourHomeComponent', () => {
  let component: PriceYourHomeComponent;
  let fixture: ComponentFixture<PriceYourHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceYourHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceYourHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
