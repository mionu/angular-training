import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../../courses-list/course.model';
import { CoursesService } from '../../courses-list/courses.service';
import { BreadcrumbService } from '../../shared/breadcrumb.service';
import { RouterPaths } from '../../app-routing/app-routing.constants';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.css']
})
export class CoursePageComponent implements OnInit {
  course: Course;

  constructor(
    private coursesService: CoursesService,
    private breadcrumbService: BreadcrumbService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.setCourseData();
    this.breadcrumbService.breadcrumb = [
      { label: 'Courses', url: RouterPaths.COURSES },
      { label: this.course.title || 'New course'}
    ];
  }

  ngOnDestroy() { }

  setCourseData() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.course = this.coursesService.getCourseById({ id }) || {
      id: null,
      title: '',
      description: '',
      duration: null,
      creationDate: null,
    };
  }

  saveCourse() {
    this.course.id ?
      this.coursesService.updateCourse(this.course) :
      this.coursesService.createCourse(this.course);
    this.router.navigate([RouterPaths.COURSES]);
  }

  cancel() {
    this.router.navigate([RouterPaths.COURSES]);
  }

}
