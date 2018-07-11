import { Course as CourseModel } from './course.model';

export class CourseEntity implements CourseModel {
  id: number;
  title: string;
  creationDate: number;
  duration: number;
  description: string;

  constructor(course) {
    Object.assign(this, course);
  }

  get outline() {
    return 'success';
  }
}
