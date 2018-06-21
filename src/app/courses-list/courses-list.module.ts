import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CourseComponent } from './course/course.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CoursesListComponent, CourseComponent],
  exports: [CoursesListComponent]
})
export class CoursesListModule { }
