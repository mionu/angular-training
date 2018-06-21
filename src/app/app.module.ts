import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';
import { CoursesListModule } from './courses-list/courses-list.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    CoursesListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
