import { authReducer } from 'src/app/core/auth.reducer';
import { userReducer } from 'src/app/core/user.reducer';

export const rootReducer = {
  fakeToken: authReducer,
  user: userReducer
};
