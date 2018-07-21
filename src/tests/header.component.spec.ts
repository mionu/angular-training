import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from '../app/core/header/header.component';
import { UserService } from '../app/core/authorization.service';
import { User } from '../app/core/user.model';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let userServiceStub: Partial<UserService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      providers:[ { provide: UserService, useValue: userServiceStub } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    userServiceStub = {
      getCurrentUser: () => ({
        id: 1,
        firstName: 'Jane',
        lastName: 'Doe'
      })
    };
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should load current user name on init', () => {
    expect(component.currentUser).toBeNull();
    component.ngOnInit();
    const currentUser = TestBed.get(UserService).getCurrentUser();
    expect(component.currentUser).toBeDefined();
    expect(component.currentUser.firstName).toEqual(currentUser.firstName);
  });

  it('should display current user name', () => {
    fixture.detectChanges();
    const userName = fixture.nativeElement.querySelector('.user-name');
    expect(userName.textContent).toEqual('Jane Doe');
  });
});
