import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CoursePageComponent } from './course-page/course-page.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CoreModule,
    SharedModule
  ],
  declarations: [ CoursePageComponent ]
})
export class CoursePageModule { }
