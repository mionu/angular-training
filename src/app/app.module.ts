import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { CoursesListModule } from './courses-list/courses-list.module';
import { ModalComponent } from './shared/modal/modal.component';
import { CoursesListComponent } from './courses-list/courses-list/courses-list.component';
import { LoginPageComponent } from './login-page/login-page/login-page.component';
import { LoginPageModule } from './login-page/login-page.module';

const appRoutes: Routes = [
  { path: 'courses-list', component: CoursesListComponent },
  { path: 'login',      component: LoginPageComponent },
  { path: '',
    redirectTo: '/courses-list',
    pathMatch: 'full'
  },
  { path: '**', component: CoursesListComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true } // <-- debugging purposes only
    ),
    CoreModule,
    CoursesListModule,
    LoginPageModule
  ],
  entryComponents: [ ModalComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
