import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToasterContainerComponent, ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';


import { appRoutes } from './app.routes';

import { StudentService } from './services/student.service';

import { AppComponent } from './app.component';
import { AddpersonComponent } from './components/addperson/addperson.component';
import { PersonsListComponent } from './components/personslist/personslist.component';

@NgModule({
  declarations: [
    AppComponent,
    AddpersonComponent,
    PersonsListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    ToasterModule.forRoot()
  ],
  providers: [
    StudentService,
    ToasterService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
