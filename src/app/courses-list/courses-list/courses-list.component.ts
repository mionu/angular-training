import { Component, OnInit } from '@angular/core';
import { Course } from '../course.model';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {
  public courses: Course[];

  constructor(private coursesService: CoursesService) {
    this.courses = [];
  }

  ngOnInit() {
    this.courses = this.coursesService.getCoursesList();
  }

  get hasCourses() {
    return this.courses.length > 0;
  }

  updateCourses(event) {
    console.log(event);
  }

  loadMore() {
    console.log('load more clicked');
  }

}
