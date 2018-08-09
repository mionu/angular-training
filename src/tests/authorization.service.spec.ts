import { TestBed, inject, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthorizationService } from '../app/core/authorization.service';

const creds ={
  id: 1,
  email: 'janedoe',
  password: 'password',
  login: 'janedoe'
};

describe('AuthorizationService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ AuthorizationService ],
      imports: [ HttpClientTestingModule ]
    });
  });

  it('should be created', inject([AuthorizationService], (service: AuthorizationService) => {
    expect(service).toBeTruthy();
  }));

  it('should log in with correct email/password combination', inject([AuthorizationService], fakeAsync((service: AuthorizationService) => {
    service.login(creds).subscribe(token => {
      expect(token).toBeTruthy();
    });
  })));

  it('shoudl not log in with wrong email/password combination', inject([AuthorizationService], (service: AuthorizationService) => {
    expect(service.login({ login: 'qwe', password: 'asd' })).toBeFalsy();
  }));

  it('should log out', inject([AuthorizationService], (service: AuthorizationService) => {
    service.login(creds);
    service.logout();
  }));

  it('should return correct isAuthenticated status', inject([AuthorizationService], (service: AuthorizationService) => {
    expect(service.isAuthenticated()).toBeFalsy();
    service.login(creds);
    expect(service.isAuthenticated()).toBeTruthy();
  }));

  it('getUserInfo() should return user login when authenticated', inject([AuthorizationService], (service: AuthorizationService) => {
    expect(service.getUserInfo()).toBeNull();
    service.login(creds);
    expect(service.getUserInfo()).toBe('janedoe');
  }));
});
