import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { List } from 'immutable';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Course } from '../course.model';
import { CoursesService } from '../courses.service';
import { BreadcrumbService } from '../../shared/breadcrumb.service';
import { SearchCoursePipe } from '../search-course.pipe';
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
  coursesCount: number = DEFAULT_COURSES_PER_PAGE;
  pageIndex: number = 0;

  constructor(
    public coursesService: CoursesService,
    private route: ActivatedRoute,
    private router: Router,
    private searchPipe: SearchCoursePipe,
    private breadcrumbService: BreadcrumbService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const { start, count } = params;
      this.coursesService.getCoursesList({ start, count }).subscribe(courses => {
        this.courses = List(courses);
      });
    });
    this.breadcrumbService.breadcrumb = [ { label: 'Courses' } ];
  }

  get hasCourses() {
    return this.courses && this.courses.size > 0;
  }

  newCourse() {
    this.router.navigate([RouterPaths.NEW_COURSE]);
  }

  filterCourses(event) {
    const { query } = event;
    this.courses = this.searchPipe.transform(this.courses, query);
  }

  updateCourses(event) {
    switch(event.type) {
      case 'delete': {
        const courseToDelete = this.coursesService.getCourseById({ id: event.courseId });
        this.deleteCourse(courseToDelete);
        break;
      }
    }
  }

  deleteCourse(course) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.courseTitle = course.title;
    modalRef.result.then(res => {
      if(res === 'yes') {
        this.coursesService.removeCourse({ id: course.id });
      }
    });
  }

  loadMore() {
    const startPosition = ++this.pageIndex * this.coursesCount;
    this.router.navigate([], { queryParams: { start: startPosition, count: DEFAULT_COURSES_PER_PAGE } });
  }

}
