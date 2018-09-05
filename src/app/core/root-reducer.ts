import { authReducer } from 'src/app/core/auth.reducer';
import { userReducer } from 'src/app/core/user.reducer';
import { coursesReducer } from 'src/app/courses-list/courses.reducer';

export const rootReducer = {
  fakeToken: authReducer,
  user: userReducer,
  courses: coursesReducer
};
