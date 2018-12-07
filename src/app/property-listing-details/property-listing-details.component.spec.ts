import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyListingDetailsComponent } from './property-listing-details.component';

describe('PropertyListingDetailsComponent', () => {
  let component: PropertyListingDetailsComponent;
  let fixture: ComponentFixture<PropertyListingDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyListingDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyListingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
