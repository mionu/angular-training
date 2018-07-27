import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ModalComponent } from './modal/modal.component';
import { CourseDurationPipe } from './course-duration.pipe';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [ ModalComponent, CourseDurationPipe, PageNotFoundComponent ],
  exports: [ ModalComponent, CourseDurationPipe ]
})
export class SharedModule { }
