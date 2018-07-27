import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from '../../core/authorization.service';
import { RouterPaths } from '../../app-routing/app-routing.constants';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  email: string;
  password: string;

  constructor(private authService: AuthorizationService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    if(this.authService.login({ email: this.email, password: this.password })) {
      this.router.navigate([RouterPaths.COURSES]);
    } else {
      console.error('wrong login or password');
    }
  }

}
