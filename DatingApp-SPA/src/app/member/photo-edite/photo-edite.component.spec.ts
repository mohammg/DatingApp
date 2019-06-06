import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoEditeComponent } from './photo-edite.component';

describe('PhotoEditeComponent', () => {
  let component: PhotoEditeComponent;
  let fixture: ComponentFixture<PhotoEditeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoEditeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoEditeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
