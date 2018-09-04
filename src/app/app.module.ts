import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { CoursesListModule } from './courses-list/courses-list.module';
import { ModalComponent } from './shared/modal/modal.component';
import { LoginPageModule } from './login-page/login-page.module';
import { CoursePageModule } from './course-page/course-page.module';
import { AuthInterceptor } from './core/auth.interceptor';
import { authReducer } from './core/auth.reducer';
import { userReducer } from 'src/app/core/user.reducer';
import { AuthEffects } from './core/auth.effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({ fakeToken: authReducer, user: userReducer }),
    EffectsModule.forRoot([ AuthEffects ]),
    NgbModule.forRoot(),
    CoreModule,
    SharedModule,
    AppRoutingModule,
    CoursesListModule,
    LoginPageModule,
    CoursePageModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  entryComponents: [ ModalComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
