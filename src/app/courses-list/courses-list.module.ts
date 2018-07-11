import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CourseComponent } from './course/course.component';
import { ToolboxComponent } from './toolbox/toolbox.component';
import { SearchComponent } from './search/search.component';
import { CourseOutlineDirective } from './course-outline.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    CoursesListComponent,
    CourseComponent,
    ToolboxComponent,
    SearchComponent,
    CourseOutlineDirective
  ],
  exports: [CoursesListComponent]
})
export class CoursesListModule { }
