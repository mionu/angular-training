import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from '../../core/authorization.service';
import { RouterPaths } from '../../app-routing/app-routing.constants';
import { DEFAULT_COURSES_PER_PAGE } from 'src/app/courses-list/course.constants';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  login: string;
  password: string;

  constructor(private authService: AuthorizationService, private router: Router) { }

  ngOnInit() {
  }

  doLogin() {
    this.authService.login({ login: this.login, password: this.password }).
    subscribe(res => {
      if(res.token) {
        localStorage.setItem('fakeToken', res.token);
        this.authService.getUserInfo({ token: res.token }).subscribe((user) => {
          this.authService.currentUser = user;
          this.router.navigate([RouterPaths.COURSES], { queryParams: { start: 0, count: DEFAULT_COURSES_PER_PAGE } });
      });
      }
    }, err => {
      console.error(err);
    });
  }

}
