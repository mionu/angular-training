import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { List } from 'immutable';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Course } from '../course.model';
import { CoursesService } from '../courses.service';
import { BreadcrumbService } from '../../shared/breadcrumb.service';
import { ModalComponent } from '../../shared/modal/modal.component';
import { RouterPaths } from '../../app-routing/app-routing.constants';
import { DEFAULT_COURSES_PER_PAGE } from 'src/app/courses-list/course.constants';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css'],
  providers: [ NgbModal ]
})
export class CoursesListComponent implements OnInit {
  courses: List<Course> = List([]);
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
    private modalService: NgbModal) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.coursesService.getCoursesList(params).subscribe(courses => {
        this.courses = List(courses);
      });
    });
    this.breadcrumbService.breadcrumb = [ { label: 'Courses' } ];
  }

  get hasCourses() {
    return this.courses && this.courses.size > 0;
  }

  requestCourses() {}

  newCourse() {
    this.router.navigate([RouterPaths.NEW_COURSE]);
  }

  filterCourses(event) {
    const { query } = event;
    this.params.start = 0;
    this.params.query = query;
    this.router.navigate([], { queryParams: this.params });
  }

  updateCourses(event) {
    switch(event.type) {
      case 'delete': {
        const courseToDelete = this.courses.find(course => course.id === event.courseId);
        this.deleteCourse(courseToDelete);
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
          .subscribe(() => this.coursesService.getCoursesList(this.params)
          .subscribe(courses => this.courses = List(courses)));
      }
    });
  }

  loadMore() {
    this.params.start += this.params.count;
    this.router.navigate([], { queryParams: this.params });
  }

}
