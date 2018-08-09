import { Injectable } from '@angular/core';

interface Breadcrumb {
  label: string,
  action?: Function
}

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  private _breadcrumb: Array<Breadcrumb>;

  constructor() { }

  set breadcrumb(value) {
    this._breadcrumb = value;
  }

  get breadcrumb() {
    return this._breadcrumb;
  }
}
