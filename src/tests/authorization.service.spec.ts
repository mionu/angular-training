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

  it('shoudl not log in with wrong email/password combination', inject([AuthorizationService], fakeAsync((service: AuthorizationService) => {
    service.login({ login: 'qwe', password: 'asd' }).subscribe(token => {
      expect(token).toBeTruthy();
    });
  })));

  it('should log out', inject([AuthorizationService], (service: AuthorizationService) => {
    service.login(creds).subscribe(() => {
      expect(localStorage.getItem('fakeToken')).toBeTruthy();
      service.logout();
      expect(localStorage.getItem('fakeToken')).toBeFalsy();
    });
  }));
});
