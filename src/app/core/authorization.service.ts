import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model';
import { BASE_URL, AUTH_PATH, GET_USER_INFO_PATH } from 'src/app/core/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private http: HttpClient) { }

  login({ login, password }): Observable<any> {
    return this.http.post<any>(`${BASE_URL}${AUTH_PATH}`, { login, password });
  }

  logout() {
    localStorage.removeItem('fakeToken');
  }

  getUserInfo() {
    return this.http.post<User>(`${BASE_URL}${GET_USER_INFO_PATH}`, {});
  }

}
