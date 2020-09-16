import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './commons/header/header.component';
import { RedirectorComponent } from './redirector/redirector.component';
import { ShortlinkCreateComponent } from './shortlink-create/shortlink-create.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RedirectorComponent,
    ShortlinkCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
