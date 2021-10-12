import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { HttpService } from '../../http.service'
import { Storage } from '@ionic/storage';
import { IonicSelectableComponent } from 'ionic-selectable';


class Port {
  public id: number;
  public name: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  noitem:any;
  cancel:any;
  search:any;

  ports: Port[];
  port: Port;

  email: any;
  login: any;
  empresa: any;
  phone: any;
  user: any;
  lat: any;
  lng: any;
  address: any;
  page: any;
  resultCompany: any;
  resultCountry: any;
  resultCity: any;
  resultRegion:any;
  // result:any;
  loginlength: any;
  logininput:any;
  empresalength: any;
  empresainput:any;
  phonelength: any;
  phoneinput:any;
  userspace: any;
  userinput:any;
  emailarr: any;
  emailinput:any;
  addressinput:any;
  emaildot: any;
  userlength: any;
  country:any;
  countryselect:any;
  region:any;
  regionselect:any;
  city:any;
  cityselect:any;
  language:any;

  constructor(
    private translate: TranslateService,
    private geolocation: Geolocation,
    private storage: Storage,
    private nativeGeocoder: NativeGeocoder,
    public toastController: ToastController,
    public registerService: HttpService) {

      this.ports = [
        { id: 1, name: 'Tokai' },
        { id: 2, name: 'Vladivostok' },
        { id: 3, name: 'Navlakhi' }
      ];

     }

  ngOnInit() {
  }

  selectCountry(){
    this.countryselect = this.country.alpha2Code;
  }

  selectRegion(){
    this.regionselect = this.region.region;
  }

  selectCity(){
    this.cityselect = this.city.city;
  }

  ionViewWillEnter() {

    this.loginlength = false;
    this.empresalength = false;
    this.phonelength = false;
    this.userspace = false;
    this.emailarr = false;
    this.emaildot = false;
    this.userlength = false;

    this.storage.get('language').then((val) => {
      this.language = val;
      this.translate.get('NOITEM').subscribe((res: string) => {
        this.noitem = res;
      });
      this.translate.get('CANCEL').subscribe((res: string) => {
        this.cancel = res;
      });
      this.translate.get('SEARCH').subscribe((res: string) => {
        this.search = res;
      });
    });  

  }

  sendPostRequest() {
    if (this.login) {
      this.logininput = false
      if (this.login.length < 6) {
        this.loginlength = true
      } else {
        this.loginlength = false
      }
    } else {
      this.logininput = true
    }
    if (this.empresa) {
      this.empresainput = false
      if (this.empresa.length < 1) {
        this.empresalength = true
      } else {
        this.empresalength = false
      }
    } else {
      this.empresainput = true
    }
    if (this.phone) {
      this.phoneinput = false
      if (this.phone.length < 2) {
        this.phonelength = true
      } else {
        this.phonelength = false
      }
    } else {
      this.phoneinput = true
    }
    if (this.email) {
      this.emailinput = false
      if (this.email.length < 6) {
        this.emaildot = true
      } else {
        this.emaildot = false
      }
      if (this.email.match(".") == null) {
        this.emaildot = true
      } else {
        this.emaildot = false
      }
      if (this.email.match("@") == null) {
        this.emailarr = true
      } else {
        this.emailarr = false
      }
    } else{
      this.emailinput = true
    }if (this.user) {
      this.userinput = false
      if (this.user.length < 6) {
        this.userlength = true
      } else {
        this.userlength = false
      }
      if (this.user.match(" ") != null) {
        this.userspace = true
      } else {
        this.userspace = false
      }
    } else{
      this.userinput = true
    }
    if (this.countryselect && this.regionselect && this.cityselect && this.login.length >= 6 && this.empresa.length >= 1 && this.phone.length >= 2 && (this.user.match(" ") == null) && (this.email.match("@") != null) && (this.email.match(".") != null) && this.user.length >= 6 && this.email.length >= 6) {
      this.registerService.register(this.address, this.empresa, this.email, this.login, this.phone, this.user, 0, 0,this.countryselect,this.regionselect,this.cityselect);
    }
  }

  async getCompany(page) {
    this.resultCompany = [];
    this.registerService.getCompany(page, "1000", (numberpage) => {
      this.page = numberpage,
        this.resultCompany = this.registerService.resultCompany
    });

  }

  async getAllCountries(){
    this.region = null;
    this.regionselect = null;
    this.city = null;
    this.cityselect = null;
    this.resultCountry = null;
    this.resultRegion = null;
    this.resultCity = null;
    this.registerService.getAllCountries((j)=>{
      this.resultCountry = j;
    })
  }

  async getAllRegion(){
    this.city = null;
    this.cityselect = null;
    this.resultRegion = null;
    this.resultCity = null;
    this.registerService.getAllRegion(this.countryselect,(j)=>{
      this.resultRegion = j;
    })
  }

  async getAllCity(){
    this.resultCity = null;
    this.registerService.getAllCity(this.regionselect,this.countryselect,(j)=>{
      this.resultCity = j;
    })
  }
}
