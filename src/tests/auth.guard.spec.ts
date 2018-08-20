import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthGuard } from 'src/app/core/auth.guard';
import { AuthorizationService } from '../app/core/authorization.service';

describe('AuthGuard', () => {
  let authService: AuthorizationService;
  let authGuard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ AuthGuard, AuthorizationService ],
      imports: [ RouterTestingModule, HttpClientTestingModule ]
    });
    authService = TestBed.get(AuthorizationService);
    authGuard = TestBed.get(AuthGuard);
    // @ts-ignore
    spyOn(authGuard.router, 'navigate').and.returnValue(true);
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));

  it('should return false when user is not logged in', () => {
    // @ts-ignore
    authGuard.canActivate(null, null).pipe(
      map(canActivate => {
        expect(canActivate).toBeFalsy();
      })
    );
  });

  it('should return true when user is logged in', () => {
    authService.currentUser = new BehaviorSubject({ id: 0, password: '', login: 'qwe', name: { first: '', last: '' }, fakeToken: '' });
    // @ts-ignore
    authGuard.canActivate(null, null).pipe(
      map(canActivate => {
        expect(canActivate).toBeTruthy();
      })
    );
  });
});
