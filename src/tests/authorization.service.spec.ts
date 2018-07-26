import { TestBed, inject } from '@angular/core/testing';
import { AuthorizationService } from '../app/core/authorization.service';

const creds = {
  email: 'janedoe@example.com', password: 'password'
};

describe('UserService', () => {
  let service: AuthorizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ AuthorizationService ]
    });
    service = new AuthorizationService();
  });

  it('should be created', inject([AuthorizationService], (service: AuthorizationService) => {
    expect(service).toBeTruthy();
  }));

  it('should log in with correct email/password combination', () => {
    expect(service.login(creds)).toBeTruthy();
    expect(service.currentUser.login).toBe('janedoe');
  });

  it('shoudl not log in with wrong email/password combination', () => {
    expect(service.login({ email: 'qwe', password: 'asd' })).toBeFalsy();
    expect(service.currentUser).toBeNull();
  });

  it('should log out', () => {
    service.login(creds);
    service.logout();
    expect(service.currentUser).toBeNull();
  });

  it('should return correct isAuthenticated status', () => {
    expect(service.isAuthenticated()).toBeFalsy();
    service.login(creds);
    expect(service.isAuthenticated()).toBeTruthy();
  });

  it('getUserInfo() should return user login when authenticated', () => {
    expect(service.getUserInfo()).toBeNull();
    service.login(creds);
    expect(service.getUserInfo()).toBe('janedoe');
  });
});
