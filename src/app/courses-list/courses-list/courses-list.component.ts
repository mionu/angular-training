import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { List } from 'immutable';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Course } from '../course.model';
import { CoursesService } from '../courses.service';
import { SearchCoursePipe } from '../search-course.pipe';
import { ModalComponent } from '../../shared/modal/modal.component';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css'],
  providers: [ NgbModal ]
})
export class CoursesListComponent implements OnInit {
  public courses: List<Course>;

  constructor(
    private coursesService: CoursesService,
    private router: Router,
    private route: ActivatedRoute,
    private searchPipe: SearchCoursePipe,
    private modalService: NgbModal) {
    this.courses = null;;
  }

  ngOnInit() {
    this.courses = this.coursesService.getCoursesList();
  }

  get hasCourses() {
    return this.courses && this.courses.size > 0;
  }

  newCourse() {
    this.router.navigate(['./course/new'], { relativeTo: this.route });
  }

  filterCourses(event) {
    const { query } = event;
    this.courses = this.searchPipe.transform(this.coursesService.coursesList, query);
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
        this.courses = this.coursesService.removeCourse({ id: course.id });
      }
    });
  }

  loadMore() {
    console.log('load more clicked');
  }

}
