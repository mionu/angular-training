import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { List } from 'immutable';
import { Course } from './course.model';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  public coursesList: List<Course>;
  public nextCourseId: number;

  constructor() {
    this.coursesList = this.requestCourses();
    this.nextCourseId = this.coursesList.size + 1;
  }

  requestCourses(): List<Course> {
    return List([{
      id: 1,
      title: 'course 1',
      creationDate: moment('07-10-2018', 'MM-DD-YYYY').toDate(),
      duration: 60,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    } , {
      id: 2,
      title: 'course 2',
      creationDate: moment('08-01-2018', 'MM-DD-YYYY').toDate(),
      duration: 80,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    }, {
      id: 3,
      title: 'course 3',
      creationDate: moment('05-11-2018', 'MM-DD-YYYY').toDate(),
      duration: 45,
      topRated: true,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    }]);
  }

  private getCoursePosition({ id }) {
    return this.coursesList.findIndex(course => course.id === id);
  }

  getCoursesList(): List<Course> {
    return this.coursesList;
  }

  createCourse(newCourse: Course): List<Course> {
    if (!newCourse.id) {
      newCourse.id = this.nextCourseId++;
    }
    this.coursesList = this.coursesList.push(newCourse);
    return this.coursesList;
  }

  getCourseById({ id }): Course {
    return this.coursesList.find(course => course.id === id);
  }

  updateCourse(updatedCourse: Course): List<Course> {
    const courseIndex = this.getCoursePosition({ id: updatedCourse.id });
    this.coursesList = this.coursesList.splice(courseIndex, 1, updatedCourse).toList();
    return this.coursesList;
  }

  removeCourse({ id }): List<Course> {
    const courseIndex = this.getCoursePosition({ id });
    this.coursesList = this.coursesList.delete(courseIndex);
    return this.coursesList;
  }
}
