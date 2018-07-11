import { Directive, ElementRef, Renderer2, Input } from '@angular/core';

@Directive({
  selector: '[appCourseOutline]'
})
export class CourseOutlineDirective {
  @Input('appCourseOutline') outlineColor: string;

  constructor(private hostElement: ElementRef, private renderer: Renderer2) {
  }

  ngAfterContentInit() {
    this.renderer.addClass(this.hostElement.nativeElement, `border-${this.outlineColor}`);
  }

}
