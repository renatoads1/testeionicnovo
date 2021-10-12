import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../http.service'
import { Storage } from '@ionic/storage';
import { IonicSelectableComponent } from 'ionic-selectable';


class Port {
  public id: number;
  public name: string;
}

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {

  data: any = {};

  id: any;
  login: any;
  name: any;
  empresa: any;
  phone: any;
  address: any;
  ltd: any;
  lng: any;
  email: any;
  role: any;
  resultCompany: any;
  loginlength: any;
  empresalength: any;
  phonelength: any;
  userspace: any;
  emailarr: any;
  emaildot: any;
  userlength: any;
  country:any;
  region:any;
  city:any;


  noitem:any;
  cancel:any;
  search:any;

  ports: Port[];
  port: Port;

  user: any;
  lat: any;
  page: any;
  resultCountry: any;
  resultCity: any;
  resultRegion:any;
  logininput:any;
  empresainput:any;
  phoneinput:any;
  userinput:any;
  emailinput:any;
  addressinput:any;
  countryselect:any;
  regionselect:any;
  cityselect:any;
  language:any;
  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService,
    public http: HttpClient,
    private storage: Storage,
    public editService: HttpService,
    public toastController: ToastController) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state;
        this.login = this.data.name;
        this.user = this.data.username;
        this.phone = this.data.phone;
        this.address = this.data.address;
        this.ltd = this.data.latitude;
        this.lng = this.data.longitude;
        this.empresa = this.data.company_name;
        this.role = this.data.role;
        this.email = this.data.email;
        this.id = this.data.id;
        this.country = this.data.country;
        this.region = this.data.region;
        this.city = this.data.city
      }
    });

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

  async errorToast(position) {
    var message = "";
    this.translate.get('EMAILINC').subscribe((res: string) => {
      message = res;
    });
    const toastElement = await this.toastController.create({
      message: message,
      position,
      duration: 4000
    });
    return await toastElement.present();
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
      if (this.id > 0) {
        this.editService.editUser(this.id, this.name, this.empresa, this.phone, this.address, this.role,this.countryselect,this.regionselect,this.cityselect);
      }
      else {
        this.ltd = 1;
        this.lng = 1;
        this.editService.register(this.address, this.empresa, this.email, this.login, this.phone, this.user, 0, 0,this.countryselect,this.regionselect,this.cityselect);
      }
    } else {
      this.errorToast('bottom');
    }
  }

  async getCompany(page) {
    this.resultCompany = [];
    this.editService.getCompany(page, "1000", (numberpage) => {
      this.page = numberpage,
        this.resultCompany = this.editService.resultCompany
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
    this.editService.getAllCountries((j)=>{
      this.resultCountry = j;
    })
  }

  async getAllRegion(){
    this.city = null;
    this.cityselect = null;
    this.resultRegion = null;
    this.resultCity = null;
    this.editService.getAllRegion(this.countryselect,(j)=>{
      this.resultRegion = j;
    })
  }

  async getAllCity(){
    this.resultCity = null;
    this.editService.getAllCity(this.regionselect,this.countryselect,(j)=>{
      this.resultCity = j;
    })
  }

  getDistributors() {
    this.resultCompany = [];
    this.editService.getCompany("1", "100", (data) => {
      this.resultCompany = this.editService.resultCompany;
    });
  }

}
