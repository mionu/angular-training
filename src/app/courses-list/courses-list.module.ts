import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CourseComponent } from './course/course.component';
import { SearchComponent } from './search/search.component';
import { CourseOutlineDirective } from './course-outline.directive';
import { OrderByPipe } from './order-by.pipe';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SharedModule
  ],
  declarations: [
    CoursesListComponent,
    CourseComponent,
    SearchComponent,
    CourseOutlineDirective,
    OrderByPipe
  ],
  exports: [ CoursesListComponent ]
})
export class CoursesListModule { }
