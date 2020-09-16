import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ShortlinkCreateComponent} from './shortlink-create/shortlink-create.component';
import {RedirectorComponent} from './redirector/redirector.component';

const routes: Routes = [
  { path: '', component: ShortlinkCreateComponent},
  { path: ':id', component: RedirectorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
