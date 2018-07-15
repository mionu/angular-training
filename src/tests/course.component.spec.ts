import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Component, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { CourseComponent } from '../app/courses-list/course/course.component';
import { Course } from '../app/courses-list/course.model';
import { CourseOutlineDirective } from '../app/courses-list/course-outline.directive';
import { CourseDurationPipe } from '../app/courses-list/course-duration.pipe';
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
    title: 'testhost course 1',
    creationDate: moment('03-15-2017', 'MM-DD-YYYY').toDate(),
    duration: 60,
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

    it('should recieve course object', () => {
      const expectedCourse: Course = {
        id: 1,
        title: 'course 1',
        creationDate: moment('03-15-2017', 'MM-DD-YYYY').toDate(),
        duration: 60,
        description: 'desc 1'
      };
      expect(component.course).not.toBeDefined();
      component.course = expectedCourse;
      fixture.detectChanges();
      const courseTitle = fixture.nativeElement.querySelector('.course-title');
      expect(courseTitle.textContent.toLowerCase()).toEqual(expectedCourse.title.toLowerCase());
    });

    it('should raise delete event', () => {
      let deleteEvent;
      component.course = {
        id: 1,
        title: 'course 1',
        creationDate: moment('03-15-2017', 'MM-DD-YYYY').toDate(),
        duration: 60,
        description: 'desc 1'
      };
      component.courseChangeEvent.subscribe(e => deleteEvent = e);
      const deleteButton = fixture.nativeElement.querySelector('.delete-button');
      deleteButton.click();
      expect(deleteEvent.event).toEqual('delete');
    });

    it('should return proper border color for upcoming course', () => {
      component.course = {
        id: 1,
        title: 'course',
        creationDate: moment().add(4, 'days').toDate(),
        duration: 40,
        description: ''
      };
      fixture.detectChanges();
      expect(component.getCourseOutlineColor()).toBe(Outline.upcoming);
    });

    it('should return proper border color for fresh course', () => {
      component.course = {
        id: 1,
        title: 'course',
        creationDate: moment().subtract(4, 'days').toDate(),
        duration: 40,
        description: ''
      };
      fixture.detectChanges();
      expect(component.getCourseOutlineColor()).toBe(Outline.fresh);
    });

    it('should return proper border color for regular course', () => {
      component.course = {
        id: 1,
        title: 'course',
        creationDate: moment().subtract(freshCourseDaysLimit + 1, 'days').toDate(),
        duration: 40,
        description: ''
      };
      fixture.detectChanges();
      expect(component.getCourseOutlineColor()).toBe(Outline.default);
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
    })

});


})
