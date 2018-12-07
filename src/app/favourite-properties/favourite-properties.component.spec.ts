import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouritePropertiesComponent } from './favourite-properties.component';

describe('FavouritePropertiesComponent', () => {
  let component: FavouritePropertiesComponent;
  let fixture: ComponentFixture<FavouritePropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavouritePropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavouritePropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
