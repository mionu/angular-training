import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CourseComponent } from './course/course.component';
import { SearchComponent } from './search/search.component';
import { CourseOutlineDirective } from './course-outline.directive';
import { CourseDurationPipe } from './course-duration.pipe';
import { OrderByPipe } from './order-by.pipe';
import { SearchCoursePipe } from './search-course.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    CoursesListComponent,
    CourseComponent,
    SearchComponent,
    CourseOutlineDirective,
    CourseDurationPipe,
    OrderByPipe,
    SearchCoursePipe
  ],
  providers: [ SearchCoursePipe ],
  exports: [CoursesListComponent]
})
export class CoursesListModule { }
