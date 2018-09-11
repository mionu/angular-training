import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { Course } from '../../shared/courses/course.model';
import { BreadcrumbService } from '../../shared/breadcrumb.service';
import { LoadingService } from '../../core/loading.service';
import { COURSES_ACTIONS } from '../../shared/actions.constants';

const blankCourse: Course = {
  id: null,
  name: '',
  length: 0,
  description: '',
  date: null
};

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.css']
})
export class CoursePageComponent implements OnInit {
  course: Course = blankCourse;

  course$: Observable<Course>;

  constructor(
    private breadcrumbService: BreadcrumbService,
    private route: ActivatedRoute,
    private location: Location,
    private loading: LoadingService,
    private store: Store<{currentCourse: Course}>
  ) {
    this.course$ = store.pipe(select('currentCourse'));
  }

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
        this.loading.show();
        this.store.dispatch({ type: COURSES_ACTIONS.GET_COURSE_BY_ID, payload: courseId });
      }
    });
    this.course$.subscribe(course => {
      if(course) {
        this.loading.hide();
        this.breadcrumbService.breadcrumb[1] = {
          label: course.name
        };
        this.course = course;
      }
    });
  }

  ngOnDestroy() {
    this.store.dispatch({ type: COURSES_ACTIONS.COURSE_RECEIVED, payload: null });
  }

  saveCourse() {
    const actionType = this.course.id ? COURSES_ACTIONS.UPDATE_COURSE: COURSES_ACTIONS.CREATE_COURSE;
    this.store.dispatch({ type: actionType, payload: this.course });
  }

  cancel() {
    this.location.back();
  }

}
