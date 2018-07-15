import { CourseOutlineDirective } from './course-outline.directive';
import { Component } from '@angular/core';
import * as moment from 'moment';
import { Course } from './course.model';

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

describe('CourseOutlineDirective', () => {

});
