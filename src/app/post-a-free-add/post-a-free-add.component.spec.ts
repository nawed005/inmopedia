import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostAFreeAddComponent } from './post-a-free-add.component';

describe('PostAFreeAddComponent', () => {
  let component: PostAFreeAddComponent;
  let fixture: ComponentFixture<PostAFreeAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostAFreeAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostAFreeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
