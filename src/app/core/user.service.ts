import { Injectable } from '@angular/core';
import { User } from 'src/app/core/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  public getCurrentUser(): User {
    return {
      id: 1,
      firstName: 'Jane',
      lastName: 'Doe'
    };
  }
}
