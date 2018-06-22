import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CourseComponent } from './course/course.component';
import { ToolboxComponent } from './toolbox/toolbox.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CoursesListComponent, CourseComponent, ToolboxComponent],
  exports: [CoursesListComponent]
})
export class CoursesListModule { }
