import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from '../../core/authorization.service';
import { RouterPaths } from '../../app-routing/app-routing.constants';
import { DEFAULT_COURSES_PER_PAGE } from 'src/app/courses-list/course.constants';
import { LoadingService } from '../../core/loading.service';

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
    private loading: LoadingService
  ) { }

  ngOnInit() {
  }

  doLogin() {
    this.loading.show();
    this.authService.login({ login: this.login, password: this.password }).
    subscribe(
      user => {
        if (user && user.login) {
          this.router.navigate([RouterPaths.COURSES], { queryParams: { start: 0, count: DEFAULT_COURSES_PER_PAGE } });
        }
      },
      err => console.error(err),
      () => this.loading.hide()
    );
  }

}
