import { Pipe, PipeTransform } from '@angular/core';
import { Course } from './course.model';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {
  transform(courses: Course[], sortParameter: string): Course[] {
    const sortFunction = typeof courses[0][sortParameter] === 'string' ?
      this.stringComparison : this.defaultComparison;
    return courses.sort((a: Course, b: Course) => {
      return sortFunction(a[sortParameter], b[sortParameter]);
    });
  }

  stringComparison(a: string, b: string) {
    return a.localeCompare(b);
  }

  defaultComparison(a, b) {
    return b - a;
  }

}
