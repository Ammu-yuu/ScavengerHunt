import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicStorageModule } from '@ionic/storage-angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//firebase
import { AngularFireModule } from '@angular/fire';
import{ AngularFirestore, AngularFirestoreModule  } from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
//environment
//import { initializeApp } from "firebase/app";

import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
//auth service
import { AuthService } from './services/auth.service';
//auth guard
//import { AuthGuard } from './guard/auth.guard';

import { AuthGuard } from './guard/auth.guard';
import { fstat } from 'fs';
// geolocation and native-geocoder
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { HttpClientModule } from '@angular/common/http';
import {GoogleMapsAPIWrapper} from '@agm/core'; 
import {AgmCoreModule} from '@agm/core';


const firebaseConfig = {
  apiKey: "AIzaSyDa1ZZhdWBpZggft6hBF_xHwp_RxESwUps",
  authDomain: "scavenger-hunt-dcec2.firebaseapp.com",
  projectId: "scavenger-hunt-dcec2",
  storageBucket: "scavenger-hunt-dcec2.appspot.com",
  messagingSenderId: "889682497357",
  appId: "1:889682497357:web:f7d39d7139bccc4270b104",
  measurementId: "G-MGWNNXKEWH"
};

//const app = initializeApp(firebaseConfig);
AngularFireModule.initializeApp(firebaseConfig)

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    FormsModule, HttpClientModule,
    //AngularFireModule.initializeApp(environment.firebaseConfig),

    AngularFireStorageModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAYyb-NXTQWYtzLcNfENw5YQaaLRgGA4Z4'
   }),
    
  ],
  providers: [
    NativeGeocoder,
    Geolocation,
    AngularFirestore,
    AuthService,
    AuthGuard,
    Geolocation,
    NativeGeocoder,
    StatusBar,
    SplashScreen, GoogleMapsAPIWrapper,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
