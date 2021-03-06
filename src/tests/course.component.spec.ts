import { TestBed, async } from '@angular/core/testing';
import { Component } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import * as moment from 'moment';
import { CourseComponent } from '../app/courses-list/course/course.component';
import { Course } from '../app/shared/courses/course.model';
import { CourseOutlineDirective } from '../app/courses-list/course-outline.directive';
import { CourseDurationPipe } from '../app/shared/courses/course-duration.pipe';
import { Outline, freshCourseDaysLimit } from '../app/courses-list/course.constants';

@Component({
  template: `
    <app-course
      [course]="course" (courseChangeEvent)="updateCourses($event)">
    </app-course>`
})
class TestHostComponent {
  course: Course = {
    id: 1,
    name: 'testhost course 1',
    date: new Date(),
    length: 60,
    description: 'desc 1'
  };
  updateCourses = jasmine.createSpy();
}

describe('CourseComponent', () => {
  let fixture;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CourseComponent,
        TestHostComponent,
        CourseOutlineDirective,
        CourseDurationPipe
      ],
      imports: [ RouterTestingModule ]
    })
    .compileComponents();
  }));

  describe('CourseComponent', () => {
    let component: CourseComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(CourseComponent);
      component = fixture.componentInstance;
    });

    it('should create', () => {
      expect(component).toBeDefined();
    });

    it('should recieve course object & capitalize course title', () => {
      const expectedCourse: Course = {
        id: 1,
        name: 'course 1',
        date: new Date(),
        length: 60,
        description: 'desc 1'
      };
      expect(component.course).not.toBeDefined();
      component.course = expectedCourse;
      fixture.detectChanges();
      const courseTitle = fixture.nativeElement.querySelector('.course-title');
      expect(courseTitle.textContent).toEqual(expectedCourse.name.toUpperCase());
    });

    it('should raise delete event', () => {
      let deleteEvent;
      component.course = {
        id: 1,
        name: 'course 1',
        date: new Date(),
        length: 60,
        description: 'desc 1'
      };
      component.courseChangeEvent.subscribe(e => deleteEvent = e);
      const deleteButton = fixture.nativeElement.querySelector('.delete-button');
      deleteButton.click();
      expect(deleteEvent.type).toEqual('delete');
    });

    it('should return proper border color for upcoming course', () => {
      component.course = {
        id: 1,
        name: 'course',
        date: moment().add(4, 'days').toDate(),
        length: 40,
        description: ''
      };
      expect(component.getCourseOutlineColor()).toBe(Outline.upcoming);
    });

    it('should return proper border color for fresh course', () => {
      component.course = {
        id: 1,
        name: 'course',
        date: moment().subtract(freshCourseDaysLimit - 1, 'days').toDate(),
        length: 40,
        description: ''
      };
      fixture.detectChanges();
      expect(component.getCourseOutlineColor()).toBe(Outline.fresh);
    });

    it('should return proper border color for regular course', () => {
      component.course = {
        id: 1,
        name: 'course',
        date: moment().subtract(freshCourseDaysLimit + 1, 'days').toDate(),
        length: 40,
        description: ''
      };
      fixture.detectChanges();
      expect(component.getCourseOutlineColor()).toBe(Outline.default);
    });

    it('should not have star icon and background as not top rated', () => {
      component.course = {
        id: 1,
        name: 'course',
        date: new Date(),
        length: 40,
        description: ''
      };
      fixture.detectChanges();
      const el = fixture.nativeElement;
      const courseItem = el.querySelector('.card-body');
      const starIcon = el.querySelector('img');
      expect(courseItem.className).not.toContain('bg-light');
      expect(starIcon).toBeFalsy()
    });

    it('should have star icon and background as top rated course', () => {
      component.course = {
        id: 1,
        name: 'course',
        date: new Date(),
        length: 40,
        description: '',
        isTopRated: true
      };
      fixture.detectChanges();
      const el = fixture.nativeElement;
      const courseItem = el.querySelector('.card-body');
      const starIcon = el.querySelector('img');
      expect(courseItem.className).toContain('bg-light');
      expect(starIcon).toBeDefined()
  });
});

  describe('CourseComponent (test host)', () => {
    let testHost: TestHostComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(TestHostComponent);
      testHost = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(testHost).toBeDefined();
    });

    it('should display course title', () => {
      fixture.detectChanges();
      const courseTitle = fixture.nativeElement.querySelector('.course-title');
      expect(courseTitle.textContent.toLowerCase()).toEqual('testhost course 1');
    });

    it('should raise delete event', () => {
      const deleteButton = fixture.nativeElement.querySelector('.delete-button');
      deleteButton.click();
      expect(testHost.updateCourses).toHaveBeenCalled();
    });
  });
});
