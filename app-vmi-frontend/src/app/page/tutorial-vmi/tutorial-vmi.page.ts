import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../http.service';
import { MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { IMAGE, ROLE } from 'src/environments/environment';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-tutorial-vmi',
  templateUrl: './tutorial-vmi.page.html',
  styleUrls: ['./tutorial-vmi.page.scss'],
})
export class TutorialVmiPage implements OnInit {

  result: any;
  page: any;
  pageselected: any;
  i: any;
  thumb: any;
  attachments: any;
  hideMe: any;
  tutorialselect: any;
  role: any;
  parent: any;
  company_name: any;
  keyword: any;
  keywords = [];
  device: any;
  equipments: any;

  constructor(
    private menu: MenuController,
    private router: Router,
    public tutorialService: HttpService,
    private storage: Storage,
    public alertController: AlertController) { }

  ngOnInit() {
  }

  doRefresh(event) {

    setTimeout(() => {
      event.target.complete();
    }, 100);
  }

  openAddTutorial(): void {
    this.router.navigate(['add-tutorial']);
  }

  getData(device, keyword, page) {
    if (this.role != "client") {
      this.tutorialService.getTutorial(device, keyword, page, "10", (numberpage) => {
        this.page = numberpage
        this.result = this.tutorialService.resultTutorial
      });
    } else if (this.role == "client") {
      this.tutorialService.getEquipments(false,"", "accepted", "", 1, "1000", (numberpages) => {
        if (numberpages != 0) {
          this.tutorialService.getTutorial(device, keyword, page, "10", (numberpage) => {
            this.page = numberpage
            this.result = this.tutorialService.resultTutorial
          });
        }
      });
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

  ionViewWillEnter() {
    this.result = [];
    IMAGE.thumbs = [];
    this.hideMe = false;
    this.pageselected = 1;
    this.keywords = [];
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
    this.tutorialService.getEquipmentsAdmin("1", "1000", (t) => {
      this.getData('', '', "1"),
        this.equipments = this.tutorialService.resultEquipAdmin;
    });
  }

  ionViewDidLeave() {
    this.hideMe = false;
    this.menu.close();
  }

  presentAlertDelete(id) {
    this.tutorialService.deleteTutorial(id,(data)=>{
      this.tutorialService.getEquipmentsAdmin("1", "1000", (t) => {
        this.getData('', '', "1"),
          this.equipments = this.tutorialService.resultEquipAdmin;
      });
    });
  }

  openFile(id, full) {
    this.tutorialService.getAttatchment(id, true, "tutorial", (data) => {
    });
  }

  showThumbs(attachments, full, tutorial) {
    IMAGE.thumbs = [];
    this.i = 0;
    this.thumb = [];
    this.tutorialselect = tutorial;
    attachments.forEach((id, idx) => {
      if (attachments[idx].ext == "IMG") {
        IMAGE.thumbs.push("data:image/png;base64,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");

        this.thumb = IMAGE.thumbs
      } if (attachments[idx].ext == "DOC") {
        IMAGE.thumbs.push("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAB2AAAAdgB+lymcgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAASrSURBVHic7ZtLaFxVGMd/333MTCePyaNJm6oNibEmTU0XImIJiqXQhQiuRSoirn0RV3Xlztqq4Eow4LZrEVHTICLiA8VXOwkNQdumJG3avOdxZ+5xESNJvDOZM3Pn3oyTP8xizv3O933nd8/rzpwrlKGpW7lnUeoV4CEgVo6P7VKA60ImR3bN4c+1jMoojO+V8EkubX5++ris+hFnu0S3wtSscwHh1Woks1nZnMrOLsmyC+3AslJciIp1frhflv2MowVgetY57Qqf+ZlAMbkKZhZZy7vE/ymac12eO3XU/sKvGIZWQsKLfgUuRYbAgSbim+5Sp2Hw6Xgy+7JvMTTtH/ArcKmyTYhHtxRZCnlvPOm85Yf/kgCMT6vY17+qVnya8HTVEPlvmYKzl5LO25X6LjoHjCWzL4CMCAwAHEqs35GglXfh+kLBy+dO9ttvlOu7YA+4dMU5L8joRuPDlGEUvVMjlQwHTwBjk87jCK+V69RvCaCKEKhkOHgCEFfOlOMsZI2UA8EbAKq38nxCkTaEQnOA5UMyYUkLgu4+IDRpJlryxFgzACKafVLB2bGJ7Es72dUMgEQZWzBR8sH4hDNczKZmAMRsaIlrP75GXMWHF5UquH2rGQCw3gsOJqAptg4kZm39RC2wDLWljsDA/gnn+UI+a262j5jQFi9mIeRcxUpGWM7gui4GSl4HRr2sa6oHlCrLEFr2QVcThmnIIsLR8T/SfZ62QSe3ocurf/Ht0mVc5XpeNzF4onWI+/cdKjuGZUJXs0rMLHBHmcZTwPvbbULrATOZ+YKNB8jjMpOdrziOaUB7EzGFcdzr+v9yCGxX3CbeGPXe3tcFAIB4hIRXed0AiJikvcrrBoBp4HiV1w2AQtoDEHYCYWsPQNgJhK09AGEnELbqHkBgT4OOm+OWs4hi/QeLlJvZsc5qPsONzG0ADISOSAuW+PvfXGAAvlr4jen0Ta0619JzXEvP/ft9oOEww4ljvuYV2BDoirZVVF+Ag3arP8lsUmAABhu6ebS5v6y6AjyWGKQvfo+/SRHwJDjU2KsNYaPxgw3dVckp8FVAB0K1Gw8hLYOlQAii8RDiPqAYhKAaDyFvhLwgBNl42AV/jAw19mIbFj8tX8UQ4ZHGI1WZ7QspdAAAA/HDDMQPhxK77p8F6h5AIEPgx6UJJlM3yKl8RX4ssTjW0M1Qo39HmKoO4GZmnp9XpnzxlcHhu6Uk98Y6aLOafPFZ9SGQVln/feb981l1APdFO2m3m33z1xVtpytS2ZPlZlV9CFhi8sz+E9zOLeG4uYp8RcSm3W5GRPs9j4IKZBI0xKDTbgkilLbqfhnUAqB2NtnN8hx/WgBylS3joUopuepVrgVgZecfcnex1MdepVoAUk5tQhDhXN8B+xuva9qT4Pwq3FmtmeHwuyg509tR+JWaspbB5cz6RwDZfetIsqfTOuHeJdXTI57HYjbLE4DC+ziJhx1FTrqFIqVIdbfI3VLtC7wxIpP+pRS01ISOtSeAvLij1Oiyb5jykZa9V+GpByM/CLzpT0rBSeCdJ4/YX2rWKayxK7mnDVEjCh4Gip7RDlEphF9Q8u7JfuuibuW/ATkYRQHHdU0fAAAAAElFTkSuQmCC");

        this.thumb = IMAGE.thumbs;
      } if (attachments[idx].ext == "VID") {
        IMAGE.thumbs.push('data:image/png;base64,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');

        this.thumb = IMAGE.thumbs;
      }
    });
  }

  close() {
    if (this.hideMe == false) {
      this.hideMe = true;
    } else {
      this.hideMe = false;
    }
  }

  openSlide(slide) {
    slide.open("end");
  }


}
