import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CoursesListComponent } from '../courses-list/courses-list/courses-list.component';
import { CoursePageComponent } from '../course-page/course-page/course-page.component';
import { LoginPageComponent } from '../login-page/login-page/login-page.component';
import { PageNotFoundComponent } from '../shared/page-not-found/page-not-found.component';
import { RouterPaths } from './app-routing.constants';

const appRoutes: Routes = [
  { path: RouterPaths.COURSES, component: CoursesListComponent },
  { path: RouterPaths.NEW_COURSE, component: CoursePageComponent },
  { path: `${RouterPaths.COURSES}/:id`, component: CoursePageComponent },
  { path: RouterPaths.LOGIN, component: LoginPageComponent },
  { path: '',
    redirectTo: `/${RouterPaths.COURSES}`,
    pathMatch: 'full'
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
