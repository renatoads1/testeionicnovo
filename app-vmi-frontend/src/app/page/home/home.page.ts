import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { HttpService } from '../../http.service'
import { KEY, LANGUAGE } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  langs: string[] = [];

  constructor(
    private router: Router,
    private translate: TranslateService,
    private storage: Storage,
    public homeService: HttpService) {

  }


  ngOnInit() {
    this.langs = this.translate.getLangs();
    KEY.key = this.router.url.split("token=")[1];
    if (KEY.key == undefined) {
    }
  }

  ionViewDidEnter() {
    KEY.key = this.router.url.split("token=")[1];
  }

  openLogin(lng): void {
    LANGUAGE.locale = lng;
    this.translate.use(lng);
    this.storage.set('language', lng);
    this.router.navigate(['login']);
  }

}
