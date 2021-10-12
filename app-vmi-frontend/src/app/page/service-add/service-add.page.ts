import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../../http.service';
import { File } from '@ionic-native/file/ngx';
import { ROLE } from 'src/environments/environment';
import { Storage } from '@ionic/storage';

import { MultiFileUploadComponent } from '../../components/multi-file-upload/multi-file-upload.component';

@Component({
  selector: 'app-service-add',
  templateUrl: './service-add.page.html',
  styleUrls: ['./service-add.page.scss'],
})
export class ServiceAddPage implements OnInit {

  occurrence: any;
  segment: any;
  description: any;
  client: any;
  technician: any;
  clientchoose: any;
  techchoose: any;
  techchooser: any;
  choose: any;
  equipmentchoose: any;
  equipmentchooser: any;
  serial: any;
  attachment: File;
  company_name: any;

  isDisbled: boolean = true;

  @ViewChild(MultiFileUploadComponent) fileField: MultiFileUploadComponent;

  constructor(
    public equipmentService: HttpService,
    private storage: Storage,
    private file: File) { }

  ngOnInit() {
  }


  ionViewWillEnter() {
    this.storage.get('company_name').then((company) => {
      ROLE.company_name = company;
      this.company_name = company;
    });
    this.segment = 'corrective';
  }

  getUser(login) {
    this.equipmentService.getUsers(false, "", "active", "client", "","","","", "1", "1000", (t) => {
        this.choose = this.equipmentService.resultUsers;
    });

  }

  getEquip(user_id) {
    this.equipmentService.getEquipments(false,user_id, "accepted", "", "1", "1000", (t) => {
        this.equipmentchoose = this.equipmentService.resultEquip;
    });
  }

  getTech(technician) {
    this.equipmentService.getUsers(false, "", "active", "technician", "","","","", "1", "1000", (t) => {
        this.techchoose = this.equipmentService.resultUsers;
    });

  }


  sendPostRequest(occurrence, description, type, tech_id, clientchoose, equip_id) {

    let files = this.fileField.getFiles();

    let formData = new FormData();

    files.forEach((file) => {
      formData.append('attachments', file.rawFile);
    });

    if (type && tech_id && clientchoose && equip_id && description) {
      this.equipmentService.createService(occurrence, description, type, tech_id, clientchoose, equip_id, formData);
    }
  }


  select() {
    this.isDisbled = !this.isDisbled;
  }

  clear() {
    this.client = "";
    this.serial = "";
    this.technician = "";
    this.occurrence = "";
    this.description = "";
  }

}
