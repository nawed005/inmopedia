import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialTypeComponent } from './tutorial-type.component';

describe('TutorialTypeComponent', () => {
  let component: TutorialTypeComponent;
  let fixture: ComponentFixture<TutorialTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorialTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
