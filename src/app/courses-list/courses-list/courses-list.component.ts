import { Component, OnInit } from '@angular/core';
import { Course } from '../course.model';
import { CoursesService } from '../courses.service';
import { SearchCoursePipe } from '../search-course.pipe';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {
  public courses: Course[];

  constructor(private coursesService: CoursesService, private searchPipe: SearchCoursePipe) {
    this.courses = [];
  }

  ngOnInit() {
    this.courses = this.coursesService.getCoursesList();
  }

  get hasCourses() {
    return this.courses.length > 0;
  }

  filterCourses(event) {
    const { query } = event;
    this.courses = this.searchPipe.transform(this.coursesService.getCoursesList(), query);
  }

  updateCourses(event) {
    console.log(event);
  }

  loadMore() {
    console.log('load more clicked');
  }

}
