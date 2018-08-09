import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { List } from 'immutable';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { concat, Observable } from 'rxjs';
import { last, tap } from 'rxjs/operators';
import { Course } from '../course.model';
import { CoursesService } from '../courses.service';
import { BreadcrumbService } from '../../shared/breadcrumb.service';
import { ModalComponent } from '../../shared/modal/modal.component';
import { RouterPaths } from '../../app-routing/app-routing.constants';
import { DEFAULT_COURSES_PER_PAGE } from 'src/app/courses-list/course.constants';
import { pipe } from '@angular/core/src/render3/pipe';


@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css'],
  providers: [ NgbModal ]
})
export class CoursesListComponent implements OnInit {
  courses: Observable<Course[]>;
  params: {
    start: number,
    count: number
  } = { start: 0, count: DEFAULT_COURSES_PER_PAGE };
  hasCourses: boolean;

  constructor(
    public coursesService: CoursesService,
    private route: ActivatedRoute,
    private router: Router,
    private breadcrumbService: BreadcrumbService,
    private modalService: NgbModal) { }

  ngOnInit() {
    concat(
      this.route.queryParams
    )
    this.route.queryParams.subscribe(params => {
      const { start, count } = params;
      this.params = { start: +start, count: +count };
      this.courses = this.coursesService.getCoursesList(params);
    });
    this.coursesService.querySubject.subscribe(query => {
      this.courses = this.coursesService.getCoursesList({ start: 0, count: DEFAULT_COURSES_PER_PAGE, query });
    });
    this.breadcrumbService.breadcrumb = [ { label: 'Courses' } ];
  }

  newCourse() {
    this.router.navigate([RouterPaths.NEW_COURSE]);
  }

  filterCourses(event) {
    const { query } = event;
    this.params.start = 0;
    this.params = query;
    this.router.navigate([], { queryParams: this.params });
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
        this.coursesService.removeCourse({ id: course.id })
        .pipe(tap(() => this.courses = this.coursesService.getCoursesList(this.params)))
        // concat(
        //   this.coursesService.removeCourse({ id: course.id }),
        //   this.coursesService.getCoursesList(this.params)
        // )
        // .pipe(last())
        // .subscribe(courses => this.courses = List(courses));
      }
    });
  }

  loadMore() {
    this.params.start += this.params.count;
    this.router.navigate([], { queryParams: this.params });
  }

}
