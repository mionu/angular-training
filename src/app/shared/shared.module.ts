import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { CourseDurationPipe } from './course-duration.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ ModalComponent, CourseDurationPipe ],
  exports: [ ModalComponent, CourseDurationPipe ]
})
export class SharedModule { }
