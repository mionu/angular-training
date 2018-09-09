import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { Store, select } from '@ngrx/store';
import * as moment from 'moment';
import _ from 'lodash';
import { Course } from '../../shared/courses/course.model';
import { BreadcrumbService } from '../../shared/breadcrumb.service';
import { LoadingService } from '../../core/loading.service';
import { COURSES_ACTIONS } from '../../shared/actions.constants';
import { dateValidator } from '../date.validator';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.css']
})
export class CoursePageComponent implements OnInit {
  private courseId;

  course$: Observable<Course>;

  courseForm = this.fb.group({
    name: ['', [ Validators.required, Validators.maxLength(50) ]],
    description: ['', [ Validators.required, Validators.maxLength(500) ]],
    date: ['', [ Validators.required, dateValidator ]],
    length: ['', [ Validators.required, Validators.pattern(/^[1-9]\d*$/) ]]
  })

  constructor(
    private breadcrumbService: BreadcrumbService,
    private route: ActivatedRoute,
    private location: Location,
    private loading: LoadingService,
    private store: Store<{currentCourse: Course}>,
    private fb: FormBuilder
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
        this.courseId = null;
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
        this.courseId = course.id;
        const date = moment(course.date).format('DD/MM/YYYY');
        this.courseForm.setValue(_.omit(_.assign(course, { date }), [ 'id', 'isTopRated', 'authors' ]));
      }
    });
  }

  ngOnDestroy() {
    this.store.dispatch({ type: COURSES_ACTIONS.COURSE_RECEIVED, payload: null });
  }

  get form() {
    return this.courseForm.controls;
  }

  saveCourse() {
    const actionType = this.courseId ? COURSES_ACTIONS.UPDATE_COURSE: COURSES_ACTIONS.CREATE_COURSE;
    this.store.dispatch({ type: actionType, payload: this.courseForm.getRawValue() });
  }

  cancel() {
    this.location.back();
  }

}
