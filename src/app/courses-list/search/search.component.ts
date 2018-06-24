import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public searchQuery: string = '';

  constructor() { }

  onClick() {
    console.log(this.searchQuery);
    this.searchQuery = ''
  }

  ngOnInit() {
  }

}
