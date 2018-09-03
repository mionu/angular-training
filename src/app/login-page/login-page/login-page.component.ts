import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthorizationService } from '../../core/authorization.service';
import { RouterPaths } from '../../app-routing/app-routing.constants';
import { DEFAULT_COURSES_PER_PAGE } from 'src/app/courses-list/course.constants';
import { LOGIN } from 'src/app/shared/actions.constants';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  login: string;
  password: string;

  constructor(
    private authService: AuthorizationService,
    private router: Router,
    private store: Store<any>
  ) { }

  ngOnInit() {
  }

  doLogin() {
    this.store.dispatch({ type: LOGIN, payload: { login: this.login, password: this.password } });
    // this.authService.login({ login: this.login, password: this.password }).
    // subscribe(res => {
    //   if(res.token) {
    //     localStorage.setItem('fakeToken', res.token);
    //     this.authService.getUserInfo().subscribe((user) => {
    //       this.authService.currentUser = user;
    //       this.router.navigate([RouterPaths.COURSES], { queryParams: { start: 0, count: DEFAULT_COURSES_PER_PAGE } });
    //   });
    //   }
    // }, err => {
    //   console.error(err);
    // });
  }

}
