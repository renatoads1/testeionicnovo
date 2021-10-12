import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastController } from '@ionic/angular';
import { HttpService } from '../../http.service';
import { KEY } from 'src/environments/environment';

@Component({
  selector: 'app-register-confirm',
  templateUrl: './register-confirm.page.html',
  styleUrls: ['./register-confirm.page.scss'],
})
export class RegisterConfirmPage implements OnInit {

  password: any;
  confpass: any;
  id: any;

  constructor(
    private translate: TranslateService,
    public toastController: ToastController,
    public registerService: HttpService) { }


  async erroToast(position) {
    var message = "";
    this.translate.get('WRONGPASS').subscribe((res: string) => {
      message = res;
    });
    const toastElement = await this.toastController.create({
      message: message,
      position,
      duration: 4000
    });
    return await toastElement.present();
  }

  async letterToast(position) {
    var message = "";
    this.translate.get('PASSRULE').subscribe((res: string) => {
      message = res;
    });
    const toastElement = await this.toastController.create({
      message: message,
      position,
      duration: 4000
    });
    return await toastElement.present();
  }


  completeRegister() {
    if (this.password.length >= 6 && this.password.match(/[A-Z]/) && this.password.match(/[0-9]/) && this.password.match(/[a-z]/)) {
      if (this.password == this.confpass) {
        this.registerService.completeRegister(this.id, this.password);
        KEY.key = undefined;
      } if (this.password != this.confpass) {
        this.erroToast('bottom');
      }
    } else {
      this.letterToast('bottom');
    }
  }



  ionViewDidEnter() {
    this.id = this.registerService.id;
  }

  ngOnInit() {

  }

}
