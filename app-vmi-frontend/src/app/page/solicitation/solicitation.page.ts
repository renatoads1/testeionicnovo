import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AlertController } from '@ionic/angular';
import { HttpService } from '../../http.service';
import { MenuController } from '@ionic/angular';
import { ROLE, BADGE } from 'src/environments/environment';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-solicitation',
  templateUrl: './solicitation.page.html',
  styleUrls: ['./solicitation.page.scss'],
})
export class SolicitationPage implements OnInit {

  role: any;
  parent: any;
  company_name: any;
  segment: any;
  resultUsers: any;
  resultTechnicians: any;
  resultClients: any;
  resultAdmin: any;
  resultCompany: any;
  public segmentFilter = 'vmi';
  page: any;
  pageselected: any;
  roles: any;
  solicitation:any;

  constructor(
    private menu: MenuController,
    public alertController: AlertController,
    private router: Router,
    private translate: TranslateService,
    public dashboardService: HttpService,
    private storage: Storage) {

  }

  doRefresh(event) {

    setTimeout(() => {
      event.target.complete();
    }, 100);
  }

  openAdd(): void {
    this.router.navigate(['edit-user']);
  }

  async presentAlertConfirm(id, name, username, phone, address, ltd, lng, company_name, email, role,country, region, city) {

    let navigationExtras: NavigationExtras = {
      state: {
        id: id,
        name: name,
        username: username,
        phone: phone,
        address: address,
        latitude: ltd,
        longitude: lng,
        company_name: company_name,
        email: email,
        role: role,
        country: country,
        region: region,
        city: city
      }
    };

    var header = "";
    var message = "";
    var cancel = "";
    this.translate.get('EDIT').subscribe((res: string) => {
      header = res;
    });
    this.translate.get('CANEDIT').subscribe((res: string) => {
      message = res;
    });
    this.translate.get('CANCEL').subscribe((res: string) => {
      cancel = res;
    });

    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [
        {
          text: cancel,
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Ok',
          handler: () => {
            this.router.navigate(['edit-user'], navigationExtras);
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertDesative(user, role) {

    var header = "";
    var message = "";
    var cancel = "";
    this.translate.get('EDIT').subscribe((res: string) => {
      header = res;
    });
    this.translate.get('CANDESATIVE').subscribe((res: string) => {
      message = res;
    });
    this.translate.get('CANCEL').subscribe((res: string) => {
      cancel = res;
    });

    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [
        {
          text: cancel,
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Ok',
          handler: () => {
            this.desativeUser(user, role);
          }
        }
      ]
    });

    await alert.present();
  }


  async companyAlert() {

    var header = "";
    var message = "";
    var cancel = "";
    this.translate.get('CHOOSECOMPANY').subscribe((res: string) => {
      header = res;
    });
    this.translate.get('FAILERRO').subscribe((res: string) => {
      message = res;
    });
    this.translate.get('COMPLETEINFORMATION').subscribe((res: string) => {
      cancel = res;
    });

    const alert = await this.alertController.create({
      header: header,
      subHeader: message,
      message: cancel,
      buttons: ['OK']
    });

    await alert.present();
  }

  async getUsers(page, search) {
    this.pageselected = page;
    this.resultUsers = [];
    if (search.length > 4 || search == '') {
      this.dashboardService.getUsers(false, "", "inactive", "",search,"","","", page, "10", (numberpage) => {
        this.page = numberpage,
          this.resultUsers = this.dashboardService.resultUsers
      });
    }

  }

  async getCompany(page, perpage) {
    this.pageselected = page;
    this.resultCompany = [];
    this.dashboardService.getCompany(page, perpage, (numberpage) => {
      this.page = numberpage,
        this.resultCompany = this.dashboardService.resultCompany
    });

  }

  addCompany(): void {
    this.router.navigate(['company']);
  }

  async getAdmin(page, search) {
    this.pageselected = page;
    this.resultAdmin = [];
    if (search.length > 4 || search == '') {
      this.dashboardService.getUsers(true, "", "active", "admin", search,"","","", page, "10", (numberpage) => {
        this.page = numberpage,
          this.resultAdmin = this.dashboardService.resultUsers
      });
    }
  }

  async getTechnicians(page, search) {
    this.pageselected = page;
    this.resultTechnicians = [];
    if (search.length > 4 || search == '') {
      this.dashboardService.getUsers(true, "", "active", "technician", search,"","","", page, "10", (numberpage) => {
        this.page = numberpage,
          this.resultTechnicians = this.dashboardService.resultUsers
      });
    }
  }

  async getClients(page, search) {
    this.pageselected = page;
    this.resultClients = [];
    if (search.length > 4 || search == '') {
      this.dashboardService.getUsers(true, "", "active", "client", search,"","","", page, "10", (numberpage) => {
        this.page = numberpage,
          this.resultClients = this.dashboardService.resultUsers
      });
    }
  }

  async desativeUser(user, role) {


    this.dashboardService.desativeUser(user, (data) => {
      this.dashboardService.getUsers(true, "", "active", role, "","","","", "1", "10", (numberpage) => {
        this.page = numberpage,
          this.resultClients = this.dashboardService.resultUsers
      });
    });

  }

  sendAccept(username, role) {
    if ( role ){
      this.dashboardService.sendEmailUser(username, role);
    }  
  }


  ngOnInit() {

  }

  ionViewWillEnter() {
    this.solicitation = BADGE.new_solicitation;
    this.resultUsers = [];
    this.resultAdmin = [];
    this.resultTechnicians = [];
    this.resultClients = [];
    this.resultCompany = [];
    this.menu.enable(true, 'admin');
    this.segment = "";
    this.storage.get('role').then((val3) => {
      if (val3 == 'home-vmi') {
        ROLE.role = "admin";
        this.storage.get('company_name').then((company) => {
          ROLE.company_name = company;
          this.company_name = company;
        });
        this.storage.get('parent').then((parent) => {
          if (parent == 'admin') {
            ROLE.parent = "admin";
            this.parent = ROLE.parent;
          } else {
            ROLE.parent = "distri";
            this.parent = ROLE.parent;
          }
        });
        this.roles = ROLE.role;
      } if (val3 == 'home-distributors') {
        ROLE.role = "distributor";
        this.roles = ROLE.role;
      } if (val3 == 'home-technician') {
        ROLE.role = "tech";
        this.roles = ROLE.role;
      } if (val3 == 'home-client') {
        ROLE.role = "client";
        this.roles = ROLE.role;
      }
    });
  }

  ionViewDidLeave() {
    this.menu.close();
  }

  editItem(id, name, username, phone, address, ltd, lng, company_name, email, role, country, region, city) {
    this.presentAlertConfirm(id, name, username, phone, address, ltd, lng, company_name, email, role, country, region, city);
  }

  async presentCompanyDelete(id) {
    this.dashboardService.deleteCompany(id, (data) => {
      this.dashboardService.getCompany("1", "10", (numberpage) => {
        this.page = numberpage,
          this.resultCompany = this.dashboardService.resultCompany
      });
    });
  }

  resetBadge(){
    this.storage.set('solicitation', null);
    BADGE.new_solicitation = null;
    this.solicitation = null
  }

  openSlide(slide) {
    slide.open("end");
  }

}
