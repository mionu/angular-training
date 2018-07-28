import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from '../authorization.service';
import { RouterPaths } from '../../app-routing/app-routing.constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthorizationService, private router: Router) { }

  ngOnInit() { }

  get isUserInfoVisible() {
    return !this.router.url.match(/login/gi);
  }

  onButtonClick() {
    if(this.authService.isAuthenticated()) {
      this.authService.logout();
    }
    this.router.navigate([RouterPaths.LOGIN]);
  }

}
