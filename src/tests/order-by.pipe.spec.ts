import * as moment from 'moment';
import { List } from 'immutable';
import { OrderByPipe } from '../app/courses-list/order-by.pipe';
import { Course } from '../app/courses-list/course.model';

describe('OrderByPipe', () => {
  let pipe: OrderByPipe;
  let courses: List<Course> = List([{
    id: 2,
    name: 'qwe',
    date: moment().subtract(2, 'months').toDate(),
    length: 80,
    description: 'desc 2'
  }, {
    id: 3,
    name: 'qweasd',
    date: new Date(),
    length: 95,
    description: 'desc 3'
  }, {
    id: 1,
    name: 'asd',
    date: moment().subtract(3, 'months').toDate(),
    length: 60,
    description: 'desc 1'
  }]);

  beforeEach(() => {
    pipe = new OrderByPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should order by Date parameter (desc)', () => {
    const orderedByDate = pipe.transform(courses, 'date');
    expect(orderedByDate.get(0).id).toBe(3);
  });

  it('should order by numeric parameter (desc)', () => {
    const orderedById = pipe.transform(courses, 'id');
    expect(orderedById.get(0).id).toBe(3);
  });

  it('should order by string parameter (desc)', () => {
    const orderedByTitle = pipe.transform(courses, 'name');
    expect(orderedByTitle.get(0).id).toBe(1);
  });
});
