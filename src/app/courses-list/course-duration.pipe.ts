import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'courseDuration'
})
export class CourseDurationPipe implements PipeTransform {

  transform(value: number): string {
    const hours = Math.floor(value / 60);
    const minutes = value % 60;
    return `${hours > 0 ? hours + 'h' : ''} ${minutes > 0 ? minutes + 'min' : ''}`;
  }

}
