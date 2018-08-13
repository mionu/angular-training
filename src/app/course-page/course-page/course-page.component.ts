import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Course } from '../../courses-list/course.model';
import { CoursesService } from '../../courses-list/courses.service';
import { BreadcrumbService } from '../../shared/breadcrumb.service';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.css']
})
export class CoursePageComponent implements OnInit {
  course: Course = {
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
      label: 'Courses', action: () => this.location.back()
    }];
    this.route.params.subscribe(params => {
      const courseId = params.id;
      if(!courseId) {
        this.breadcrumbService.breadcrumb.push({
          label: 'New course'
        });
      }
      else {
        this.coursesService.getCourseById({ id: courseId }).subscribe(course => {
          if(course) {
            this.course = course;
            this.breadcrumbService.breadcrumb.push({
              label: this.course.name
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
      this.coursesService.updateCourse(this.course) :
      this.coursesService.createCourse(this.course);
    handler.subscribe(() => this.location.back());
  }

  cancel() {
    this.location.back();
  }

}
