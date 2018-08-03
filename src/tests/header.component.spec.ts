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
    spyOn(component.router, 'navigate').and.returnValue(true);
    authServiceStub = {
      getUserInfo: () => 'janedoe',
      isAuthenticated: () => true,
      logout: jasmine.createSpy()
    }
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should display current user login', () => {
    fixture.detectChanges();
    const userName = fixture.nativeElement.querySelector('.user-name');
    expect(userName.textContent).toEqual('janedoe');
  });

  it('should log out on button click', () => {
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    expect(TestBed.get(AuthorizationService).logout).toHaveBeenCalled();
  });
});
