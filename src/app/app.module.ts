import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AgmCoreModule, GoogleMapsAPIWrapper} from '@agm/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UploadFormComponent} from "./upload-form/upload-form.component";
import {UploadListComponent} from "./upload-list/upload-list.component";
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import {UploadDetailsComponent} from "./upload-details/upload-details.component";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {CommonModule} from '@angular/common';
import { AgmMarkerClustererModule } from '@agm/markerclusterer';

@NgModule({
  declarations: [
    AppComponent,
    UploadFormComponent,
    UploadListComponent,
    UploadDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA-eSfV-x345rNPTkJlGWlvuumEdG01bnY'
    }),
    AgmMarkerClustererModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatCardModule,
    MatListModule,
    MatCheckboxModule,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [GoogleMapsAPIWrapper],
  bootstrap: [AppComponent]
})
export class AppModule {
}
