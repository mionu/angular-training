import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from '../authorization.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public userLogin: string = '';

  constructor(private authService: AuthorizationService, private router: Router) { }

  ngOnInit() {
    this.userLogin = this.authService.getUserInfo();
  }

  get isUserInfoVisible() {
    return !this.router.url.match(/login/gi);
  }

  onButtonClick() {
    if(this.authService.isAuthenticated()) {
      this.authService.logout();
      this.userLogin = '';
    } else {
      this.router.navigate(['/login']);
    }
  }

}
