import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../http.service';
import { ROLE } from 'src/environments/environment';
import { Storage } from '@ionic/storage';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-troubleshoot-vmi',
  templateUrl: './troubleshoot-vmi.page.html',
  styleUrls: ['./troubleshoot-vmi.page.scss'],
})
export class TroubleshootVmiPage implements OnInit {

  keyword: any;
  keywords = [];
  role: any;
  parent: any;
  company_name: any;
  page: any;
  pageselected: any;
  result: any;
  device: any;
  equipments: any;

  constructor(
    private menu: MenuController,
    private router: Router,
    public keywordService: HttpService,
    private storage: Storage) { }

  ngOnInit() {
  }

  doRefresh(event) {

    setTimeout(() => {
      event.target.complete();
    }, 100);
  }

  ionViewDidEnter() {
    this.pageselected = 1;
    this.result = [];
    this.keywords = [];
    this.device = "";
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
    this.keywordService.getEquipmentsAdmin("1", "1000", (t) => {
        this.equipments = this.keywordService.resultEquipAdmin;
    });
  }

  ionViewDidLeave() {
    this.menu.close();
  }

  openAdd(): void {
    this.router.navigate(['troubleshoot-add']);
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

  getTroubleshoot(page) {
    if (this.device == undefined || this.device == null) {
      this.device = "";
    }
    this.pageselected = page;
    this.result = [];
    this.keywordService.getTroubleshoot(this.device, this.keywords, page, "10", (numberpage) => {
      this.page = numberpage,
        this.result = this.keywordService.resultTroubleshooting
    });
  }

  removeKey(index) {
    this.keywords.splice(index, 1);
  }

}
