import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public searchQuery: string = '';

  constructor(private coursesService: CoursesService) { }

  ngOnInit() { }

  onInput() {
    if(this.searchQuery.length === 0 || this.searchQuery.length > 2) {
      of(this.searchQuery)
      .subscribe(q => this.coursesService.query.next({ query: q }));
    }
  }

}
