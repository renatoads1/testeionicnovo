import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AlertController } from '@ionic/angular';
import { HttpService } from '../../http.service';
import { MenuController } from '@ionic/angular';
import { ROLE, BADGE } from 'src/environments/environment';
import * as pdfmake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Storage } from '@ionic/storage';
import { IonicSelectableComponent } from 'ionic-selectable';



@Component({
  selector: 'app-reports-vmi',
  templateUrl: './reports-vmi.page.html',
  styleUrls: ['./reports-vmi.page.scss'],
})
export class ReportsVmiPage implements OnInit {

  noitem: any;
  cancel: any;
  search: any;

  parent: any;
  role_user: any;
  company_name: any;

  reports = {
    city: [],
    region: [],
    country: []
  };
  report_type: any;
  resultModel: any;
  resultDistributor: any;
  resultTechnician: any;
  resultCountry: any;
  resultCity: any;
  resultRegion: any;
  type: any;
  type_region: any;
  role = "";
  equipment_model: any;
  equipment_modelselect: any;
  equipment_technician: any;
  equipment_technicianselect: any;
  equipment_distributor: any;
  equipment_distributorselect: any;
  country: any;
  countryselect: any;
  region: any;
  regionselect: any;
  city: any;
  cityselect: any;
  result: any;
  pdfObj = null;
  language: any;

  title_translate: any;
  company_translate: any;
  name_translate: any;
  country_translate: any;
  region_translate: any;
  city_translate: any;
  phone_translate: any;
  email_translate: any;

  datei: any;
  datef: any;

  pieceResult:any;
  taskResult:any;
  hideModal:any;

  warranty_role: any;
  index_role: any;
  index5_type: any;
  equipment_role: any;
  equipment_country: any;
  equipment_region: any;

  constructor(
    private menu: MenuController,
    public alertController: AlertController,
    private router: Router,
    private translate: TranslateService,
    public service: HttpService,
    private storage: Storage) { }

  setItens(type) {
    this.city = "";
    this.region = "";
    this.country = "";
    this.service.getLocation(type, (j) => {
      this.reports = j;
    })
  }

  clear() {
    this.role = null;
    this.region = null;
    this.regionselect = null;
    this.country = null;
    this.countryselect = null;
    this.city = null;
    this.cityselect = null;
    this.resultCountry = null;
    this.resultRegion = null;
    this.resultCity = null;
    this.resultDistributor = null;
    this.resultTechnician = null;
    this.resultModel = null;

    this.equipment_modelselect = null;
    this.equipment_model = null;
    this.equipment_distributorselect = null;
    this.equipment_distributor = null;
    this.equipment_technicianselect = null;
    this.equipment_technician = null
    this.datei = null;
    this.datef = null;
    this.index5_type = null;
    this.index_role = null;
    
  }

  selectModel() {
    this.equipment_modelselect = this.equipment_model.model;
  }


  selectDistributor() {
    this.equipment_distributorselect = this.equipment_distributor.id;
  }

  selectTechnician() {
    this.equipment_technicianselect = this.equipment_technician.id;
  }

  selectCountry() {
    this.countryselect = this.country.alpha2Code;
  }

  selectRegion() {
    this.regionselect = this.region.region;
  }

  selectCity() {
    this.cityselect = this.city.city;
  }

  searchUsers() {
    if (!this.role){
      this.role = "";
    }
    if (!this.cityselect) {
      this.cityselect = "";
    }
    if (!this.regionselect) {
      this.regionselect = "";
    }
    if (!this.countryselect) {
      this.countryselect = "";
    }

    var all = true;

    if (this.role) {
      all = false
    }


    if (this.report_type) {
      this.service.getUserReport(this.report_type, all, this.role, this.cityselect, this.regionselect, this.countryselect)
    } else {

    }

  }

  searchEquips() {
    if (!this.cityselect) {
      this.cityselect = "";
    }
    if (!this.regionselect) {
      this.regionselect = "";
    }
    if (!this.countryselect) {
      this.countryselect = "";
    }
    if (!this.equipment_modelselect) {
      this.equipment_modelselect = "";
    }
    if (!this.equipment_distributorselect) {
      this.equipment_distributorselect = "";
    }

    if (this.report_type) {
      this.service.getEquipReport(this.report_type, this.equipment_modelselect, this.equipment_distributorselect, this.cityselect, this.regionselect, this.countryselect)
    } else {

    }

  }

