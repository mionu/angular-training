import { TestBed, inject } from '@angular/core/testing';
<<<<<<< HEAD:src/tests/authorization.service.spec.ts
import { AuthorizationService } from '../app/core/authorization.service';
=======
import { UserService } from '../app/core/authorization.service';
>>>>>>> b58cb4d460f5c5c7ef6e125fa626ae3e903bfd43:src/tests/authorization.service.spec.ts

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthorizationService]
    });
  });

  it('should be created', inject([AuthorizationService], (service: AuthorizationService) => {
    expect(service).toBeTruthy();
  }));
});
