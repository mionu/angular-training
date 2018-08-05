import { Injectable } from '@angular/core';
import { User } from './user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:3004';
const AUTH_PATH ='/auth/login';
const GET_USER_INFO_PATH = '/auth/userinfo';

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

  getUserInfo({ token }) {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: token
    });
    return this.http.post<User>(`${BASE_URL}${GET_USER_INFO_PATH}`, {}, { headers });
  }

}
