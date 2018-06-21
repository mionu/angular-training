import { Component, OnInit, Input } from '@angular/core';
import { Course } from '../course.model';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  @Input() public course: Course
  constructor() { }

  ngOnInit() {
  }

}
