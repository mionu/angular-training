import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { List } from 'immutable';
import { of } from 'rxjs';
import { NgbModalStack } from '@ng-bootstrap/ng-bootstrap/modal/modal-stack';
import { CoursesListComponent } from '../app/courses-list/courses-list/courses-list.component';
import { CoursesService } from '../app/courses-list/courses.service';
import { OrderByPipe } from '../app/courses-list/order-by.pipe';
import { SearchComponent } from '../app/courses-list/search/search.component';
import { ScrollBar } from '@ng-bootstrap/ng-bootstrap/util/scrollbar';

const coursesList = [{
  id: 1,
  name: 'qwe',
  date: new Date(),
  length: 60,
  description: 'desc 1'
}, {
  id: 2,
  name: 'asd',
  date: new Date(),
  length: 80,
  description: 'desc 2'
}, {
  id: 3,
  name: 'qweasd',
  date: new Date(),
  length: 95,
  description: 'desc 3'
}];

describe('CoursesListComponent', () => {
  let component: CoursesListComponent;
  let fixture: ComponentFixture<CoursesListComponent>;
  let coursesServiceStub: Partial<CoursesService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CoursesListComponent,
        SearchComponent,
        OrderByPipe
      ],
      imports: [ FormsModule, RouterTestingModule ],
      providers:[
        { provide: CoursesService, useValue: coursesServiceStub },
        NgbModalStack,
        ScrollBar
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesListComponent);
    component = fixture.componentInstance;
    coursesServiceStub = {
      getCoursesList: () => of(coursesList),
      getCourseById: jasmine.createSpy()
    };
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should load courses on init', () => {
    expect(component.courses).toBeDefined();
    expect(component.courses.size).toBe(0);
    component.ngOnInit();
    expect(component.courses.size).toEqual(3);
  });

  it('should load more courses', () => {
    fixture.detectChanges();
    component.loadMore = jasmine.createSpy();
    const button = fixture.nativeElement.querySelector('.load-more');
    button.click();
    expect(component.loadMore).toHaveBeenCalled();
  });

  it('should delete course', () => {
    fixture.detectChanges();
    component.deleteCourse = jasmine.createSpy();
    const deleteEvent = { type: 'delete', courseId: 1 };
    component.updateCourses(deleteEvent);
    expect(component.deleteCourse).toHaveBeenCalled();
  });
});
