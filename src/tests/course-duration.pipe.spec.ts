import { CourseDurationPipe } from '../app/shared/courses/course-duration.pipe';
import { Component } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';

@Component({
  template: `
  <div>{{duration | courseDuration}}</div>`
})
class TestComponent {
  duration: number = 0;
}

describe('CourseDurationPipe', () => {
  let fixture;
  let testComponent: TestComponent;
  let el;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestComponent,
        CourseDurationPipe
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    testComponent = fixture.componentInstance;
    el = fixture.nativeElement;
  });

  it('should create an instance', () => {
    const pipe = new CourseDurationPipe();
    expect(pipe).toBeTruthy();
  });

  it('should transform minutes to "hh h mm min" format', () => {
    expect(new CourseDurationPipe().transform(70)).toBe('1h 10min');
  });

  it('should not display hours if duration < 60', () => {
    testComponent.duration = 30;
    fixture.detectChanges();
    expect(el.textContent.trim()).toBe('30min');
  });

  it('should not display minutes if duration id divisible by 60', () => {
    testComponent.duration = 120;
    fixture.detectChanges();
    expect(el.textContent.trim()).toBe('2h');
  });
});
