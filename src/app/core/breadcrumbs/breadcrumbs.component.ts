import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() { }

  get isVisible() {
    return !this.router.url.match(/login/gi);
  }

}
