import { CoursesListModule } from './courses-list.module';

describe('CoursesListModule', () => {
  let coursesListModule: CoursesListModule;

  beforeEach(() => {
    coursesListModule = new CoursesListModule();
  });

  it('should create an instance', () => {
    expect(coursesListModule).toBeTruthy();
  });
});
