import { authReducer } from 'src/app/core/auth.reducer';
import { userReducer } from 'src/app/core/user.reducer';
import { coursesReducer } from '../courses-list/courses.reducer';
import { currentCourseReducer } from 'src/app/course-page/current-course.reducer';

export const rootReducer = {
  fakeToken: authReducer,
  user: userReducer,
  currentCourse: currentCourseReducer,
  courses: coursesReducer
};
