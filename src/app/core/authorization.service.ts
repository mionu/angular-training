import { Injectable } from '@angular/core';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  currentUser: User = null;
  users: User[] = [{
    id: 1,
    email: 'janedoe',
    password: 'password',
    login: 'janedoe'
  }];

  constructor() { }

  login({ email, password }) {
    const userIndex = this.users.findIndex(user => user.email === email && user.password === password);
    if(userIndex > -1) {
      this.currentUser = this.users[userIndex];
      localStorage.setItem('email', email);
      return true;
    }
    return false;
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('email');
  }

  isAuthenticated() {
    return !!this.currentUser;
  }

  getUserInfo() {
    return this.isAuthenticated() ? this.currentUser.login : null;
  }

}
