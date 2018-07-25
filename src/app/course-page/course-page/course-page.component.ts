import { Component, OnInit } from '@angular/core';
import { Course } from '../../courses-list/course.model';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.css']
})
export class CoursePageComponent implements OnInit {
  course: Course;

  constructor() { }

  ngOnInit() {
  }

}
