import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsPageComponent } from './forms-page.component';

describe('FormsPageComponent', () => {
  let component: FormsPageComponent;
  let fixture: ComponentFixture<FormsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormsPageComponent]
    });
    fixture = TestBed.createComponent(FormsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
