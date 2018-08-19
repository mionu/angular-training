import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatProgressSpinnerModule
  ],
  declarations: [ HeaderComponent, FooterComponent, LoadingComponent ],
  exports: [ HeaderComponent, FooterComponent, LoadingComponent ]
})
export class CoreModule { }
