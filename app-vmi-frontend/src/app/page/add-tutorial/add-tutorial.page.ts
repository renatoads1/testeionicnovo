import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { HttpService } from '../../http.service';
import { File } from '@ionic-native/file/ngx';
import { TutorialMultiFileUploadComponent } from '../../components/tutorial-multi-file-upload/tutorial-multi-file-upload.component';
import { ROLE } from 'src/environments/environment';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.page.html',
  styleUrls: ['./add-tutorial.page.scss'],
})
export class AddTutorialPage implements OnInit {

  isDisbled: boolean = true;
  title: any;
  device: any;
  description: any;
  user: any;
  keyword: any;
  result: any;
  keywords = [];
  role: any;
  parent: any;
  company_name;

  @ViewChild(TutorialMultiFileUploadComponent) fileField: TutorialMultiFileUploadComponent;

  constructor(
    private router: Router,
    public tutorialService: HttpService,
    private storage: Storage) { }

  ngOnInit() {

  }

  ionViewDidEnter() {
    this.keywords = [];
    this.tutorialService.getEquipmentsAdmin("1", "1000", (t) => {
        this.result = this.tutorialService.resultEquipAdmin;
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
      } if (val3 == 'home-distributors') {
        ROLE.role = "distributor";
        this.role = ROLE.role;
      } if (val3 == 'home-technician') {
        ROLE.role = "tech";
        this.role = ROLE.role;
      } if (val3 == 'home-client') {
        ROLE.role = "client";
        this.role = ROLE.role;
      }
    });
  }

  select() {
    this.isDisbled = !this.isDisbled;
  }

  openTutorial(): void {
    this.router.navigate(['tutorial-vmi']);
  }


  createTutorial(title, equip_id, description, role_level) {

    let files = this.fileField.getFiles();

    let formData = new FormData();

    files.forEach((file) => {
      formData.append('attachments', file.rawFile);
    });

    if (title && equip_id && this.keywords && role_level) {
      this.tutorialService.createTutorial(title, equip_id, description, role_level, this.keywords, formData);
    }

  }

  addKeyword(keyword) {
    if (keyword.includes(" ") == true) {
      this.keywords.push(keyword.split(" ")[0]);
      this.keyword = "";
    }
  }

  addKeywordOff(keyword) {
    if (keyword != " " && keyword != undefined && keyword != "") {
      this.keywords.push(keyword.split(" ")[0]);
      this.keyword = "";
    }
  }

  removeKey(index) {
    this.keywords.splice(index, 1);
  }



}
