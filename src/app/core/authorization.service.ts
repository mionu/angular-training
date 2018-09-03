import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model';
import { BASE_URL, AUTH_PATH, GET_USER_INFO_PATH } from 'src/app/core/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  currentUser: User = null;

  constructor(private http: HttpClient) { }

  login({ login, password }): Observable<any> {
    return this.http.post(`${BASE_URL}${AUTH_PATH}`, { login, password });
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('fakeToken');
  }

  isAuthenticated() {
    return !!this.currentUser;
  }

  getUserInfo() {
    return this.http.post<User>(`${BASE_URL}${GET_USER_INFO_PATH}`, {});
  }

}
