import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CoursePageComponent } from '../app/course-page/course-page/course-page.component';
import { SharedModule } from '../app/shared/shared.module';
import { CoursesService } from '../app/courses-list/courses.service';

describe('CoursePageComponent', () => {
  let component: CoursePageComponent;
  let fixture: ComponentFixture<CoursePageComponent>;

  const MockCourseService: Partial<CoursesService> = {
    createCourse: jasmine.createSpy(),
    getCourseById: jasmine.createSpy()
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursePageComponent ],
      imports: [ FormsModule, RouterTestingModule, SharedModule ],
      providers: [{ provide: CoursesService, useValue: MockCourseService }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursePageComponent);
    component = fixture.componentInstance;
    // @ts-ignore
    spyOn(component.router, 'navigate').and.returnValue(true);
    // @ts-ignore
    component.subscription = { unsubscribe: jasmine.createSpy() };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save new course', () => {
    component.course = {
      id: 0,
      title: 'title',
      description: 'desc',
      creationDate: new Date(),
      duration: 30
    };
    fixture.detectChanges();
    const saveButton = fixture.nativeElement.querySelector('.save-btn');
    const service = TestBed.get(CoursesService);

    saveButton.click();
    expect(service.createCourse).toHaveBeenCalled();
  });
});
