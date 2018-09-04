import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  isShown: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() { }

  show() {
    this.isShown.next(true);
  }

  hide() {
    this.isShown.next(false);
  }
}
