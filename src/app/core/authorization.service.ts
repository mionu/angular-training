import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { User } from './user.model';
import { BASE_URL, AUTH_PATH, GET_USER_INFO_PATH } from 'src/app/core/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  currentUser: BehaviorSubject<User> = new BehaviorSubject(null);

  constructor(private http: HttpClient) { }

  login({ login, password }): Observable<any> {
    return this.http.post<any>(`${BASE_URL}${AUTH_PATH}`, { login, password })
      .pipe(
        map(({ token }) => {
          if (token) {
            localStorage.setItem('fakeToken', token);
            return token;
          }
        }),
        switchMap(() => this.getUserInfo())
      );
  }

  logout() {
    this.currentUser.next(null);
    localStorage.removeItem('fakeToken');
  }

  isAuthenticated() {
    return this.currentUser.pipe(
      map(user => user && user.login)
    );
  }

  getUserInfo() {
    return this.http.post<User>(`${BASE_URL}${GET_USER_INFO_PATH}`, {});
  }

}
