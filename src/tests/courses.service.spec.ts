import { inject } from '@angular/core/testing';
import { List } from 'immutable';
import { CoursesService } from '../app/courses-list/courses.service';
import { Course } from '../app/courses-list/course.model';

const courses = List([{
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
}]);

describe('CoursesService', () => {
  let service: CoursesService;

  beforeEach(() => {
    service = new CoursesService();
    service.coursesList = courses;
  });

  it('should be created', inject([CoursesService], (service: CoursesService) => {
    expect(service).toBeTruthy();
  }));

  it('should add new course', () => {
    const newCourse: Course = {
      id: 4,
      title: 'course',
      duration: 40,
      creationDate: new Date(),
      description: ''
    };
    service.createCourse(newCourse);
    expect(service.coursesList.size).toBe(4);
  });

  it('should get course by id', () => {
    const course = service.getCourseById({ id: 2 });
    expect(course.title).toBe('asd');
  });

  it('shoud update course', () => {
    const newCourse = {
      id: 3,
      title: 'new course title',
      duration: 40,
      creationDate: new Date(),
      description: ''
    };
    service.updateCourse(newCourse);
    expect(service.getCourseById({ id: 3 }).title).toBe(newCourse.title);
  });

  it('shoud remove course', () => {
    service.removeCourse({ id: 2 });
    expect(service.coursesList.size).toBe(2);
  });
});
