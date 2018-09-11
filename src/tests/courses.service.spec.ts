import { inject, TestBed, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { concat } from 'rxjs';
import { last } from 'rxjs/operators';
import { CoursesService } from '../app/shared/courses/courses.service';
import { Course } from '../app/shared/courses/course.model';

const courses = [{
  id: 1,
  title: 'qwe',
  creationDate: new Date(),
  duration: 60,
  description: 'desc 1'
}, {
  id: 2,
  title: 'asd',
  creationDate: new Date(),
  duration: 80,
  description: 'desc 2'
}, {
  id: 3,
  title: 'qweasd',
  creationDate: new Date(),
  duration: 95,
  description: 'desc 3'
}];

describe('CoursesService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ CoursesService ],
      imports: [ HttpClientTestingModule ]
    });
  });

  it('should be created', inject([CoursesService], (service: CoursesService) => {
    expect(service).toBeTruthy();
  }));

  it('should add new course', inject([CoursesService], fakeAsync((service: CoursesService) => {
    const newCourse: Course = {
      id: 4,
      name: 'course',
      length: 40,
      date: new Date(),
      description: ''
    };
    concat(
      service.createCourse(newCourse),
      service.getCoursesList({ start: 0, count: 10 })
    ).pipe(last())
    .subscribe(courses => {
      expect(courses.length).toBe(4);
    });
  })));

  it('should get course by id', inject([CoursesService], fakeAsync((service: CoursesService) => {
    service.getCourseById({ id: 2 }).subscribe(course => {
      expect(course.name).toBe('asd');
    });
  })));

  it('shoud update course', inject([CoursesService], fakeAsync((service: CoursesService) => {
    const newCourse = {
      id: 3,
      name: 'new course title',
      length: 40,
      date: new Date(),
      description: ''
    };
    concat(
      service.updateCourse(newCourse),
      service.getCourseById({ id: 3 })
    ).pipe(last())
    .subscribe(course => {
      expect(course.name).toBe(newCourse.name);
    });
  })));

  it('shoud remove course', inject([CoursesService], fakeAsync((service: CoursesService) => {
    concat(
      service.removeCourse({ id: 2 }),
      service.getCoursesList({ start: 0, count: 10 })
    ).pipe(last())
    .subscribe(courses => {
      expect(courses.length).toBe(2);
    });
  })));
});
