import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { appRoutes } from './app.routing';
import {
  MdButtonModule, MdInputModule, MdPaginatorModule, MdSnackBarModule, MdTableModule,
  MdTabsModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CdkTableModule } from '@angular/cdk/table';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { HomeListComponent } from './home-list/home-list.component';
import { HomeFormComponent } from './home-form/home-form.component';
import { ChildrenService } from './shared/services/children.service';
import { MomentModule } from 'angular2-moment';
import { TimerService } from './shared/services/timer.service';
import { HistoryListComponent } from './history-list/history-list.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomeListComponent,
    HomeFormComponent,
    HistoryListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdInputModule,
    MdTableModule,
    CdkTableModule,
    MdPaginatorModule,
    ReactiveFormsModule,
    MomentModule,
    MdSnackBarModule,
    MdTabsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forRoot(appRoutes,
      {
        preloadingStrategy: PreloadAllModules
      })
  ],
  providers: [
    ChildrenService,
    TimerService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
