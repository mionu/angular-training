import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { CoursesListComponent } from './courses-list.component';
import { CoursesService } from '../courses.service';
import { Component, Input, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Course } from '../course.model';

describe('CoursesListComponent', () => {
  let component: CoursesListComponent;
  let fixture: ComponentFixture<CoursesListComponent>;
  let coursesServiceStub: Partial<CoursesService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesListComponent],
      providers:[ { provide: CoursesService, useValue: coursesServiceStub } ],
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
        'creationDate': '15 Mar 2017',
        'duration': 60,
        'description': 'desc 1'
      }, {
        'id': 2,
        'title': 'course 2',
        'creationDate': '01 Jun 2018',
        'duration': 80,
        'description': 'desc 2'
      }, {
        'id': 3,
        'title': 'course 3',
        'creationDate': '11 Jan 2018',
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
    component.loadMore = jasmine.createSpy();
    const element: HTMLElement = fixture.nativeElement;
    const button = element.querySelector('button');
    button.click();
    expect(component.loadMore).toHaveBeenCalled();
  })
});
