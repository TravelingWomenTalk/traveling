// @angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

// Application
import { environment } from 'src/environments/environment';
import { AppRoutingModule, RoutingComponents } from './app-routing.module';
import { AppComponent } from './app.component';

// Services
import { ReviewService } from './shared/services/review.sevice';
import { ToastService } from './shared/services/toast.service';

// Components
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { ToastsComponent } from './shared/components/toast/toast.component';
import { ReadMoreComponent } from './shared/components/read-more/read-more.component';

// User Interface
import { TimeAgoPipe } from 'time-ago-pipe';
import { NgbModule, NgbDatepickerModule, NgbDateAdapter, NgbDateNativeAdapter, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { DateFormatPipe } from './shared/pipes/date-format.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    RoutingComponents,
    ToastsComponent,
    ReadMoreComponent,
    TimeAgoPipe,
    DateFormatPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    NgbDatepickerModule,
    NgbModalModule
  ],
  providers: [
    {provide: NgbDateAdapter, useClass: NgbDateNativeAdapter},
    ReviewService,
    ToastService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
