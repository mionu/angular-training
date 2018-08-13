import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
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

  createCourse(newCourse: Course): Observable<Course> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<Course>(`${BASE_URL}${COURSES_PATH}`, newCourse, { headers });
  }

  getCourseById({ id }): Observable<Course> {
    return this.http.get<Course>(`${BASE_URL}${COURSES_PATH}/${id}`);
  }

  updateCourse(updatedCourse: Course): Observable<Course> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.patch<Course>(`${BASE_URL}${COURSES_PATH}/${updatedCourse.id}`, updatedCourse, { headers });
  }

  removeCourse({ id }): Observable<Course> {
    return this.http.delete<Course>(`${BASE_URL}${COURSES_PATH}/${id}`);
  }
}
