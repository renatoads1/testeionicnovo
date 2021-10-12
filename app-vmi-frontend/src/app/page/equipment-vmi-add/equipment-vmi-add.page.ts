import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service'

@Component({
  selector: 'app-equipment-vmi-add',
  templateUrl: './equipment-vmi-add.page.html',
  styleUrls: ['./equipment-vmi-add.page.scss'],
})
export class EquipmentVmiAddPage implements OnInit {

  model: any;

  constructor(
    public equipService: HttpService) { }

  ngOnInit() {
  }

  sendPostRequest() {
    if (this.model) {
      this.equipService.createEquipmentAdmin(this.model);
    }
  }

}
