import { Pipe, PipeTransform } from '@angular/core';
import { List } from 'immutable';
import { Course } from './course.model';

@Pipe({
  name: 'searchCourse'
})
export class SearchCoursePipe implements PipeTransform {

  transform(courses: List<Course>, query: string): List<Course> {
    if(courses.size > 0) {
      const regexpQuery = new RegExp(query, 'i');
      const searchResults = courses.filter(course => regexpQuery.test(course.title)).toList();
      return searchResults;
    }
    return List([]);
  }

}
