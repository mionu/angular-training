import { Injectable } from '@angular/core';
import { User } from './user.model';

const users: User[] = [{
  id: 1,
  email: 'janedoe@example.com',
  password: 'password',
  login: 'janedoe'
}];

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser: User = null;

  constructor() {
    this.currentUser = users[0];
  }

  login({ email, password }) {
    const userIndex = users.findIndex(user => user.email === email && user.password === password);
    if(userIndex > -1) {
      this.currentUser = users[userIndex];
      localStorage.setItem('email', email);
      return true;
    }
    return false;
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('email');
    console.log('logged out');
  }

  isAuthenticated() {
    return !!this.currentUser;
  }

  getUserInfo() {
    return this.isAuthenticated() ? this.currentUser.login : null;
  }

}
