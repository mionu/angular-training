import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public searchQuery: string = '';
  @Output() public searchEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private coursesService: CoursesService) { }

  ngOnInit() { }

  onInput() {
    if(this.searchQuery.length === 0 || this.searchQuery.length > 2) {
      const { querySubject } = this.coursesService;
      querySubject.next(this.searchQuery);
    }
  }

  search() {
    this.searchEvent.emit({ type: 'search', query: this.searchQuery });
  }

}
