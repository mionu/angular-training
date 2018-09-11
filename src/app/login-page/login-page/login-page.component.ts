import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { RouterPaths } from '../../app-routing/app-routing.constants';
import { DEFAULT_COURSES_PER_PAGE } from 'src/app/courses-list/course.constants';
import { LoadingService } from '../../core/loading.service';
import { AUTH_ACTIONS } from 'src/app/shared/actions.constants';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  login: string;
  password: string;

  constructor(
    private router: Router,
    private loading: LoadingService,
    private store: Store<any>
  ) {
    this.store.pipe(
      select('fakeToken'),
      filter(Boolean)
    ).subscribe(() => this.router.navigate([RouterPaths.COURSES], { queryParams: { start: 0, count: DEFAULT_COURSES_PER_PAGE }}));
  }

  ngOnInit() {
  }

  doLogin() {
    this.loading.show();
    this.store.dispatch({
      type: AUTH_ACTIONS.LOGIN, payload: { login: this.login, password: this.password }
    });
  }

}
