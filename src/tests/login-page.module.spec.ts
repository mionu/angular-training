import { LoginPageModule } from '../app/login-page/login-page.module';

describe('LoginPageModule', () => {
  let loginPageModule: LoginPageModule;

  beforeEach(() => {
    loginPageModule = new LoginPageModule();
  });

  it('should create an instance', () => {
    expect(loginPageModule).toBeTruthy();
  });
});
