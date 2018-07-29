import { inject } from '@angular/core/testing';
import { CoursesService } from '../app/courses-list/courses.service';
import { Course } from '../app/courses-list/course.model';

describe('CoursesService', () => {
  let service: CoursesService;

  beforeEach(() => {
    service = new CoursesService();
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
    expect(course.title).toBe('course 2');
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
