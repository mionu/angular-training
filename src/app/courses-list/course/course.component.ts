import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { Course } from '../course.model';

const freshCourseDaysLimit = 14;

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  @Input() public course: Course;
  @Output() public courseChangeEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
  }

  deleteCourse(event) {
    this.courseChangeEvent.emit({ event: 'delete', courseId: this.course.id });
  }

  getCourseOutlineColor() {
    switch(true) {
      case this.course.creationDate > +moment():
        return 'primary';
      case this.course.creationDate > +moment().subtract(freshCourseDaysLimit, 'days'):
        return 'success';
      default:
        return 'secondary';
    }
  }

}
