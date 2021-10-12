import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { KEY, BADGE, TOKEN } from 'src/environments/environment';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpService } from './http.service'
import { NotificationService } from './notification.service';
import { MenuController } from '@ionic/angular';


@Component({
   selector: 'app-root',
   templateUrl: 'app.component.html'
})
export class AppComponent {

   data: any = {};
   ticket: any;
   services: any;
   solicitations: any;
   equipment: any;
   langs: string[] = [];
   leave: string;
   leaveask: string;
   leaveconfirm: string;
   cancel: string;
   select: any;
   auto: any;

   async delay(ms: number) {
      await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log(ms));
   }

   constructor(
      private menu: MenuController,
      private platform: Platform,
      private splashScreen: SplashScreen,
      private statusBar: StatusBar,
      private translate: TranslateService,
      private router: Router,
      public loadingController: LoadingController,
      private storage: Storage,
      public http: HttpClient,
      public inicializeService: HttpService,
      public alertController: AlertController,
      public toastController: ToastController,
      public notificationService: NotificationService,

   ) {

      (window as any).handleOpenURL = (url: string) => {
         (window as any).handleOpenURL_LastURL = url;
         url = url.split("//")[1];
         KEY.keymobile = url.split("?token=")[1];
         url = url.split("?token=")[0];
         this.router.navigate([url]);
      };



      this.platform.ready().then(() => {

         this.inicializeService.refreshToken((j) => {
            this.delay(750);
         });

         this.platform.backButton.subscribeWithPriority(9999, () => {
            document.addEventListener('backbutton', function (event) {
               event.preventDefault();
               event.stopPropagation();
               navigator['app'].exitApp();
            }, false);
         });
         this.statusBar.styleDefault();
      });

      this.translate.setDefaultLang('pt');



   }

   initializeApp() {

      this.platform.ready().then(() => {
         this.storage.get('firstlogin').then((status) => {
            if (status == false) {

            } else {
               this.storage.set('firstlogin', true);
            }
         });
         this.menu.getMenus().then(res => {
         });
         this.translate.setDefaultLang('pt');
         this.translate.addLangs(['pt', 'en', 'es']);
         this.statusBar.styleDefault();
         this.splashScreen.hide();
         this.statusBar.overlaysWebView(true);
         this.statusBar.backgroundColorByHexString('#373737');
         this.notificationService.startListenerNotification();
         const sub = this.platform.backButton.subscribeWithPriority(9999, () => {
            // Do nothing
         });
      });


   }



   openHomeVMI(): void {
      this.router.navigate(['home-vmi']);
      this.menu.close();
   }

   openSettings(): void {
      this.router.navigate(['settings']);
      this.menu.close();
   }

   openTutorialVMI(): void {
      this.router.navigate(['tutorial-vmi']);
      this.menu.close();
   }

   openService(): void {
      this.router.navigate(['service']);
      this.menu.close();
      BADGE.new_service = null;
      this.storage.set('service', null);
   }

   openPieceVMI(): void {
      this.router.navigate(['piece']);
      this.menu.close();
   }

   openTaskVMI(): void {
      this.router.navigate(['task']);
      this.menu.close();
   }

   openEquipmentVMI(): void {
      this.router.navigate(['equipment-vmi']);
      this.menu.close();
   }

   openReportVMI(): void {
      this.router.navigate(['reports-vmi']);
      this.menu.close();
   }

   openTicket(): void {
      this.router.navigate(['ticket']);
      this.menu.close();
      BADGE.new_ticket = null;
      this.storage.set('ticket', null);
   }

   openSolicitationVMI(): void {
      this.router.navigate(['solicitation']);
      this.menu.close();
   }

   openEquipmentClient(): void {
      this.router.navigate(['equipment-client']);
      this.menu.close();
   }

   openHelp(): void {
      this.router.navigate(['troubleshoot-vmi']);
      this.menu.close();
   }

   openFeed(): void {
      this.router.navigate(['timeline']);
      this.menu.close();
   }

   loadBadge() {
      console.log("open");
      this.ticket = BADGE.new_ticket;
      this.services = BADGE.new_service;
      this.solicitations = BADGE.new_solicitation;
      this.equipment = BADGE.new_equipments;
   }

   async openLeave() {
      this.translate.get('LEAVE').subscribe((res: string) => {
         this.leave = res;
      });
      this.translate.get('LEAVEASK').subscribe((res: string) => {
         this.leaveask = res;
      });
      this.translate.get('CANCEL').subscribe((res: string) => {
         this.cancel = res;
      });

      const alert = await this.alertController.create({
         header: this.leave,
         message: this.leaveask,
         buttons: [
            {
               text: this.cancel,
               role: 'cancel',
               cssClass: 'secondary',
               handler: () => {
               }
            }, {
               text: this.leave,
               handler: () => {
                  this.storage.set('refresh_token', null);
                  TOKEN.access_token == null;
                  TOKEN.refresh_token == null;
                  this.storage.set('login_auto', false);
                  this.storage.set('role', null);
                  this.router.navigate(['login']);
                  this.presentToast('bottom');
                  this.menu.close();
               }
            }
         ]
      });

      await alert.present();
   }

   async presentToast(position) {
      this.translate.get('LEAVECONFIRM').subscribe((res: string) => {
         this.leaveconfirm = res;
      });
      const toastElement = await this.toastController.create({
         message: this.leaveconfirm,
         position,
         duration: 2000
      });
      return await toastElement.present();
   }

}
