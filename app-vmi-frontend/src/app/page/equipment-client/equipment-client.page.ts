import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AlertController } from '@ionic/angular';
import { HttpService } from '../../http.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-equipment-client',
  templateUrl: './equipment-client.page.html',
  styleUrls: ['./equipment-client.page.scss'],
})
export class EquipmentClientPage implements OnInit {

  result: any;
  page: any;
  pageselected: any;

  constructor(
    private menu: MenuController,
    private router: Router,
    private translate: TranslateService,
    public alertController: AlertController,
    public equipmentService: HttpService) { }



  ngOnInit() {
  }

  doRefresh(event) {

    setTimeout(() => {
      event.target.complete();
    }, 100);
  }

  getData(page) {
    this.equipmentService.getEquipments(false,"", "", "", page, "10", (numberpage) => {
      this.page = numberpage,
        this.result = this.equipmentService.resultEquip
    });
  }

  ionViewWillEnter() {
    this.result = [];
    this.pageselected = 1;
    this.menu.enable(true, 'client');
    this.getData(1);
  }

  ionViewDidLeave() {
    this.menu.close();
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
            this.disableUser(id, page);
          }
        }
      ]
    });

    await alert.present();
  }

  async disableUser(id, page) {
    this.equipmentService.editEquipment(id, "disabled", null, (data) => {
      this.equipmentService.getEquipments(false,"", "", "", page, "10", (numberpage) => {
        this.page = numberpage,
          this.result = this.equipmentService.resultEquip
      });
    });
  }


  openAdd(): void {
    this.router.navigate(['equipment-client-add']);
  }

  openSlide(slide) {
    slide.open("end");
  }

}
