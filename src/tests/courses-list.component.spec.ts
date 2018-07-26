import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModalStack } from '@ng-bootstrap/ng-bootstrap/modal/modal-stack';
import { CoursesListComponent } from '../app/courses-list/courses-list/courses-list.component';
import { CoursesService } from '../app/courses-list/courses.service';
import { OrderByPipe } from '../app/courses-list/order-by.pipe';
import { SearchCoursePipe } from '../app/courses-list/search-course.pipe';
import { SearchComponent } from '../app/courses-list/search/search.component';

describe('CoursesListComponent', () => {
  let component: CoursesListComponent;
  let fixture: ComponentFixture<CoursesListComponent>;
  let coursesServiceStub: Partial<CoursesService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CoursesListComponent,
        SearchComponent,
        OrderByPipe,
        SearchCoursePipe
      ],
      imports: [ FormsModule ],
      providers:[
        { provide: CoursesService, useValue: coursesServiceStub },
        SearchCoursePipe,
        NgbModalStack
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
        id: 1,
        title: 'qwe',
        creationDate: new Date(),
        duration: 60,
        description: 'desc 1'
      }, {
        id: 2,
        title: 'asd',
        creationDate: new Date(),
        duration: 80,
        description: 'desc 2'
      }, {
        id: 3,
        title: 'qweasd',
        creationDate: new Date(),
        duration: 95,
        description: 'desc 3'
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
  });

  it('should search for courses', () => {
    fixture.detectChanges();
    const el = fixture.nativeElement;
    const searchInput = el.querySelector('.search-input');
    const searchButton = el.querySelector('.search-button');
    searchInput.value = 'asd';
    searchInput.dispatchEvent(new Event('input'));
    searchButton.click();

    expect(component.courses.length).toBe(2);
    expect(component.courses[0].title).toContain('asd');
  });
});
