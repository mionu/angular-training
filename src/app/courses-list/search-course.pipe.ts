import { Pipe, PipeTransform } from '@angular/core';
import { Course } from './course.model';

@Pipe({
  name: 'searchCourse'
})
export class SearchCoursePipe implements PipeTransform {

  transform(courses: Course[], query: string): Course[] {
    return courses.filter(course => course.title.match(new RegExp(query, 'i')));
  }

}
