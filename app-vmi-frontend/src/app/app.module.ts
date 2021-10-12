import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx'
import { File } from '@ionic-native/file/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { HttpService } from './http.service';
import { FileUploadModule } from 'ng2-file-upload';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Firebase } from '@ionic-native/firebase/ngx';
import { NotificationService } from './notification.service';
import { SimpleMaskModule } from 'ngx-ion-simple-mask';
import { StarRatingModule } from 'ionic4-star-rating';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { MediaCapture } from '@ionic-native/media-capture/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { IonicSelectableModule } from 'ionic-selectable';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx'


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    StarRatingModule,
    FileUploadModule,
    SimpleMaskModule,
    IonicSelectableModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule],
  providers: [
    Firebase,
    StatusBar,
    SplashScreen,
    Geolocation,
    ImagePicker,
    MediaCapture,
    File,
    BarcodeScanner,
    FileOpener,
    InAppBrowser,
    NativeGeocoder,
    HttpService,
    NotificationService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
