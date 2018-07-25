import { Pipe, PipeTransform } from '@angular/core';
import { List } from 'immutable';
import { Course } from './course.model';

@Pipe({
  name: 'searchCourse'
})
export class SearchCoursePipe implements PipeTransform {

  transform(courses: List<Course>, query: string): List<Course> {
    const regexpQuery = new RegExp(query, 'i');
    return courses.filter(course => regexpQuery.test(course.title));
  }

}
