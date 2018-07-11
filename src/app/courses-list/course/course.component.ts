import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CourseEntity as Course } from '../course.entity';

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

}
