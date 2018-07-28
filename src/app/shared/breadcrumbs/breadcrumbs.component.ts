import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbService } from '../breadcrumb.service';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit {
  constructor(
    private router: Router,
    public breadcrumbsService: BreadcrumbService
  ) { }

  ngOnInit() { }

  get isVisible() {
    return this.router.url.match(/courses/gi);
  }

}
