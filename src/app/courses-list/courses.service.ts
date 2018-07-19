import { Injectable } from '@angular/core';
import { Course } from './course.model';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor() { }

  public getCoursesList(): Course[] {
    // return [];
    return [ {
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
    }];
  }
}
