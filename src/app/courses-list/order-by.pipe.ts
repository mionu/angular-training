import { Pipe, PipeTransform } from '@angular/core';
import { List } from 'immutable';
import { Course } from './course.model';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {
  transform(courses: List<Course>, sortParameter: string): List<Course> {
    const sortFunction = courses.size && typeof courses.get(0)[sortParameter] === 'string' ?
      this.stringComparison : this.defaultComparison;
    return courses.sort((a: Course, b: Course) => {
      return sortFunction(a[sortParameter], b[sortParameter]);
    }).toList();
  }

  stringComparison(a: string, b: string) {
    return a.localeCompare(b);
  }

  defaultComparison(a, b) {
    return b - a;
  }

}
