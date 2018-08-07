import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { cloneDeep } from 'lodash';
import { Course } from '../../courses-list/course.model';
import { CoursesService } from '../../courses-list/courses.service';
import { BreadcrumbService } from '../../shared/breadcrumb.service';
import { RouterPaths } from '../../app-routing/app-routing.constants';
import { Location } from '@angular/common';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.css']
})
export class CoursePageComponent implements OnInit {
  course: Course;
  newCourse: Course = {
    id: null,
    name: '',
    description: '',
    length: null,
    date: null,
    isTopRated: false
  };

  constructor(
    private coursesService: CoursesService,
    private breadcrumbService: BreadcrumbService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.breadcrumbService.breadcrumb = [{
      label: 'Courses', url: RouterPaths.COURSES
    }];
    this.route.params.subscribe(params => {
      const courseId = params.id;
      if(courseId === 'new') {
        this.breadcrumbService.breadcrumb.push({
          label: 'New course'
        });
      }
      else {
        this.coursesService.getCourseById({ id: courseId }).subscribe(course => {
          if(course) {
            this.course = course;
            this.newCourse = cloneDeep(course);
            this.breadcrumbService.breadcrumb.push({
              label: this.newCourse.name
            });
          }
          else {
            this.location.back();
          }
        });
      }
    });
  }

  saveCourse() {
    const handler =  this.course.id ?
      this.coursesService.updateCourse(this.newCourse) :
      this.coursesService.createCourse(this.newCourse);
    handler.subscribe(() => this.location.back());
  }

  cancel() {
    this.location.back();
  }

}
