import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../http.service';
import { MenuController } from '@ionic/angular';
import { ROLE } from 'src/environments/environment';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-piece',
  templateUrl: './piece.page.html',
  styleUrls: ['./piece.page.scss'],
})
export class PiecePage implements OnInit {

  result: any;
  page: any;
  pageselected: any;
  role: any;
  parent: any;
  company_name: any;
  segment:any;
  public segmentFilter = 'vmi';


  constructor(
    private menu: MenuController,
    private router: Router,
    public equipmentService: HttpService,
    private storage: Storage) { }

  ngOnInit() {

  }

  doRefresh(event) {

    setTimeout(() => {
      event.target.complete();
    }, 100);
  }

  getData(page) {
    this.equipmentService.getPieces(page, "10", (numberpage) => {
      this.page = numberpage
      this.result = this.equipmentService.resultPiece
    });

  }

  ionViewWillEnter() {
    this.getData(1);
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
      }
    });
    this.pageselected = 1;
    this.menu.enable(true, 'admin');
    this.result = [];
    this.segment = "";
  }

  ionViewDidLeave() {
    this.menu.close();
  }

  openAdd(): void {
    this.router.navigate(['piece-add']);
  }

  presentAlertDelete(id) {
    this.equipmentService.deletePiece(id, (data) => {
      this.equipmentService.getPieces("1", "10", (numberpage) => {
        this.page = numberpage
        this.result = this.equipmentService.resultPiece
      });
    });
  }
  
  openSlide(slide) {
    slide.open("end");
  }

}
