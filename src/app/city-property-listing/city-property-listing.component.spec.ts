import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CityPropertyListingComponent } from './city-property-listing.component';

describe('CityPropertyListingComponent', () => {
  let component: CityPropertyListingComponent;
  let fixture: ComponentFixture<CityPropertyListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CityPropertyListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityPropertyListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
