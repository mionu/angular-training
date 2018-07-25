import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursePageComponent } from './course-page/course-page.component';
import { CourseDurationPipe } from '../courses-list/course-duration.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ CoursePageComponent ],
  // providers: [ CourseDurationPipe ]
})
export class CoursePageModule { }
