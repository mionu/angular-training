import { SearchCoursePipe } from '../app/courses-list/search-course.pipe';
import { Course } from '../app/courses-list/course.model';

describe('SearchCoursePipe', () => {
  let pipe: SearchCoursePipe;
  let courses: Course[] = [{
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
  }];

  beforeEach(() => {
    pipe = new SearchCoursePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return all elements matching the query', () => {
    const res = pipe.transform(courses, 'qwe');
    expect(res.length).toBe(2);
    expect(res[0].title.toLowerCase()).toContain('qwe');
  });

  it('should not be case specific', () => {
    const res = pipe.transform(courses, 'ASd');
    expect(res.length).toBe(2);
    expect(res[0].title.toLowerCase()).toContain('asd');
  });
});
