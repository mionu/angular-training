import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { CourseComponent } from './course.component';
import { Course } from '../course.model';
import { Component, EventEmitter } from '@angular/core';

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
    creationDate: '15 Mar 2017',
    duration: 60,
    description: 'desc 1'
  };
  updateCourses = jasmine.createSpy();
}

describe('CourseComponent', () => {
  let fixture;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseComponent, TestHostComponent ]
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
        creationDate: '15 Mar 2017',
        duration: 60,
        description: 'desc 1'
      };
      expect(component.course).not.toBeDefined();
      component.course = expectedCourse;
      fixture.detectChanges();
      const courseTitle = fixture.nativeElement.querySelector('.course-title');
      expect(courseTitle.textContent).toEqual(expectedCourse.title);
    });

    it('should raise delete event', () => {
      let deleteEvent;
      component.course = {
        id: 1,
        title: 'course 1',
        creationDate: '15 Mar 2017',
        duration: 60,
        description: 'desc 1'
      };
      component.courseChangeEvent.subscribe(e => deleteEvent = e);
      const deleteButton = fixture.nativeElement.querySelector('.delete-button');
      deleteButton.click();
      expect(deleteEvent.event).toEqual('delete');
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
      expect(courseTitle.textContent).toEqual('testhost course 1');
    });

    it('should raise delete event', () => {
      const deleteButton = fixture.nativeElement.querySelector('.delete-button');
      deleteButton.click();
      expect(testHost.updateCourses).toHaveBeenCalled();
    })

});


})
