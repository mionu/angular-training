import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { CourseComponent } from './course.component';
import { Course } from '../course.model';

describe('CourseComponent', () => {
  let component: CourseComponent;
  let fixture: ComponentFixture<CourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should recieve course object', () => {
    const expectedCourse: Course = {
      id: 1,
      title: 'course 1',
      creationDate: '15 Mar 2017',
      duration: 60,
      description: 'desc 1'
    };
    expect(component.course).not.toBeDefined();
    component.course = expectedCourse;
    fixture.detectChanges();
    const courseTitle = fixture.nativeElement.querySelector('.course-title');
    expect(courseTitle.textContent).toEqual(expectedCourse.title);
  });

  it('should raise delete event', () => {
    let deleteEvent;
    component.course = {
      id: 1,
      title: 'course 1',
      creationDate: '15 Mar 2017',
      duration: 60,
      description: 'desc 1'
    };
    component.courseChangeEvent.subscribe(e => deleteEvent = e);
    const deleteButton = fixture.nativeElement.querySelector('.delete-button');
    deleteButton.click();
    expect(deleteEvent.event).toEqual('delete');
  });
});
