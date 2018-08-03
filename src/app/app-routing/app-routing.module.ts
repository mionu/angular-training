import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CoursesListComponent } from '../courses-list/courses-list/courses-list.component';
import { CoursePageComponent } from '../course-page/course-page/course-page.component';
import { LoginPageComponent } from '../login-page/login-page/login-page.component';
import { PageNotFoundComponent } from '../shared/page-not-found/page-not-found.component';
import { RouterPaths } from './app-routing.constants';
import { AuthGuard } from '../core/auth.guard';

const appRoutes: Routes = [{
    path: RouterPaths.COURSES,
    component: CoursesListComponent,
    canActivate: [ AuthGuard ]
  }, {
    path: RouterPaths.NEW_COURSE,
    component: CoursePageComponent,
    canActivate: [ AuthGuard ]
  }, {
    path: `${RouterPaths.COURSES}/:id`,
    component: CoursePageComponent,
    canActivate: [ AuthGuard ]
  }, {
    path: RouterPaths.LOGIN,
    component: LoginPageComponent
  },
  { path: '',
    redirectTo: `/${RouterPaths.COURSES}`,
    pathMatch: 'full',
    canActivate: [ AuthGuard ]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
