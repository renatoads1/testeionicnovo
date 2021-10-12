import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { TOKEN, LANGUAGE } from 'src/environments/environment';
import { Storage } from '@ionic/storage';
import { MenuController } from '@ionic/angular';
import { HttpService } from '../../http.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  langs: string[] = [];
  leave: string;
  leaveask: string;
  leaveconfirm: string;
  cancel: string;
  select: any;
  auto: any;

  constructor(
    private menu: MenuController,
    private router: Router,
    public settingsService: HttpService,
    public alertController: AlertController,
    public toastController: ToastController,
    private translate: TranslateService,
    private storage: Storage) {
    this.langs = ["pt", "en", "es"];

  }

  changeLang(event) {
    if (event.detail.value == "pt") {
      LANGUAGE.locale = "pt";
      this.storage.set('language', "pt");
      this.settingsService.changeLang('pt');
    } if (event.detail.value == "en") {
      LANGUAGE.locale = "en";
      this.storage.set('language', "en");
      this.settingsService.changeLang('pt');
    } if (event.detail.value == "es") {
      LANGUAGE.locale = "es";
      this.storage.set('language', "es");
      this.settingsService.changeLang('es');
    }
    this.translate.use(event.detail.value);
  }

  ngOnInit() {
    this.storage.get('language').then((val) => {
      this.select = val
    });
    this.storage.get('login_auto').then((val) => {
      this.auto = val
    });
  }

  ionAutoChange() {
    if (this.auto == true) {
      this.storage.set('login_auto', true);
    } else {
      this.storage.set('login_auto', false);
    }
  }

  ionViewDidLeave() {
    this.menu.close();
  }

  openHelp(): void {
    this.router.navigate(['troubleshoot-vmi']);
  }



}
