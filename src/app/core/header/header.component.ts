import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthorizationService } from '../authorization.service';
import { RouterPaths } from '../../app-routing/app-routing.constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public userLogin: string = '';
  private subscription;

  constructor(private authService: AuthorizationService, private router: Router) { }

  ngOnInit() {
    this.userLogin = this.authService.getUserInfo();
    this.subscription = this.router.events.subscribe(e => {
      if(e instanceof NavigationEnd) {
        this.initUserInfo();
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  get isUserInfoVisible() {
    return !this.router.url.match(/login/gi);
  }

  initUserInfo() {
    this.userLogin = this.authService.getUserInfo();
  }

  onButtonClick() {
    if(this.authService.isAuthenticated()) {
      this.authService.logout();
      this.userLogin = '';
    }
    this.router.navigate([RouterPaths.LOGIN]);
  }

}
