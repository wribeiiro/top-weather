import { CityDetailsPage } from './../pages/city-details/city-details';
import { AddCidadePage } from './../pages/add-cidade/add-cidade';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Http, Headers, RequestOptions, HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CityProvider } from '../providers/city/city';
import { CityServiceProvider } from '../providers/city-service/city-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    AddCidadePage,
    CityDetailsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    AddCidadePage,
    CityDetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CityProvider,
    CityProvider,
    CityServiceProvider
  ]
})
export class AppModule {}
