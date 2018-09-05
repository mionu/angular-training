import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { concat, merge, Observable } from 'rxjs';
import { last, map, debounceTime } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { Course } from '../course.model';
import { CoursesService } from '../courses.service';
import { BreadcrumbService } from '../../shared/breadcrumb.service';
import { LoadingService } from '../../core/loading.service';
import { ModalComponent } from '../../shared/modal/modal.component';
import { RouterPaths } from '../../app-routing/app-routing.constants';
import { DEFAULT_COURSES_PER_PAGE, Timeouts } from 'src/app/courses-list/course.constants';
import { COURSES_ACTIONS } from '../../shared/actions.constants';


@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css'],
  providers: [ NgbModal ]
})
export class CoursesListComponent implements OnInit {
  courses: Observable<Array<Course>>;
  params: {
    start: number,
    count: number,
    query?: string
  } = { start: 0, count: DEFAULT_COURSES_PER_PAGE };

  constructor(
    public coursesService: CoursesService,
    private route: ActivatedRoute,
    private router: Router,
    private breadcrumbService: BreadcrumbService,
    private loading: LoadingService,
    private modalService: NgbModal,
    private store: Store<any>
  ) {
    this.courses = store.pipe(select('courses'));
  }

  ngOnInit() {
    merge(
      this.route.queryParams,
      this.coursesService.query.pipe(debounceTime(Timeouts.SEARCH_REQUEST_DEBOUNCE))
    )
    .pipe(
      map(({ start = '0', count = '10', query }) => {
        if (start && count) {
          this.params.start = +start;
          this.params.count = +count;
        }
        if (typeof query === 'string') {
          this.params.query = query;
        }
        this.loading.show();
        return this.params;
      })
      // @ts-ignore
    ).subscribe(params => this.store.dispatch({ type: COURSES_ACTIONS.GET_COURSES_LIST, payload: params }));

    this.breadcrumbService.breadcrumb = [ { label: 'Courses' } ];
  }

  get hasCourses() {
    return this.courses;
  }

  newCourse() {
    this.router.navigate([RouterPaths.NEW_COURSE]);
  }

  updateCourses(event) {
    switch(event.type) {
      case 'delete': {
        this.deleteCourse(event.course);
        break;
      }
    }
  }

  deleteCourse(course) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.courseTitle = course.name;
    modalRef.result.then(res => {
      if(res === 'yes') {
        this.loading.show();
        concat(
          this.coursesService.removeCourse({ id: course.id }),
          this.coursesService.getCoursesList(this.params)
        )
        .pipe(last())
        .subscribe(() => {
          this.loading.hide();
        });
      }
    });
  }

  loadMore() {
    this.params.start += this.params.count;
    const { start, count } = this.params;
    this.router.navigate([], { queryParams: { start, count } });
  }

}
