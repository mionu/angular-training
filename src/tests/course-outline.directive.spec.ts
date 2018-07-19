import { Component } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { CourseOutlineDirective } from '../app/courses-list/course-outline.directive';

@Component({
  template: `<div [appCourseOutline]="color">{{color}}</div>`
})
class TestComponent {
  color = 'primary';
}

describe('CourseOutlineDirective', () => {
  let fixture;
  let testComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestComponent,
        CourseOutlineDirective
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    testComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should set class for component', () => {
    const el = fixture.nativeElement.querySelector('div');
    expect(el.className).toContain('border-primary');
  });
});
