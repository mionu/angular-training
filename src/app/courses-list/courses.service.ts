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

  getCoursesList(options: any): Observable<Course[]> {
    const params: any = {
      start: options.start + '',
      count: options.count + ''
    };
    if(options.query) {
      params.textFragment = options.query;
    }
    return this.http.get<Course[]>(`${BASE_URL}${COURSES_PATH}`, { params });
  }

  createCourse(newCourse: Course): List<Course> {
    // if (!newCourse.id) {
    //   newCourse.id = this.nextCourseId++;
    // }
    // this.coursesList = this.coursesList.push(newCourse);
    // return this.coursesList;
  }

  getCourseById({ id }): Observable<Course> {
    return this.http.get<Course>(`${BASE_URL}${COURSES_PATH}/${id}`);
  }

  updateCourse(updatedCourse: Course): List<Course> {
    // const courseIndex = this.getCoursePosition({ id: updatedCourse.id });
    // this.coursesList = this.coursesList.splice(courseIndex, 1, updatedCourse).toList();
    // return this.coursesList;
  }

  removeCourse({ id }): Observable<Course> {
    return this.http.delete<Course>(`${BASE_URL}${COURSES_PATH}/${id}`);
  }
}
