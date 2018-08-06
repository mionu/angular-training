import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { List } from 'immutable';
import { Course } from './course.model';
import { BASE_URL, COURSES_PATH } from 'src/app/core/constants';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http: HttpClient) { }

  getCoursesList({ start, count }): Observable<Course[]> {
    const startParam = start + '';
    const countParam = count + '';
    return this.http.get<Course[]>(`${BASE_URL}${COURSES_PATH}`, { params: { start: startParam, count: countParam } });
  }

  createCourse(newCourse: Course): List<Course> {
    // if (!newCourse.id) {
    //   newCourse.id = this.nextCourseId++;
    // }
    // this.coursesList = this.coursesList.push(newCourse);
    // return this.coursesList;
  }

  getCourseById({ id }): Course {
    return this.coursesList.find(course => course.id === id);
  }

  updateCourse(updatedCourse: Course): List<Course> {
    // const courseIndex = this.getCoursePosition({ id: updatedCourse.id });
    // this.coursesList = this.coursesList.splice(courseIndex, 1, updatedCourse).toList();
    // return this.coursesList;
  }

  removeCourse({ id }): List<Course> {
    // const courseIndex = this.getCoursePosition({ id });
    // this.coursesList = this.coursesList.delete(courseIndex);
    // return this.coursesList;
  }
}