  searchWarranty() {
    if (!this.cityselect) {
      this.cityselect = "";
    }
    if (!this.regionselect) {
      this.regionselect = "";
    }
    if (!this.countryselect) {
      this.countryselect = "";
    }
    if (!this.equipment_modelselect) {
      this.equipment_modelselect = "";
    }
    if (!this.equipment_distributorselect) {
      this.equipment_distributorselect = "";
    }
    if (!this.datei) {
      this.datei = "";
    }
    if (!this.datef) {
      this.datef = "";
    }

    if (this.report_type) {
      this.service.getWarrantyReport(this.report_type, this.equipment_modelselect, this.equipment_distributorselect, this.cityselect, this.regionselect, this.countryselect, this.datei, this.datef)
    } else {

    }


  }

  searchMTTR() {
    if (!this.equipment_modelselect) {
      this.equipment_modelselect = "";
    }
    if (this.index5_type) {
      this.service.getIndexReport('mttr', this.index5_type, this.equipment_modelselect, '', '', '', (j) => {

      });
    } else {

    }
  }

  searchMTBF() {
    if (!this.equipment_modelselect) {
      this.equipment_modelselect = "";
    }
    this.service.getIndexReport('mtbf', '', this.equipment_modelselect, '', '', '', (j) => {
    });

  }

  searchStatsOrder() {
    if (!this.equipment_technicianselect) {
      this.equipment_technicianselect = "";
    }
    if (!this.datei) {
      this.datei = "";
    }
    if (!this.datef) {
      this.datef = "";
    }
    this.service.getIndexReport('stats_order', '', '', this.equipment_technicianselect, this.datei, this.datef, (j) => {

    });

  }

  searchPieces() {
    this.pieceResult = null;
    this.taskResult = null;
    if (!this.equipment_modelselect) {
      this.equipment_modelselect = "";
    }
    if (!this.equipment_technicianselect) {
      this.equipment_technicianselect = "";
    }
    if (!this.datei) {
      this.datei = "";
    }
    if (!this.datef) {
      this.datef = "";
    }
    this.service.getIndexReport('service_piece', '', this.equipment_modelselect, this.equipment_technicianselect, this.datei, this.datef, (j) => {
      this.pieceResult = j;
      this.closeModal();
    });

  }

  searchTasks() {
    this.pieceResult = null;
    this.taskResult = null;
    if (!this.equipment_technicianselect) {
      this.equipment_technicianselect = "";
    }
    if (!this.datei) {
      this.datei = "";
    }
    if (!this.datef) {
      this.datef = "";
    }
    this.service.getIndexReport('service_task', '', '', this.equipment_technicianselect, this.datei, this.datef, (j) => {
      this.taskResult = j;
      this.closeModal();
    });

  }

  searchClientMaintenance() {
    this.service.getIndexReport('client_maintenance', '', '', '', '', '', (j) => {

    });
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.hideModal = false
    this.menu.enable(true, 'admin');
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
        this.role_user = ROLE.role;
        this.menu.enable(true, ROLE.role);
      } if (val3 == 'home-distributors') {
        ROLE.role = "distributor";
        this.role_user = ROLE.role;
        this.menu.enable(true, ROLE.role);
      } if (val3 == 'home-technician') {
        ROLE.role = "tech";
        this.role_user = ROLE.role;
        this.menu.enable(true, ROLE.role);
      } if (val3 == 'home-client') {
        ROLE.role = "client";
        this.role_user = ROLE.role;
        this.menu.enable(true, ROLE.role);
      }
    });
  }

  ionViewDidLeave() {
    this.menu.close();
  }

  async getAllCountries() {
    this.region = null;
    this.regionselect = null;
    this.city = null;
    this.cityselect = null;
    this.resultCountry = null;
    this.resultRegion = null;
    this.resultCity = null;
    this.service.getAllCountries((j) => {
      this.resultCountry = j;
    })
  }

  async getAllRegion() {
    this.city = null;
    this.cityselect = null;
    this.resultRegion = null;
    this.resultCity = null;
    this.service.getAllRegion(this.countryselect, (j) => {
      this.resultRegion = j;
    })
  }

  async getAllCity() {
    this.resultCity = null;
    this.service.getAllCity(this.regionselect, this.countryselect, (j) => {
      this.resultCity = j;
    })
  }

  async getAllModel() {
    this.resultModel = null;
    this.service.getEquipmentsAdmin(1, 10000, (j) => {
      this.resultModel = this.service.resultEquipAdmin;
    })
  }

  async getAllDistributor() {
    this.resultDistributor = null;
    this.service.getCompany(1, 10000, (j) => {
      this.resultDistributor = this.service.resultCompany;
    })
  }

  async getAllTechnician() {
    this.resultTechnician = null;
    this.service.getUsers(false, "", "active", "technician", "", "", "", "", "1", "1000", (t) => {
      this.resultTechnician = this.service.resultUsers;
    })
  }


  closeModal() {
    if (this.hideModal == false) {
      this.hideModal = true;
    } else {
      this.hideModal = false;
    }
  }

}
