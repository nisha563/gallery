import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {environment} from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { Media, MediaObject } from '@ionic-native/media/ngx';
//import { AngularFirestoreModule } from '@angular/fire/storage';
//import { AngularFirestore } from '@angular/fire/firestore/ngx'
import { DocumentViewer,DocumentViewerOptions} from '@ionic-native/document-viewer/ngx';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
     IonicModule.forRoot(), 
    //AngularFireModule.initializeApp(environment.firebaseConfig),
    AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFirestore,
    Media,
    AngularFireStorageModule,
    { provide: RouteReuseStrategy,
     useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
