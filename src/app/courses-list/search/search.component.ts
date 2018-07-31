import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public searchQuery: string = '';
  @Output() public searchEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  search() {
    this.searchEvent.emit({ type: 'search', query: this.searchQuery });
  }

  ngOnInit() {
  }

}
