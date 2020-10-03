import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './commons/header/header.component';
import { RedirectorComponent } from './link/redirector/redirector.component';
import { ShortlinkCreateComponent } from './link/shortlink-create/shortlink-create.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFirestoreModule, SETTINGS} from '@angular/fire/firestore';
import { NotFoundComponent } from './not-found/not-found.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AngularFirePerformanceModule, PerformanceMonitoringService} from '@angular/fire/performance';
import {AngularFireAnalyticsModule, ScreenTrackingService} from '@angular/fire/analytics';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RedirectorComponent,
    ShortlinkCreateComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFirePerformanceModule,
    AngularFireAnalyticsModule
  ],
  providers: [
    {
      provide: SETTINGS,
      useValue: environment.production ? undefined : {
        host: 'localhost:8080',
        ssl: false
      }
    },
    PerformanceMonitoringService,
    ScreenTrackingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
