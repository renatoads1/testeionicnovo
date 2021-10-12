import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AlertController } from '@ionic/angular';
import { HttpService } from '../../http.service';
import { MenuController } from '@ionic/angular';
import { ROLE, BADGE } from 'src/environments/environment';
import { Storage } from '@ionic/storage';
import { ActionSheetController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';


@Component({
  selector: 'app-equipment-vmi',
  templateUrl: './equipment-vmi.page.html',
  styleUrls: ['./equipment-vmi.page.scss'],
})
export class EquipmentVmiPage implements OnInit {

  result: any;
  scannedCode = null;
  role: any;
  parent: any;
  user: any;
  users: any;
  segment: any;
  resultUsers: any;
  resultTechnicians: any;
  resultClients: any;
  resultDistributors: any;
  resultEquip: any;
  resultReason: any;
  resultCompany: any;
  resultOrders:any;
  public segmentFilter = 'vmi';
  page: any;
  pageselected: any;
  roles: any;
  company_name;
  equipment: any;
  savedSerial: any;

  serial: any;
  main: any;
  accesscode: any;
  auth_code: any;
  access_code:any;
  request_id:any;
  state:any;
  warrantytype: any;
  maintenancetype: any;
  warrantytime: any;
  maintenancetime: any;

  constructor(
    private menu: MenuController,
    private router: Router,
    private barcodeScanner: BarcodeScanner,
    private translate: TranslateService,
    public alertController: AlertController,
    public equipmentService: HttpService,
    private storage: Storage,
    public actionSheetController: ActionSheetController,
    public popoverController: PopoverController) { }

  ngOnInit() {

  }

  accessCodeOpen(request_id,serial_number,auth_code,state,maintenancetime,maintenancetype,warrantytime,warrantytype) {
    this.serial = null;
    this.main = !this.main;
    this.accesscode = !this.accesscode;
    this.access_code = null;
    this.serial = serial_number;
    this.auth_code = null
    this.warrantytype = null
    this.maintenancetype = null
    this.warrantytime = null
    this.maintenancetime = null
    this.maintenancetime = maintenancetime
    this.maintenancetype = maintenancetype
    this.warrantytime = warrantytime
    this.warrantytype = warrantytype
    this.request_id = request_id
    this.auth_code = auth_code
    this.state = state
  }

  async presentAlertPrompt(request_id,serial_number,auth_code,state) {
    const alert = await this.alertController.create({
      header: 'Access Code!',
      inputs: [
        {
          name: 'access_code',
          placeholder: 'Access Code'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'danger',
          handler: () => {
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            if (data.access_code){
              this.equipmentService.acceptRequest(request_id, serial_number,data.access_code, state, (j) => {
                this.getOrders(1);
              });
            }
            
          }
        }
      ]
    });

    await alert.present();
  }

  warranty() {
    this.equipmentService.warrantyEquip(this.request_id,this.state,this.serial, this.auth_code, this.warrantytype, this.warrantytime, this.maintenancetype, this.maintenancetime, (j) => {
      this.getOrders(1);
    });
    this.accessCodeOpen('','','','','','','','');
  }

  acceptRequest(request_id,serial_number,auth_code,state){
    if (auth_code != null){
      this.equipmentService.acceptRequest(request_id, serial_number, auth_code, state, (j) => {
        this.getOrders(1);
      });
    } else {
      this.presentAlertPrompt(request_id, serial_number, auth_code, state);
    }
  }

  approve(request_id,serial_number,state){
    if (state != null){
      this.equipmentService.approveRequest(request_id, serial_number, state, (j) => {
        this.getOrders(1);
      });
    }
  }

  async qrAuth(computer, mcb, keyboard, serial) {

    var header = "";
    var message = "";
    var cancel = "";
    this.translate.get('AUTH').subscribe((res: string) => {
      header = res;
    });
    this.translate.get('QRAUTH').subscribe((res: string) => {
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
            this.equipmentService.qrAuth(computer, mcb, keyboard, serial);
          }
        }
      ]
    });
    await alert.present();
  }

  scanCode() {
    this.barcodeScanner.scan().then(
      barcodeData => {
        this.scannedCode = barcodeData.text;
        this.scannedCode = JSON.parse(this.scannedCode);
        if (this.scannedCode.computer_mac_address && this.scannedCode.mcb_mac_address &&
          this.scannedCode.keyboard_mac_address && this.scannedCode.serial_number) {
          this.qrAuth(this.scannedCode.computer_mac_address, this.scannedCode.mcb_mac_address,
            this.scannedCode.keyboard_mac_address, this.scannedCode.serial_number);
        }
      }
    )
  }


  doRefresh(event) {

    setTimeout(() => {
      event.target.complete();
    }, 100);
  }

  getData(page) {
    this.pageselected = page;
    this.result = [];
    this.equipmentService.getEquipmentsAdmin(page, "10", (numberpage) => {
      this.page = numberpage,
        this.result = this.equipmentService.resultEquipAdmin
    });
  }

  async getEquip(page) {
    if (this.user == null || this.user == undefined) {
      this.user = "";
    }
    this.pageselected = page;
    this.resultEquip = [];
    this.equipmentService.getEquipments(false, this.user, "", "", page, "10", (numberpage) => {
      this.page = numberpage,
        this.resultEquip = this.equipmentService.resultEquip
    });

  }

  async getReasons(page) {
    this.pageselected = page;
    this.resultReason = [];
    this.equipmentService.getReasons(page, "10", (numberpage) => {
      this.page = numberpage,
        this.resultReason = this.equipmentService.resultReason;
    });

  }

  async getOrders(page) {
    this.pageselected = page;
    this.resultOrders = [];
    this.equipmentService.getService(true,"",page, "10", (numberpage) => {
      this.page = numberpage,
        this.resultOrders = this.equipmentService.resultService;
    });

  }

  addReason(): void {
    this.router.navigate(['reason-add']);
  }

  ionViewWillEnter() {
    this.accesscode = false;
    this.main = true;
    this.equipment = BADGE.new_equipments;
    this.storage.get('company_name').then((company) => {
      ROLE.company_name = company;
      this.company_name = company;
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
        this.role = ROLE.role;
        this.menu.enable(true, ROLE.role);
      } if (val3 == 'home-distributors') {
        ROLE.role = "distributor";
        this.role = ROLE.role;
        this.menu.enable(true, ROLE.role);
      } if (val3 == 'home-technician') {
        ROLE.role = "tech";
        this.role = ROLE.role;
        this.menu.enable(true, ROLE.role);
      } if (val3 == 'home-client') {
        ROLE.role = "client";
        this.role = ROLE.role;
        this.menu.enable(true, ROLE.role);
      }
    });
    this.pageselected = 1;
    this.resultReason = [];
    this.result = [];
    this.resultEquip = [];
    this.segment = "";
  }


  async presentAlertDisable(id, page) {

    var header = "";
    var message = "";
    var cancel = "";
    this.translate.get('DELETE').subscribe((res: string) => {
      header = res;
    });
    this.translate.get('CANDELETEEQUIP').subscribe((res: string) => {
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
            // this.disableUser(id,page);
          }
        }
      ]
    });

    await alert.present();
  }


  openAdd(): void {
    this.router.navigate(['equipment-vmi-add']);
  }

  presentAlertDelete(id) {
    this.equipmentService.deleteEquipmentAdmin(id, (data) => {
      this.equipmentService.getEquipmentsAdmin("1", "10", (numberpage) => {
        this.page = numberpage,
          this.result = this.equipmentService.resultEquipAdmin
      });
    });
  }

  async acceptEquipment(id, page) {
    this.equipmentService.editEquipment(id, "accepted", null, (data) => {
      this.equipmentService.getEquipments(false, "", "", "", page, "10", (numberpage) => {
        this.page = numberpage,
          this.resultEquip = this.equipmentService.resultEquip
      });
    });
  }

  async rejectEquipment(id, justification, page) {
    this.equipmentService.editEquipment(id, "rejected", justification, (data) => {
      this.equipmentService.getEquipments(false, "", "", "", page, "10", (numberpage) => {
        this.page = numberpage,
          this.resultEquip = this.equipmentService.resultEquip
      });
    });
  }


  async presentReasonDelete(id) {
    this.equipmentService.deleteReason(id, (data) => {
      this.equipmentService.getReasons("1", "10", (numberpage) => {
        this.page = numberpage,
          this.resultReason = this.equipmentService.resultReason
      });
    });
  }

  async getClients() {
    this.equipmentService.getUsers(false, "", "active", "client", "", "", "", "", 1, "1000", (numberpage) => {
      this.users = this.equipmentService.resultUsers
    });
  }

  resetBadge() {
    this.storage.set('equipment', null);
    BADGE.new_equipments = null;
    this.equipment = null
  }

  openSlide(slide) {
    slide.open("end");
  }


}
