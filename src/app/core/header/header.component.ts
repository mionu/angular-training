import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../authorization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public userLogin: string = '';

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userLogin = this.userService.getUserInfo();
  }

  get isUserInfoVisible() {
    return !this.router.url.match(/login/gi);
  }

  onButtonClick() {
    if(this.userService.isAuthenticated()) {
      this.userService.logout();
      this.userLogin = '';
    } else {
      this.router.navigate(['/login']);
    }
  }

}
