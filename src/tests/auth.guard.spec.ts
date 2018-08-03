import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthGuard } from 'src/app/core/auth.guard';
import { AuthorizationService } from '../app/core/authorization.service';

describe('AuthGuard', () => {
  let authService: AuthorizationService;
  let authGuard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ AuthGuard, AuthorizationService ],
      imports: [ RouterTestingModule ]
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
    expect(authGuard.canActivate(null, null)).toBeFalsy();
  });

  it('should return true when user is logged in', () => {
    authService.currentUser = { id: 0, email: 'asd', password: '', login: 'qwe' };
    expect(authGuard.canActivate(null, null)).toBeTruthy();
  });
});
