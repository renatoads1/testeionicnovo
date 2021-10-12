import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { HttpService } from './http.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { BADGE } from 'src/environments/environment';



@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    constructor(
        private firebase: Firebase, 
        private alertCtrl: AlertController,
        private storage: Storage,
        private router: Router
        ) { }

    async getToken() {

        this.firebase.getToken()
            .then(token => {
                console.log("firebase token recebido", token);
                this.sendToken(token);
                // this.iniciarListenerDeNotificacoes();
            }) // save the token server-side and use it to push notifications to this device
            .catch(error => {
                console.error('Error getting token', error)
            });


    }

    async sendToken(token) {
        //this.service.sendToken(token);
    }


    startListenerNotification() {

        this.firebase.onNotificationOpen().subscribe((notification: any) => {
            
            console.log(notification);

            if (notification.tap){
                if (notification.type == 'ticket') {
                    this.router.navigate(['ticket']);
                    this.storage.set('ticket', null);
                } else if (notification.type == 'service') {
                    this.router.navigate(['service']);
                    this.storage.set('service', null);
                } else if (notification.type == 'user') {
                    this.router.navigate(['solicitation']);
                } else if (notification.type == 'equipment') {
                    this.router.navigate(['equipment-vmi']);
                } else if (notification.type == 'chat') {
                    if (notification.subtype == 'ticket'){
                        this.router.navigate(['ticket']);
                    } else if (notification.subtype == 'service'){
                        this.router.navigate(['service']);
                    }
                } 
            }
            
            if (notification.type == 'ticket') {
                this.storage.get('ticket').then((val) => {
                    console.log(val);
                    this.storage.set('ticket', val + 1);
                    BADGE.new_ticket = val + 1;
                })
            } else if (notification.type == 'service') {
                this.storage.get('service').then((val) => {
                    console.log(val);
                    this.storage.set('service', val + 1);
                    BADGE.new_service = val + 1;
                })
            } else if (notification.type == 'user') {
                this.storage.get('solicitation').then((val) => {
                    console.log(val);
                    this.storage.set('solicitation', val + 1);
                    BADGE.new_solicitation = val + 1;
                })
            } else if (notification.type == 'equipment') {
                this.storage.get('equipment').then((val) => {
                    console.log(val);
                    this.storage.set('equipment', val + 1);
                    BADGE.new_equipments = val + 1;
                })
            }
            console.log("update_chat");
            this.storage.set('update_chat', true);

        });

    }




    async showAlert(titulo, texto) {
        const alert = await this.alertCtrl.create({
            header: titulo,
            message: texto,
            buttons: [
                {
                    text: 'Entendi',
                    handler: () => {
                    }
                }
            ]
        });
        await alert.present();
    }


}
