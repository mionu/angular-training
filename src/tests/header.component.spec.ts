import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from '../app/core/header/header.component';
import { AuthorizationService } from '../app/core/authorization.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authServiceStub: Partial<AuthorizationService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      providers: [ { provide: AuthorizationService, useValue: authServiceStub } ],
      imports: [ RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    // @ts-ignore
    component.subscription = { unsubscribe: jasmine.createSpy() };
    authServiceStub = {
      getUserInfo: () => 'janedoe'
    }
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should load current user name on init', () => {
    component.ngOnInit();
    const currentUser = TestBed.get(AuthorizationService).getUserInfo();
    expect(component.userLogin).toBeDefined();
    expect(component.userLogin).toEqual(currentUser);
  });

  it('should display current user login', () => {
    fixture.detectChanges();
    const userName = fixture.nativeElement.querySelector('.user-name');
    expect(userName.textContent).toEqual('janedoe');
  });
});
