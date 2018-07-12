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
    const dateDiff = moment().diff(this.course.creationDate, 'days');
    switch(true) {
      case dateDiff < 0:
        return 'primary';
      case dateDiff < freshCourseDaysLimit:
        return 'success';
      default:
        return 'secondary';
    }
  }

}
