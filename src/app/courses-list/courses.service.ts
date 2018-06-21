import { Injectable } from '@angular/core';
import { Course } from './course.model';
import mockData from './mock-data';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor() { }

  public getCoursesList(): Course[] {
    return mockData;
  }
}
