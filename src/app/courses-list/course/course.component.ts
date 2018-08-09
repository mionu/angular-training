import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Course } from '../course.model';
import { Outline, freshCourseDaysLimit } from '../course.constants';
import { RouterPaths } from '../../app-routing/app-routing.constants';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseComponent implements OnInit {
  @Input() public course: Course;
  @Output() public courseChangeEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  deleteCourse() {
    this.courseChangeEvent.emit({ type: 'delete', course: this.course });
  }

  editCourse() {
    this.router.navigate([RouterPaths.COURSES, this.course.id], { relativeTo: this.route });
  }

  getCourseOutlineColor() {
    const dateDiff = moment().diff(this.course.date, 'days');
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
