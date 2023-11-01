import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesDialogComponent } from './courses-dialog.component';

describe('CoursesDialogComponent', () => {
  let component: CoursesDialogComponent;
  let fixture: ComponentFixture<CoursesDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesDialogComponent]
    });
    fixture = TestBed.createComponent(CoursesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
