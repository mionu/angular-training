import { Component, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  encapsulation: ViewEncapsulation.None,
  styles: [ './modal.component.css' ]
})
export class ModalComponent {
  courseTitle: string;
  constructor(private activeModal: NgbActiveModal) {}

}
