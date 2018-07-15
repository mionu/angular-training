import { Pipe, PipeTransform } from '@angular/core';
import { Course } from './course.model';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(courses: Course[], sortParameter: string): Course[] {
    return courses.sort((a: Course, b: Course) => {
      return b[sortParameter] - a[sortParameter];
    });
  }

}
