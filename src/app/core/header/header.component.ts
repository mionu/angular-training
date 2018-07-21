import { Component, OnInit, Input } from '@angular/core';
import { User } from '../user.model';
import { UserService } from '../authorization.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public userLogin: string = '';

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userLogin = this.userService.getUserInfo();
  }

  onButtonClick() {
    if(this.userService.isAuthenticated()) {
      this.userService.logout();
      this.userLogin = '';
    }
  }

}
