import { inject, TestBed } from '@angular/core/testing';
import { List } from 'immutable';
import { HttpClientTestingModule } from '@angular/common/http/testing';
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
    TestBed.configureTestingModule({
      providers: [ CoursesService ],
      imports: [ HttpClientTestingModule ]
    });
  });

  it('should be created', inject([CoursesService], (service: CoursesService) => {
    expect(service).toBeTruthy();
  }));

  it('should add new course', inject([CoursesService], (service: CoursesService) => {
    const newCourse: Course = {
      id: 4,
      name: 'course',
      length: 40,
      date: new Date(),
      description: ''
    };
    service.createCourse(newCourse);
    expect(service.coursesList.size).toBe(4);
  }));

  it('should get course by id', inject([CoursesService], (service: CoursesService) => {
    const course = service.getCourseById({ id: 2 });
    expect(course.name).toBe('asd');
  }));

  it('shoud update course', inject([CoursesService], (service: CoursesService) => {
    const newCourse = {
      id: 3,
      title: 'new course title',
      duration: 40,
      creationDate: new Date(),
      description: ''
    };
    service.updateCourse(newCourse);
    expect(service.getCourseById({ id: 3 }).name).toBe(newCourse.title);
  }));

  it('shoud remove course', inject([CoursesService], (service: CoursesService) => {
    service.removeCourse({ id: 2 });
    expect(service.coursesList.size).toBe(2);
  }));
});
