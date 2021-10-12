import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KEY, TOKEN } from 'src/environments/environment';
import { Storage } from '@ionic/storage';
import { HttpService } from '../../http.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: any;
  hideFilter: any;
  hidePass:any;
  main: any;
  password: any;
  token: any;
  email: any;
  email_forget:any;
  loginauto: any;

  constructor(
    private router: Router,
    private storage: Storage,
    public loginService: HttpService) { }

  ngOnInit() {
    this.hidePass = false;
    this.hideFilter = false;
    this.main = true;
  }

  ionViewDidEnter() {

    this.storage.get('login_auto').then((auto) => {
      if (auto == true) {
        this.storage.get('login_user').then((login) => {
          this.storage.get('password_user').then((password) => {
            this.loginService.login(login, password, auto);
          })
        })
      }
    })

    this.loginauto = true;
    TOKEN.access_token = null;
    TOKEN.refresh_token = null;
    this.storage.set('refresh_token', null);
    this.storage.set('access_token', null);
    this.storage.set('role', null);
    if (KEY.key != undefined && KEY.key != "") {
      this.loginService.registerKey(KEY.key);
    }
    if (KEY.keymobile != undefined && KEY.keymobile != "") {
      this.loginService.registerKey(KEY.keymobile);
    }
  }

  sendMiniToken(token, email) {
    this.loginService.registerMiniKey(token, email);
    this.closeKey();
  }

  sendPass(email) {
    this.loginService.forgetPass(email);
    this.closePass();
  }


  openRegister(): void {
    this.router.navigate(['register']);
  }

  closeKey(): void {
    this.email = null;
    this.token = null;
    if (this.hideFilter == false) {
      this.hideFilter = true;
      this.main = false;
    } else {
      this.hideFilter = false;
      this.main = true;
    }
  }

  closePass(): void{
    this.email_forget = null;
    if (this.hidePass == false) {
      this.hidePass = true;
      this.main = false;
    } else {
      this.hidePass = false;
      this.main = true;
    }
  }

  openLogon() {
    this.loginService.login(this.user, this.password, this.loginauto);
  }

}
