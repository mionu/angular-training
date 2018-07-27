import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Course } from '../../courses-list/course.model';
import { CoursesService } from '../../courses-list/courses.service';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.css']
})
export class CoursePageComponent implements OnInit {
  course: Course;
  private subscription;

  constructor(
    private service: CoursesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.setCourseData();
    this.subscription = this.router.events.subscribe(e => {
      if(e instanceof NavigationEnd) {
        this.setCourseData();
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  setCourseData() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.course = this.service.getCourseById({ id }) || {
      id: null,
      title: '',
      description: '',
      duration: null,
      creationDate: null,
    };
  }

  saveCourse() {
    this.service.createCourse(this.course);
    this.router.navigate(['/courses']);
  }

}
