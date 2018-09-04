import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { isEmpty } from 'rxjs/operators';
import { AuthorizationService } from '../authorization.service';
import { RouterPaths } from '../../app-routing/app-routing.constants';
import { User } from '../user.model';
import { AUTH_ACTIONS } from '../../shared/actions.constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: Observable<User>

  constructor(
    public authService: AuthorizationService,
    private router: Router,
    private store: Store<any>
  ) {
    // @ts-ignore
    this.user = store.pipe(select('user'));
  }

  ngOnInit() { }

  get isUserInfoVisible() {
    return !this.router.url.match(/login/gi);
  }

  get isAuthenticated() {
    return this.user.pipe(isEmpty());
  }

  onButtonClick() {
    if(this.isAuthenticated) {
      this.store.dispatch({ type: AUTH_ACTIONS.LOGOUT });
    }
    this.router.navigate([RouterPaths.LOGIN]);
  }

}
