import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/user.service';
import { User } from 'src/app/core/user.model';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit {
  constructor() { }

  ngOnInit() { }

}
