import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CoursesListComponent } from 'src/app/courses-list/courses-list/courses-list.component';
import { CoursePageComponent } from 'src/app/course-page/course-page/course-page.component';
import { LoginPageComponent } from 'src/app/login-page/login-page/login-page.component';
import { PageNotFoundComponent } from 'src/app/shared/page-not-found/page-not-found.component';
import { RouterPaths } from './app-routing.constants';

const appRoutes: Routes = [
  { path: RouterPaths.COURSES, component: CoursesListComponent },
  { path: `${RouterPaths.COURSES}/:id`, component: CoursePageComponent },
  { path: RouterPaths.NEW_COURSE, component: CoursePageComponent },
  { path: RouterPaths.LOGIN,      component: LoginPageComponent },
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
