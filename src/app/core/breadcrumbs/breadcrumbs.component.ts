import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit {
  breadcrumbs: Array<any>;
  subscription;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.breadcrumbs = [];
        const currentRoute = this.route.root;
        currentRoute.children && currentRoute.children.forEach(child => {
          const routeData = child.routeConfig.data;
          if (routeData && routeData.breadcrumb) {
            this.breadcrumbs = this.breadcrumbs.concat(routeData.breadcrumb);
          }
        });
      }
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  get isVisible() {
    return this.router.url.match(/courses/gi);
  }

}
