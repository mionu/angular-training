import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public searchQuery: string = '';
  @Output() public searchEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private route: ActivatedRoute) { }

  search() {
    this.searchEvent.emit({ type: 'search', query: this.searchQuery });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const { query } = params;
      this.searchQuery = query;
    });
  }

}
