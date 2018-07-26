import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from '../app/courses-list/search/search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should perform search on search button click', () => {
    component.search = jasmine.createSpy();
    const searchButton = fixture.nativeElement.querySelector('button');
    searchButton.click();
    expect(component.search).toHaveBeenCalled();
  });

  it('should raise search event', () => {
    let searchEvent;
    const el = fixture.nativeElement;
    component.searchEvent.subscribe(e => searchEvent = e);
    const searchInput = el.querySelector('.search-input');
    const searchButton = el.querySelector('.search-button');
    searchInput.value = 'asd';
    searchInput.dispatchEvent(new Event('input'));
    searchButton.click();
    expect(searchEvent.type).toEqual('search');
  });
});
