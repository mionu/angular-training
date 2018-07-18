import { Component, OnInit } from '@angular/core';
import { Course } from '../course.model';
import { CoursesService } from '../courses.service';
import { SearchCoursePipe } from '../search-course.pipe';
import { ModalComponent } from '../../shared/modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css'],
  providers: [ NgbModal ]
})
export class CoursesListComponent implements OnInit {
  public courses: Course[];

  constructor(private coursesService: CoursesService,
    private searchPipe: SearchCoursePipe,
    private modalService: NgbModal) {
    this.courses = [];
  }

  ngOnInit() {
    this.courses = this.coursesService.getCoursesList();
  }

  get hasCourses() {
    return this.courses.length > 0;
  }

  filterCourses(event) {
    const { query } = event;
    this.courses = this.searchPipe.transform(this.coursesService.getCoursesList(), query);
  }

  updateCourses(event) {
    switch(event.type) {
      case 'delete': {
        const courseToDelete = this.coursesService.getCourseById({ id: event.courseId });
        const modalRef = this.modalService.open(ModalComponent);
        modalRef.componentInstance.courseTitle = courseToDelete.title;
        modalRef.result.then(res => {
          if(res === 'yes') {
            this.coursesService.removeCourse({ id: event.courseId });
          }
        });
        break;
      }
    }
  }

  loadMore() {
    console.log('load more clicked');
  }

}
