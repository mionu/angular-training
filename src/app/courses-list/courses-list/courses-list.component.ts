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
    console.log('courses-list constructor');
  }

  ngOnInit() {
    this.courses = this.coursesService.getCoursesList();
    console.log('courses-list ngOnInit');
  }

  ngOnChanges() {
    console.log('courses-list ngOnChanges');
  }

  ngDoCheck() {
    console.log('courses-list ngDoCheck');
  }

  ngAfterContentInit() {
    console.log('courses-list ngAfterContentInit');
  }

  ngAfterContentChecked() {
    console.log('courses-list ngAfterContentChecked');
  }

  ngAfterViewInit() {
    console.log('courses-list ngAfterViewInit');
  }

  ngAfterViewChecked() {
    console.log('courses-list ngAfterViewChecked');
  }

  ngOnDestroy() {
    console.log('courses-list ngOnDestroy');
  }

  updateCourses(event) {
    console.log(event);
  }

  loadMore() {
    console.log('load more clicked');
  }

}
