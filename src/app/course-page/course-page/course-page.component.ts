import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Course } from '../../courses-list/course.model';
import { CoursesService } from '../../courses-list/courses.service';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.css']
})
export class CoursePageComponent implements OnInit {
  course: Course;

  constructor(private route: ActivatedRoute, private router: Router, private service: CoursesService) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.course = this.service.getCourseById({ id });
  }

}
