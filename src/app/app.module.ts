import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { DirectivesModule } from './directives/directives.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UtilService } from './services/util.service';

// components
import { PagewrapperComponent } from './components/pagewrapper/pagewrapper.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProjectDialogueComponent } from './components/project-dialogue/project-dialogue.component';

import {
  MatButtonModule,
  MatMenuModule,
  MatIconModule,
  MatDialogModule,
  MatSelectModule,
  MatInputModule,
} from '@angular/material';

@NgModule({
  entryComponents: [
    ProjectDialogueComponent,
  ],
  declarations: [
    AppComponent,
    PagewrapperComponent,
    FooterComponent,
    NavbarComponent,
    ProjectDialogueComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    DirectivesModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    UtilService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
