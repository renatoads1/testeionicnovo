import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service'

@Component({
  selector: 'app-equipment-client-add',
  templateUrl: './equipment-client-add.page.html',
  styleUrls: ['./equipment-client-add.page.scss'],
})
export class EquipmentClientAddPage implements OnInit {

  serial: any;
  result: any;
  device: any;

  constructor(
    public equipService: HttpService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.equipService.getEquipmentsAdmin("1", "1000", (t) => {
        this.result = this.equipService.resultEquipAdmin;
    });
  }


  sendPostRequest() {
    if (this.device > 0 && this.serial) {
      this.equipService.createEquipments(this.device, this.serial);
    }
  }

}
