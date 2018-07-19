import * as moment from 'moment';
import { OrderByPipe } from '../app/courses-list/order-by.pipe';
import { Course } from '../app/courses-list/course.model';

describe('OrderByPipe', () => {
  let pipe: OrderByPipe;
  let courses: Course[] = [{
    id: 2,
    title: 'qwe',
    creationDate: moment().subtract(2, 'months').toDate(),
    duration: 80,
    description: 'desc 2'
  }, {
    id: 3,
    title: 'qweasd',
    creationDate: new Date(),
    duration: 95,
    description: 'desc 3'
  }, {
    id: 1,
    title: 'asd',
    creationDate: moment().subtract(3, 'months').toDate(),
    duration: 60,
    description: 'desc 1'
  }];

  beforeEach(() => {
    pipe = new OrderByPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should order by Date parameter (desc)', () => {
    const orderedByDate = pipe.transform(courses, 'creationDate');
    expect(orderedByDate[0].id).toBe(3);
  });

  it('should order by numeric parameter (desc)', () => {
    const orderedById = pipe.transform(courses, 'id');
    expect(orderedById[0].id).toBe(3);
  });

  it('should order by string parameter (desc)', () => {
    const orderedByTitle = pipe.transform(courses, 'title');
    expect(orderedByTitle[0].id).toBe(1);
  });
});
