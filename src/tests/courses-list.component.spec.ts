import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import * as moment from 'moment';
import { CoursesListComponent } from '../app/courses-list/courses-list/courses-list.component';
import { CoursesService } from '../app/courses-list/courses.service';
import { OrderByPipe } from '../app/courses-list/order-by.pipe';
import { SearchCoursePipe } from '../app/courses-list/search-course.pipe';

describe('CoursesListComponent', () => {
  let component: CoursesListComponent;
  let fixture: ComponentFixture<CoursesListComponent>;
  let coursesServiceStub: Partial<CoursesService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesListComponent, OrderByPipe, SearchCoursePipe ],
      providers:[
        { provide: CoursesService, useValue: coursesServiceStub },
        SearchCoursePipe
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesListComponent);
    component = fixture.componentInstance;
    coursesServiceStub = {
      getCoursesList: () => [{
        'id': 1,
        'title': 'course 1',
        'creationDate': moment('03-15-2018', 'MM-DD-YYYY').toDate(),
        'duration': 60,
        'description': 'desc 1'
      }, {
        'id': 2,
        'title': 'course 2',
        'creationDate': moment('01-06-2018', 'MM-DD-YYYY').toDate(),
        'duration': 80,
        'description': 'desc 2'
      }, {
        'id': 3,
        'title': 'course 3',
        'creationDate': moment('01-11-2018', 'MM-DD-YYYY').toDate(),
        'duration': 95,
        'description': 'desc 3'
      }]
    };
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should load courses on init', () => {
    expect(component.courses).toBeDefined();
    expect(component.courses.length).toEqual(0);
    component.ngOnInit();
    expect(component.courses.length).toEqual(3);
  });

  it('should load more courses', () => {
    fixture.detectChanges();
    component.loadMore = jasmine.createSpy();
    const button = fixture.nativeElement.querySelector('.load-more');
    button.click();
    expect(component.loadMore).toHaveBeenCalled();
  })
});
