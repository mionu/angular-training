import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { Course } from '../course.model';
import { Outline, freshCourseDaysLimit } from '../course.constants';

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

  deleteCourse() {
    this.courseChangeEvent.emit({ event: 'delete', courseId: this.course.id });
  }

  getCourseOutlineColor() {
    const dateDiff = moment().diff(this.course.creationDate, 'days');
    switch(true) {
      case dateDiff < 0:
        return Outline.upcoming;
      case dateDiff < freshCourseDaysLimit:
        return Outline.fresh;
      default:
        return Outline.default;
    }
  }

}
