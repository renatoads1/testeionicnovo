import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { SERVER_URL, TOKEN, KEY, ROLE, LANGUAGE, BADGE } from 'src/environments/environment';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Base64 } from 'Base64';
import { map } from 'rxjs/operators';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { NotificationService } from './notification.service';
import { Firebase } from '@ionic-native/firebase/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';



@Injectable({
  providedIn: 'root'
})
export class HttpService {

  data: any = {};
  i: any;
  k: any;
  id: any;
  npage = [];

  company_name: any;
  parent: any;
  tickets: any;
  users: any;
  reasons: any;
  equipments: any;
  equipmentsAdmin: any;
  pieces: any;
  tasks: any;
  stats: any;
  tutorials: any;
  troubleshooting: any;
  services: any;
  attachments: any;
  messages: any;
  company: any;

  resultStats = [];
  resultUsers = [];
  resultEquip = [];
  resultEquipAdmin = [];
  resultPiece = [];
  resultTicket = [];
  resultService = [];
  resultReason = [];
  resultCompany = [];
  resultSign = [];
  resultTask = [];
  resultChat = [];
  resultTutorial = [];
  resultTroubleshooting = [];
  resultAttachment: any;

  httpOptions: any;
  httpOptionswt: any;
  httpOptionsFile: any;
  httpOptionsLogin: any;
  httpOptionsImage: any;
  httpOptionsregion: any;
  encodedData: any;

  constructor(
    private menu: MenuController,
    private platform: Platform,
    private router: Router,
    public http: HttpClient,
    public alertController: AlertController,
    public loadingController: LoadingController,
    private storage: Storage,
    public toastController: ToastController,
    private translate: TranslateService,
    private iab: InAppBrowser,
    private file: File,
    public notificationService: NotificationService,
    private firebase: Firebase,
    private fileOpener: FileOpener) { }


  saveFile(blob, filename) {
    if (window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      const a = document.createElement('a');
      document.body.appendChild(a);
      const url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = filename;
      a.click();
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }, 0)
    }
  }

  getHeader() {
    this.httpOptionsLogin = {
      headers: new HttpHeaders({
        'Locale': LANGUAGE.locale,
        'Authorization': 'Basic ' + this.encodedData,
      })
    };

    this.httpOptionsFile = {
      headers: new HttpHeaders({
        'Locale': LANGUAGE.locale,
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + TOKEN.access_token,
      })
    };

    this.httpOptionsImage = {

      headers: new HttpHeaders({
        'Locale': LANGUAGE.locale,
        'Authorization': 'Bearer ' + TOKEN.access_token,
      }),
      responseType: 'blob'

    };

    this.httpOptions = {
      headers: new HttpHeaders({
        'Locale': LANGUAGE.locale,
        'Authorization': 'Bearer ' + TOKEN.access_token,
      })
    };

    this.httpOptionswt = {
      headers: new HttpHeaders({
        'Locale': LANGUAGE.locale,
      })
    };

    this.httpOptionsregion = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
  }




  async presentLoading(j) {
    var message = "";
    this.translate.get('LOADING').subscribe((res: string) => {
      message = res;
    });
    const loading = await this.toastController.create({
      message: message,
      duration: 15000
    });
    await loading.present();
    j("ok");
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => this.k = 0);
  }


  async reportAlert(value) {

    var header = "";
    var message = "";
    this.translate.get('REPORT').subscribe((res: string) => {
      header = res;
    });
    this.translate.get('DAYS').subscribe((res: string) => {
      message = res;
    });

    const alert = await this.alertController.create({
      header: header,
      message: value,
      buttons: [
        {
          text: 'OK',
          handler: () => {
          }
        }
      ]
    });

    await alert.present();
  }


  async deleteToast(position) {
    var message = "";
    this.translate.get('USERDELETED').subscribe((res: string) => {
      message = res;
    });
    const toastElement = await this.toastController.create({
      message: message,
      position,
      duration: 4000
    });
    return await toastElement.present();
  }

  async alreadyToast(position) {
    var message = "";
    this.translate.get('ALREADYORDER').subscribe((res: string) => {
      message = res;
    });
    const toastElement = await this.toastController.create({
      message: message,
      position,
      duration: 4000
    });
    return await toastElement.present();
  }

  async expiredToast(position) {
    var message = "";
    this.translate.get('SIGNEXPIRED').subscribe((res: string) => {
      message = res;
    });
    const toastElement = await this.toastController.create({
      message: message,
      position,
      duration: 4000
    });
    return await toastElement.present();
  }

  async reasonToast(position) {
    var message = "";
    this.translate.get('REASONNOTFOUND').subscribe((res: string) => {
      message = res;
    });
    const toastElement = await this.toastController.create({
      message: message,
      position,
      duration: 4000
    });
    return await toastElement.present();
  }

  async deleteTimeToast(position) {
    var message = "";
    this.translate.get('DELETETIME').subscribe((res: string) => {
      message = res;
    });
    const toastElement = await this.toastController.create({
      message: message,
      position,
      duration: 4000
    });
    return await toastElement.present();
  }

  async vmiExistsToast(position) {
    var message = "";
    this.translate.get('VMICODEEXISTS').subscribe((res: string) => {
      message = res;
    });
    const toastElement = await this.toastController.create({
      message: message,
      position,
      duration: 4000
    });
    return await toastElement.present();
  }

  async editToast(position) {
    var message = "";
    this.translate.get('EDITEDS').subscribe((res: string) => {
      message = res;
    });
    const toastElement = await this.toastController.create({
      message: message,
      position,
      duration: 4000
    });
    return await toastElement.present();
  }

  async desativeToast(position) {
    var message = "";
    this.translate.get('DESATIVEDS').subscribe((res: string) => {
      message = res;
    });
    const toastElement = await this.toastController.create({
      message: message,
      position,
      duration: 4000
    });
    return await toastElement.present();
  }

  async completeToast(position) {
    var message = "";
    this.translate.get('CREATES').subscribe((res: string) => {
      message = res;
    });
    const toastElement = await this.toastController.create({
      message: message,
      position,
      duration: 4000
    });
    return await toastElement.present();
  }

  async allocToast(position) {
    var message = "";
    this.translate.get('ALLOCATES').subscribe((res: string) => {
      message = res;
    });
    const toastElement = await this.toastController.create({
      message: message,
      position,
      duration: 4000
    });
    return await toastElement.present();
  }

  async presentToast(position) {
    var message = "";
    this.translate.get('SENDEMAILS').subscribe((res: string) => {
      message = res;
    });
    const toastElement = await this.toastController.create({
      message: message,
      position,
      duration: 4000
    });
    return await toastElement.present();
  }

  async loginToast(position) {
    var message = "";
    this.translate.get('LOGINERRO').subscribe((res: string) => {
      message = res;
    });
    const toastElement = await this.toastController.create({
      message: message,
      position,
      duration: 4000
    });
    return await toastElement.present();
  }

  async pieceToast(position) {
    var message = "";
    this.translate.get('PIECESADD').subscribe((res: string) => {
      message = res;
    });
    const toastElement = await this.toastController.create({
      message: message,
      position,
      duration: 4000
    });
    return await toastElement.present();
  }


  async taskToast(position) {
    var message = "";
    this.translate.get('TASKSADD').subscribe((res: string) => {
      message = res;
    });
    const toastElement = await this.toastController.create({
      message: message,
      position,
      duration: 4000
    });
    return await toastElement.present();
  }

  async noteToast(position) {
    var message = "";
    this.translate.get('NOTEADD').subscribe((res: string) => {
      message = res;
    });
    const toastElement = await this.toastController.create({
      message: message,
      position,
      duration: 4000
    });
    return await toastElement.present();
  }

  async dateToast(position) {
    var message = "";
    this.translate.get('DATEADD').subscribe((res: string) => {
      message = res;
    });
    const toastElement = await this.toastController.create({
      message: message,
      position,
      duration: 4000
    });
    return await toastElement.present();
  }


  async notFoundToast(position) {
    var message = "";
    this.translate.get('NOITEM').subscribe((res: string) => {
      message = res;
    });
    const toastElement = await this.toastController.create({
      message: message,
      position,
      duration: 4000
    });
    return await toastElement.present();
  }

  async notFoundEquip(position) {
    var message = "";
    this.translate.get('NOTFOUNDEQUIP').subscribe((res: string) => {
      message = res;
    });
    const toastElement = await this.toastController.create({
      message: message,
      position,
      duration: 4000
    });
    return await toastElement.present();
  }

  async notFound(position) {
    var message = "";
    this.translate.get('NOTFOUND').subscribe((res: string) => {
      message = res;
    });
    const toastElement = await this.toastController.create({
      message: message,
      position,
      duration: 4000
    });
    return await toastElement.present();
  }

  async foundEquip(position) {
    var message = "";
    this.translate.get('SUCESSEQUIP').subscribe((res: string) => {
      message = res;
    });
    const toastElement = await this.toastController.create({
      message: message,
      position,
      duration: 4000
    });
    return await toastElement.present();
  }

  async requestToast(position) {
    var message = "";
    this.translate.get('FAILCOM').subscribe((res: string) => {
      message = res;
    });
    const toastElement = await this.toastController.create({
      message: message,
      position,
      duration: 4000
    });
    return await toastElement.present();
  }

  async inativeToast(position) {
    var message = "";
    this.translate.get('INATIVE').subscribe((res: string) => {
      message = res;
    });
    const toastElement = await this.toastController.create({
      message: message,
      position,
      duration: 4000
    });
    return await toastElement.present();
  }

  async errorToast(position, error) {
    const toastElement = await this.toastController.create({
      message: error,
      position,
      duration: 4000
    });
    return await toastElement.present();
  }

  async registerConfirmToast(position) {
    var message = "";
    this.translate.get('SOLICITATION').subscribe((res: string) => {
      message = res;
    });
    const toastElement = await this.toastController.create({
      message: message,
      position,
      duration: 4000
    });
    return await toastElement.present();
  }

  async registerInvalidToast(position) {
    var message = "";
    this.translate.get('EXISTEMAIL').subscribe((res: string) => {
      message = res;
    });
    const toastElement = await this.toastController.create({
      message: message,
      position,
      duration: 4000
    });
    return await toastElement.present();
  }

  async rateToast(position) {
    var message = "";
    this.translate.get('RATEDSENDED').subscribe((res: string) => {
      message = res;
    });
    const toastElement = await this.toastController.create({
      message: message,
      position,
      duration: 4000
    });
    return await toastElement.present();
  }

  async keyToast(position) {
    var message = "";
    this.translate.get('WRONGKEY').subscribe((res: string) => {
      message = res;
    });
    const toastElement = await this.toastController.create({
      message: message,
      position,
      duration: 4000
    });
    return await toastElement.present();
  }


  async login(user, password, login_auto) {

    this.menu.enable(false);

    this.presentLoading((data) => {

      this.encodedData = window.btoa(user + ':' + password),

        this.getHeader(),

        this.http.post(SERVER_URL + "/customer/login", '', this.httpOptionsLogin).subscribe(data => {
          this.data.response;
          this.data = data;
          TOKEN.access_token = this.data.access_token;
          TOKEN.refresh_token = this.data.refresh_token;
          if (login_auto == true) {
            this.storage.set('login_auto', login_auto);
            this.storage.set('login_user', user);
            this.storage.set('password_user', password);
          }
          this.storage.set('refresh_token', TOKEN.refresh_token);
          if (this.platform.is('mobile')) {
            this.getToken();
          } else {
          }
          if (this.data.role == "admin") {
            ROLE.role = "admin";
            ROLE.company_name = this.data.company_name;
            this.storage.set('company_name', this.data.company_name);
            if (this.data.company_name == "VMI Security") {
              ROLE.parent = "admin";
              this.storage.set('parent', 'admin');
            } else {
              ROLE.parent = "distri";
              this.storage.set('parent', 'distri');
            }
            this.storage.set('role', 'home-vmi');
            this.router.navigate(['home-vmi']);
          } if (this.data.role == "distributor") {
            ROLE.role = "distributor";
            this.storage.set('role', 'home-distributors');
            this.router.navigate(['home-vmi']);
          } if (this.data.role == "technician") {
            ROLE.role = "tech";
            this.storage.set('role', 'home-technician');
            this.router.navigate(['ticket']);
          } if (this.data.role == "client") {
            ROLE.role = "client";
            this.storage.set('role', 'home-client');
            this.router.navigate(['ticket']);
          } if (this.data.message != "Logged in as " + user) {
            this.loginToast('bottom');
          }
          this.toastController.dismiss();
        }, error => {
          this.toastController.dismiss();
          if (error.error == "Unauthorized Access") {
            this.loginToast('bottom');
          } else {
            this.requestToast('bottom');
          }
        })
    });
  }

  async register(address, company, email, name, phone, user, lat, lng, country, region, city) {

    let postData = {};

    this.presentLoading((data) => {

      this.getHeader(),

        postData = {

          address: address,
          company_id: company,
          email: email,
          name: name,
          latitude: lat,
          longitude: lng,
          phone_number: phone,
          username: user,
          country: country,
          region: region,
          city: city
        },


      this.http.post(SERVER_URL + "/customer/users", postData, this.httpOptionswt).subscribe(data => {
        this.data.response;

        this.registerConfirmToast('bottom');
        this.router.navigate(['login']);
        this.toastController.dismiss();
      }, error => {
        this.toastController.dismiss();
        if (error.error = "annot insert user in data. Username and email must be unique.") {
          this.registerInvalidToast('bottom')
        } else {
          this.requestToast('bottom');
        }

      })

    });


  }

  async completeRegister(id, password) {

    let postData = {};

    this.presentLoading((data) => {

      this.getHeader(),

        postData = {
          id: id,
          password: password
        },

        this.http.post(SERVER_URL + "/customer/users/credentials", postData, this.httpOptionswt).subscribe(data => {
          this.data.response;

          this.router.navigate(['login']);
          this.completeToast('bottom');
          this.toastController.dismiss();
        }, error => {
          this.toastController.dismiss();
          this.requestToast('bottom');
        })
    });
  }

  async getUsers(all, company, active, role, login, city, region, country, page, per_page, numberpage) {

    var root = "";

    this.presentLoading((data) => {

      this.getHeader(),

        this.i = 0,
        this.resultUsers = [],
        root = "/customer/users?page=" + page + "&per_page=" + per_page
      var numberpages = [];
      if (all != "") {
        root = root.concat("&all=" + all);
      } if (company != "") {
        root = root.concat("&company_name=" + company);
      } if (active != "") {
        root = root.concat("&state=" + active);
      } if (role != "") {
        root = root.concat("&role=" + role);
      } if (login != "") {
        root = root.concat("&name=" + login);
      } if (city != "") {
        root = root.concat("&city=" + city);
      } if (region != "") {
        root = root.concat("&region=" + region);
      } if (country != "") {
        root = root.concat("&country=" + country);
      }
      
      this.data = this.http.get(SERVER_URL + root, this.httpOptions);
      this.data.subscribe(data => {
        
        this.users = data.users;
        for (var a = 1; a <= data.n_pages; a++) {
          numberpages.push(a);
        }
        if (this.users == "") {
          this.notFoundToast('bottom');
        } else {
          for (var item in this.users) {
            this.resultUsers.push(this.users[this.i]);
            this.i++;
          }
        }
        numberpage(numberpages);

        this.toastController.dismiss();
      }, error => {
        
        this.toastController.dismiss();
        if (error.error.msg == "Token has expired") {
          this.refreshToken((j) => {
            
          });
          this.inativeToast('bottom');
        } else {

          this.requestToast('bottom');
        }
      })

    });

  }

  async createEquipmentAdmin(model) {

    let postData = {};

    this.presentLoading((data) => {

      this.getHeader(),

        postData = {

          model: model

        },

        this.http.post(SERVER_URL + "/customer/equipments", postData, this.httpOptions).subscribe(data => {
          
          this.data.response;
          this.router.navigate(['equipment-vmi']);
          this.toastController.dismiss();
        }, error => {
          
          this.toastController.dismiss();
          if (error.error.msg == "Token has expired") {
            this.refreshToken((j) => {
              
            });
            this.inativeToast('bottom');
          } else {

            this.requestToast('bottom');
          }
        })

    });

  }

  async getEquipmentsAdmin(page, per_page, numberpage) {

    var numberpages = [];

    this.presentLoading((data) => {

      this.getHeader(),

        this.i = 0,
        this.resultEquipAdmin = [],
        numberpages = [],
        this.data = this.http.get(SERVER_URL + "/customer/equipments?page=" + page + "&per_page=" + per_page, this.httpOptions);
      this.data.subscribe(data => {
        
        this.equipmentsAdmin = data.equipments;
        for (var a = 1; a <= data.n_pages; a++) {
          numberpages.push(a);
        }
        numberpage(numberpages);
        if (this.equipmentsAdmin == "") {
          this.notFoundToast('bottom');
        } else {
          for (var item in this.equipmentsAdmin) {
            this.resultEquipAdmin.push(this.equipmentsAdmin[this.i]);
            this.i++;
          }
        }
        this.toastController.dismiss();
      }, error => {
        
        this.toastController.dismiss();
        if (error.error.msg == "Token has expired") {
          this.refreshToken((j) => {
            
          });
          this.inativeToast('bottom');
        } else {

          this.requestToast('bottom');
        }
      })

    });


  }

  async deleteEquipmentAdmin(id, j) {

    this.presentLoading((data) => {

      this.getHeader(),

        this.http.delete(SERVER_URL + '/customer/equipments/' + id, this.httpOptions).subscribe(data => {
          this.data.response;

          this.deleteToast('bottom');
          this.toastController.dismiss();
          j(data);
        }, error => {
          
          this.toastController.dismiss();
          if (error.error.msg == "Token has expired") {

            this.refreshToken((j) => {
              
            });
            this.inativeToast('bottom');
          } else {

            this.requestToast('bottom');
          }
        })

    });

  }

  async createEquipments(id, serial) {

    let postData = {};

    this.presentLoading((data) => {

      this.getHeader(),

        postData = {

          user_equip_id: id,
          serial_number: serial

        },

        this.http.post(SERVER_URL + "/customer/user/equipments", postData, this.httpOptions).subscribe(data => {
          
          this.data.response;
          this.registerConfirmToast('bottom');
          this.router.navigate(['equipment-client']);
          this.toastController.dismiss();
        }, error => {
          
          this.toastController.dismiss();
          if (error.error.msg == "Token has expired") {
            this.refreshToken((j) => {
              
            });
            this.inativeToast('bottom');
          } else {

            this.requestToast('bottom');
          }
        })

    });

  }

  async getEquipments(all, userid, status, serial, page, per_page, numberpage) {

    var root = "";

    this.presentLoading((data) => {

      this.getHeader(),
        this.i = 0,
        this.resultEquip = [],
        root = "/customer/user/equipments?page=" + page + "&per_page=" + per_page
      var numberpages = [];
      if (all != "") {
        root = root.concat("&all=" + all);
      } if (userid != "") {
        root = root.concat("&user_id=" + userid);
      } if (status != "") {
        root = root.concat("&status=" + status);
      } if (serial != "") {
        root = root.concat("&serial_number=" + serial);
      }
      
      this.data = this.http.get(SERVER_URL + root, this.httpOptions);
      this.data.subscribe(data => {
        
        this.equipments = data.equipments;
        for (var a = 1; a <= data.n_pages; a++) {
          numberpages.push(a);
        }
        numberpage(numberpages);
        if (this.equipments == "") {
          this.notFoundToast('bottom');
        } else {
          for (var item in this.equipments) {
            this.resultEquip.push(this.equipments[this.i]);
            this.i++;
          }
        }
        this.toastController.dismiss();
      }, error => {
        
        this.toastController.dismiss();
        if (error.error.msg == "Token has expired") {
          this.refreshToken((j) => {
            
          });
          this.inativeToast('bottom');
        } else {

          this.requestToast('bottom');
        }
      })

    });

  }

  async createPieces(name) {

    let postData = {};

    this.presentLoading((data) => {

      this.getHeader(),

        postData = {

          name: name

        },

        this.http.post(SERVER_URL + "/customer/equipments/pieces", postData, this.httpOptions).subscribe(data => {
          this.data.response;
          
          this.router.navigate(['piece']);
          this.completeToast("bottom");
          this.toastController.dismiss();
        }, error => {
          
          this.toastController.dismiss();
          if (error.error.msg == "Token has expired") {
            this.refreshToken((j) => {
              
            });
            this.inativeToast('bottom');
          } else {

            this.requestToast('bottom');
          }
        })

    });



  }

  async getPieces(page, per_page, numberpage) {

    var root = "";

    this.presentLoading((data) => {

      this.getHeader(),

        this.i = 0,
        this.resultPiece = [],
        root = "/customer/equipments/pieces" + "?page=" + page + "&per_page=" + per_page
      var numberpages = [];
      this.data = this.http.get(SERVER_URL + root, this.httpOptions);
      this.data.subscribe(data => {
        
        this.pieces = data.pieces;
        for (var a = 1; a <= data.n_pages; a++) {
          numberpages.push(a);
        }
        numberpage(numberpages);
        if (this.pieces == "") {
          this.notFoundToast('bottom');
        } else {
          for (var item in this.pieces) {
            this.resultPiece.push(this.pieces[this.i]);
            this.i++;
          }
        }
        this.toastController.dismiss();
      }, error => {
        
        this.toastController.dismiss();
        if (error.error.msg == "Token has expired") {
          this.refreshToken((j) => {
            
          });
          this.inativeToast('bottom');
        } else {

          this.requestToast('bottom');
        }
      })

    });

  }


  async getStats(from, to, j) {

    var root = "";

    this.presentLoading((data) => {

      this.getHeader(),

        this.i = 0,
        this.resultStats = [],
        root = "/customer/stats" + "?from=" + from + "&to=" + to
      var numberpages = [];
      this.data = this.http.get(SERVER_URL + root, this.httpOptions);
      this.data.subscribe(data => {
        
        this.stats = data.open_tickets;
        this.toastController.dismiss();
        j(data);
      }, error => {
        
        this.toastController.dismiss();
        if (error.error.msg == "Token has expired") {
          this.refreshToken((j) => {
            
          });
          this.inativeToast('bottom');
        } else {

          this.requestToast('bottom');
        }
      })

    });

  }


  async deletePiece(id, j) {

    this.presentLoading((data) => {

      this.getHeader(),

        this.http.delete(SERVER_URL + '/customer/equipments/pieces/' + id, this.httpOptions).subscribe(data => {
          this.data.response;

          this.deleteToast('bottom');
          this.toastController.dismiss();
          j(data);
        }, error => {
          
          this.toastController.dismiss();
          if (error.error.msg == "Token has expired") {

            this.refreshToken((j) => {
              
            });
            this.inativeToast('bottom');
          } else {

            this.requestToast('bottom');
          }
        })

    });

  }

  async deleteTutorial(id, j) {

    this.presentLoading((data) => {

      this.getHeader(),

        this.http.delete(SERVER_URL + '/customer/tutorial/' + id, this.httpOptions).subscribe(data => {
          this.data.response;

          this.deleteToast('bottom');
          this.toastController.dismiss();
          j(data);
        }, error => {
          
          this.toastController.dismiss();
          if (error.error.msg == "Token has expired") {

            this.refreshToken((j) => {
              
            });
            this.inativeToast('bottom');
          } else {

            this.requestToast('bottom');
          }
        })

    });

  }

  async createReason(reason) {

    let postData = {};

    this.presentLoading((data) => {

      this.getHeader(),
        postData = {

          message: reason

        },

        this.http.post(SERVER_URL + "/customer/justification", postData, this.httpOptions).subscribe(data => {
          
          this.data.response;
          this.router.navigate(['equipment-vmi']);
          this.toastController.dismiss();
        }, error => {
          
          this.toastController.dismiss();
          if (error.error.msg == "Token has expired") {
            this.refreshToken((j) => {
              
            });
            this.inativeToast('bottom');
          } else {

            this.requestToast('bottom');
          }
        });

    });

  }

  async getReasons(page, per_page, numberpage) {

    var numberpages = [];

    this.presentLoading((data) => {

      this.getHeader(),

        this.i = 0,
        this.resultReason = [],
        numberpages = [],
        this.data = this.http.get(SERVER_URL + "/customer/justification" + "?page=" + page + "&per_page=" + per_page, this.httpOptions);
      this.data.subscribe(data => {
        
        this.reasons = data.justifications;
        for (var a = 1; a <= data.n_pages; a++) {
          numberpages.push(a);
        }
        numberpage(numberpages);
        if (this.reasons == "") {
          this.reasonToast('bottom');
        } else {
          for (var item in this.reasons) {
            this.resultReason.push(this.reasons[this.i]);
            this.i++;
          }
        }
        this.toastController.dismiss();
      }, error => {
        
        this.toastController.dismiss();
        if (error.error.msg == "Token has expired") {
          this.refreshToken((j) => {
            
          });
          this.inativeToast('bottom');
        } else {

          this.requestToast('bottom');
        }
      });

    });


  }

  async deleteReason(id, j) {

    this.presentLoading((data) => {

      this.getHeader(),

        this.http.delete(SERVER_URL + '/customer/justification/' + id, this.httpOptions).subscribe(data => {
          this.data.response;

          this.deleteToast('bottom');
          this.toastController.dismiss();
          j(data);
        }, error => {
          
          this.toastController.dismiss();
          if (error.error.msg == "Token has expired") {

            this.refreshToken((j) => {
              
            });
            this.inativeToast('bottom');
          } else {

            this.requestToast('bottom');
          }
        })

    });

  }

  async createCompany(name, is_client, associate) {

    let postData = {};

    this.presentLoading((data) => {

      this.getHeader(),
        postData = {

          name: name,
          is_client: is_client,
          parent_company_id: associate

        },

        this.http.post(SERVER_URL + "/customer/company", postData, this.httpOptions).subscribe(data => {
          
          this.data.response;
          this.router.navigate(['solicitation']);
          this.toastController.dismiss();
        }, error => {
          
          this.toastController.dismiss();
          if (error.error.msg == "Token has expired") {
            this.refreshToken((j) => {
              
            });
            this.inativeToast('bottom');
          } else {

            this.requestToast('bottom');
          }
        });

    });

  }

  async getCompany(page, per_page, numberpage) {

    var numberpages = [];

    this.presentLoading((data) => {

      this.getHeader(),

        this.i = 0,
        this.resultCompany = [],
        numberpages = [],
        this.data = this.http.get(SERVER_URL + "/customer/company" + "?page=" + page + "&per_page=" + per_page, this.httpOptions);
      this.data.subscribe(data => {
        
        this.company = data.companies;
        for (var a = 1; a <= data.n_pages; a++) {
          numberpages.push(a);
        }
        numberpage(numberpages);
        if (this.company == "") {
          this.notFoundToast('bottom');
        } else {
          for (var item in this.company) {
            this.resultCompany.push(this.company[this.i]);
            this.i++;
          }
        }
        this.toastController.dismiss();
      }, error => {
        
        this.toastController.dismiss();
        if (error.error.msg == "Token has expired") {
          this.refreshToken((j) => {
            
          });
          this.inativeToast('bottom');
        } else {

          this.requestToast('bottom');
        }
      });

    });


  }


  async deleteCompany(id, j) {

    this.presentLoading((data) => {

      this.getHeader(),

        this.http.delete(SERVER_URL + '/customer/company/' + id, this.httpOptions).subscribe(data => {
          this.data.response;

          this.deleteToast('bottom');
          this.toastController.dismiss();
          j(data);
        }, error => {
          
          this.toastController.dismiss();
          if (error.error.msg == "Token has expired") {

            this.refreshToken((j) => {
              
            });
            this.inativeToast('bottom');
          } else {

            this.requestToast('bottom');
          }
        })

    });

  }

  async createTask(title, description) {

    let postData = {};

    this.presentLoading((data) => {

      this.getHeader(),

        postData = {

          title: title,
          description: description

        },

        this.http.post(SERVER_URL + "/customer/task", postData, this.httpOptions).subscribe(data => {
          this.data.response;
          this.router.navigate(['task']);
          this.completeToast("bottom");
          this.toastController.dismiss();
        }, error => {
          this.toastController.dismiss();
          if (error.error.msg == "Token has expired") {
            this.refreshToken((j) => {
              
            });
            this.inativeToast('bottom');
          } else {

            this.requestToast('bottom');
          }
        })

    });



  }


  async getTask(page, per_page, numberpage) {

    var numberpages = [];

    this.presentLoading((data) => {

      this.getHeader(),

        this.i = 0,
        this.resultTask = [],
        numberpages = [],
        this.data = this.http.get(SERVER_URL + "/customer/task" + "?page=" + page + "&per_page=" + per_page, this.httpOptions);
      this.data.subscribe(data => {
        
        this.tasks = data.tasks;
        for (var a = 1; a <= data.n_pages; a++) {
          numberpages.push(a);
        }
        numberpage(numberpages);
        if (this.tasks == "") {
          this.notFoundToast('bottom');
        } else {
          for (var item in this.tasks) {
            this.resultTask.push(this.tasks[this.i]);
            this.i++;
          }
        }
        this.toastController.dismiss();
      }, error => {
        
        this.toastController.dismiss();
        if (error.error.msg == "Token has expired") {
          this.refreshToken((j) => {
            
          });
          this.inativeToast('bottom');
        } else {

          this.requestToast('bottom');
        }
      });

    });


  }

  async deleteTask(id, j) {

    this.presentLoading((data) => {

      this.getHeader(),

        this.http.delete(SERVER_URL + '/customer/task/' + id, this.httpOptions).subscribe(data => {
          this.data.response;

          this.deleteToast('bottom');
          this.toastController.dismiss();
          j(data);
        }, error => {
          
          this.toastController.dismiss();
          if (error.error.msg == "Token has expired") {

            this.refreshToken((j) => {
              
            });
            this.inativeToast('bottom');
          } else {

            this.requestToast('bottom');
          }
        })

    });

  }

  async createTicket(title, device, description, formData) {

    this.presentLoading((data) => {

      this.getHeader(),
        this.http.post(SERVER_URL + "/customer/tickets?title=" + title + "&serial_number=" + device + "&description=" + description, formData, this.httpOptions).subscribe(data => {
          this.router.navigate(['ticket']);
          this.toastController.dismiss();
        }, error => {
          
          this.toastController.dismiss();
          if (error.error.msg == "Token has expired") {
            this.refreshToken((j) => {
              
            });
            this.inativeToast('bottom');
          } else {
            this.requestToast('bottom');
          }
        })

    });

  }

  async createService(occurrence, description, type, tech_id, customer_id, equip_id, formData) {

    this.presentLoading((data) => {

      this.getHeader(),

      this.http.post(SERVER_URL + "/customer/orders?occurrence=" + occurrence + "&description=" + description + "&type=" + type + "&tech_id=" + tech_id + "&customer_id=" + customer_id + "&equip_id=" + equip_id, formData, this.httpOptions).subscribe(data => {
        this.completeToast('bottom');
        this.router.navigate(['service']);
        this.toastController.dismiss();
      }, error => {
        
        this.toastController.dismiss();
        if (error.error.message == "Already there is a open service order to this equipment"){
          this.alreadyToast('bottom');
        } else if (error.error.msg == "Token has expired") {
          this.refreshToken((j) => {
            
          });
          this.inativeToast('bottom');
        } else {
          this.requestToast('bottom');
        }
      })

    });


  }

  async createServiceTech(occurrence, description, ticket_id) {

    this.presentLoading((data) => {

      this.getHeader(),

        this.http.post(SERVER_URL + "/customer/orders?occurrence=" + occurrence + "&description=" + description + "&ticket_id=" + ticket_id, null, this.httpOptions).subscribe(data => {
          this.completeToast('bottom');
          this.router.navigate(['service']);
          this.toastController.dismiss();
        }, error => {
          
          this.toastController.dismiss();
          if (error.error.message == "Token has expired") {
            this.refreshToken((j) => {
              
            });
            this.inativeToast('bottom');
          } else {
            this.requestToast('bottom');
          }
        })

    });

  }

  async changeTicketStatus(id, status, j) {

    let postData = {};

    this.presentLoading((data) => {

      this.getHeader(),

        postData = {

          status: status

        },

        this.http.put(SERVER_URL + "/customer/tickets/" + id, postData, this.httpOptions).subscribe(data => {
          this.data.response;

          this.editToast('bottom');
          this.toastController.dismiss();
          j(data);
        }, error => {
          
          this.errorToast('bottom', error.error.message);

        })

    });
  }

  async getTicket(status, datai, dataf, techname, clientname, page, per_page, numberpage) {

    var root = "";

    this.presentLoading((data) => {

      this.getHeader(),

        this.i = 0,
        this.resultTicket = [],
        root = "/customer/tickets" + "?page=" + page + "&per_page=" + per_page
      var numberpages = [];
      if (status != "") {
        root = root.concat("&status=" + status);
      } if (datai != "") {
        root = root.concat("&created_date=" + datai);
      } if (dataf != "") {
        root = root.concat("&finished_date=" + dataf);
      } if (techname != "") {
        root = root.concat("&tech_name=" + techname);
      } if (clientname != "") {
        root = root.concat("&customer_name=" + clientname);
      }
      this.data = this.http.get(SERVER_URL + root, this.httpOptions);
      this.data.subscribe(data => {
        
        this.tickets = data.tickets;
        for (var a = 1; a <= data.n_pages; a++) {
          numberpages.push(a);
        }
        numberpage(numberpages);
        if (this.tickets == "") {
          this.notFoundToast('bottom');
        } else {
          for (var item in this.tickets) {
            this.resultTicket.push(this.tickets[this.i]);
            this.i++;
          }
        }
        this.toastController.dismiss();
      }, error => {
        
        this.toastController.dismiss();
        if (error.error.msg == "Token has expired") {
          this.refreshToken((j) => {
            
          });
          this.inativeToast('bottom');
        } else {

          this.requestToast('bottom');
        }
      })

    });

  }

  async rateTicket(id, rate, j) {

    let postData = {};

    this.presentLoading((data) => {

      this.getHeader(),

        postData = {

          id: id,
          rating: rate

        },

        this.http.put(SERVER_URL + "/customer/tickets/" + id, postData, this.httpOptions).subscribe(data => {
          this.data.response;
          j(data);
          this.rateToast('bottom');
          this.toastController.dismiss();
        }, error => {
          
          this.toastController.dismiss();
          if (error.error.msg == "Token has expired") {
            this.refreshToken((j) => {
              
            });
            this.inativeToast('bottom');
          } else {

            this.requestToast('bottom');
          }
        })

    });

  }

  async getService(request, status, page, per_page, numberpage) {

    var root = ""

    this.presentLoading((data) => {

      this.getHeader();

      this.i = 0,
        this.resultService = [],
        root = "/customer/orders?page=" + page + "&per_page=" + per_page


      var numberpages = [];
      if (request != "") {
        root = root.concat("&request=" + request);
      }
      if (status != "") {
        root = root.concat("&type=" + status);
      }
      if (status == "") {
        this.data = this.http.get(SERVER_URL + root, this.httpOptions);
      }
      else {
        this.data = this.http.get(SERVER_URL + root, this.httpOptions);
      }
      this.data.subscribe(data => {
        
        this.services = data.services;
        for (var a = 1; a <= data.n_pages; a++) {
          numberpages.push(a);
        }
        numberpage(numberpages);
        if (this.services == "") {
          this.notFoundToast('bottom');
        } else {
          for (var item in this.services) {
            this.resultService.push(this.services[this.i]);
            this.i++;
          }
        }
        this.toastController.dismiss();
      }, error => {
        
        this.toastController.dismiss();
        if (error.error.msg == "Token has expired") {
          this.refreshToken((j) => {
            
          });
          this.inativeToast('bottom');
        } else {

          this.requestToast('bottom');
        }
      })
    });
  }

  async createTutorial(title, equip_id, description, role_level, keywords, formData) {

    var root = "";
    

    this.presentLoading((data) => {

      this.getHeader(),

        this.i = 0,
        this.resultTroubleshooting = [],
        root = "/customer/tutorial?title=" + title + "&equip_id=" + equip_id + "&description=" + description + "&role_level=" + role_level
      var numberpages = [];
      if (keywords != "") {
        for (var i = 0; i < keywords.length; i++) {
          root = root.concat("&keywords=" + keywords[i]);
        }
      }
      this.http.post(SERVER_URL + root, formData, this.httpOptions).subscribe(data => {
        this.completeToast('bottom');
        this.router.navigate(['tutorial-vmi']);
        this.toastController.dismiss();
      }, error => {
        
        this.toastController.dismiss();
        if (error.error.msg == "Token has expired") {
          this.refreshToken((j) => {
            
          });
          this.inativeToast('bottom');
        } else {
          this.requestToast('bottom');
        }
      })

    });


  }

  async getTutorial(model, keyword, page, per_page, numberpage) {

    var numberpages = [];
    var root = "";

    this.presentLoading((data) => {

      this.getHeader(),

        this.i = 0,
        this.resultTutorial = [],
        numberpages = [],
        this.i = 0,
        root = "/customer/tutorial" + "?page=" + page + "&per_page=" + per_page
      if (model != "") {
        root = root.concat("&equip_id=" + model);
      }
      if (keyword != "") {
        for (var i = 0; i < keyword.length; i++) {
          root = root.concat("&keywords=" + keyword[i]);
        }
      }
      this.data = this.http.get(SERVER_URL + root, this.httpOptions);
      this.data.subscribe(data => {
        
        this.tutorials = data.tutorials;
        for (var a = 1; a <= data.n_pages; a++) {
          numberpages.push(a);
        }
        numberpage(numberpages);
        if (this.tutorials == "") {
          this.notFoundToast('bottom');
        } else {
          for (var item in this.tutorials) {
            this.resultTutorial.push(this.tutorials[this.i]);
            this.i++;
          }
        }
        this.toastController.dismiss();
      }, error => {
        
        this.toastController.dismiss();
        if (error.error.msg == "Token has expired") {
          this.refreshToken((j) => {
            
          });
          this.inativeToast('bottom');
        } else {

          this.requestToast('bottom');
        }
      });

    });


  }


  async getAttatchment(id, full, resource, j) {

    var root = "";

    this.presentLoading((data) => {
      this.getHeader(),
        root = "/customer/attachments/" + id + "?from_resource=" + resource
      var numberpages = [];
      
      this.http.get(SERVER_URL + root, this.httpOptionsImage).subscribe(data => {
        var fileURL = URL.createObjectURL(data);
        var b: any = data;
        if (this.platform.is("mobile")) {
          this.file.writeFile(this.file.dataDirectory, "teste", data, { replace: true }).then((fileEntry: FileEntry) => {
            this.fileOpener.open(fileEntry.toURL(), b.type)
              .then(() => console.log('File is opened'))
              .catch(err => console.error('Error openening file: ' + err));
          })
            .catch((err) => {
              console.error("Error creating file: " + err);
              throw err;  //Rethrow - will be caught by caller
            });
        } else {
          window.open(fileURL, '_blank');
        }
        this.toastController.dismiss();
        j(data);
      }, error => {
        
        this.toastController.dismiss();
      });
    });
  }

  async allocTech(id, tech_id, j) {

    let postData = {};

    this.presentLoading((data) => {

      this.getHeader(),

        postData = {

          tech_id: tech_id,

        },

        this.http.put(SERVER_URL + '/customer/tickets/' + id, postData, this.httpOptions).subscribe(data => {
          this.data.response;
          this.allocToast('bottom');
          this.toastController.dismiss();
          j(data);
        }, error => {
          
          this.toastController.dismiss();
          if (error.error.msg == "Token has expired") {
            this.refreshToken((j) => {
              
            });
            this.inativeToast('bottom');
          } else {

            this.requestToast('bottom');
          }
        });

    });

  }

  async servicePieces(id, listofpieces, j) {


    let postData = {
      piece_amount_list: listofpieces
    };


    this.presentLoading((data) => {

      this.getHeader(),

        this.http.put(SERVER_URL + '/customer/orders/' + id, postData, this.httpOptions).subscribe(data => {
          this.data.response;
          this.toastController.dismiss();
          j(data);
          this.pieceToast('bottom');
        }, error => {
          
          this.toastController.dismiss();
          if (error.error.msg == "Token has expired") {
            this.refreshToken((j) => {
              
            });
            this.inativeToast('bottom');
          } else {

            this.requestToast('bottom');
          }
        });

    });

  }

  async serviceTasks(id, listoftasks, j) {


    let postData = {
      tasks: listoftasks
    };

    this.presentLoading((data) => {

      this.getHeader(),

        this.http.put(SERVER_URL + '/customer/orders/' + id, postData, this.httpOptions).subscribe(data => {
          this.data.response;
          this.toastController.dismiss();
          j(data);
          this.taskToast('bottom');
        }, error => {
          
          this.toastController.dismiss();
          if (error.error.msg == "Token has expired") {
            this.refreshToken((j) => {
              
            });
            this.inativeToast('bottom');
          } else {

            this.requestToast('bottom');
          }
        });

    });

  }

  async serviceNote(id, note, j) {

    let postData = {
      note: note
    };

    this.presentLoading((data) => {

      this.getHeader(),

        this.http.put(SERVER_URL + '/customer/orders/' + id, postData, this.httpOptions).subscribe(data => {
          this.data.response;
          this.toastController.dismiss();
          j(data);
          this.noteToast('bottom');
        }, error => {
          
          this.toastController.dismiss();
          if (error.error.msg == "Token has expired") {
            this.refreshToken((j) => {
              
            });
            this.inativeToast('bottom');
          } else {

            this.requestToast('bottom');
          }
        });

    });

  }

  async serviceTime(id, starttime, endtime, j) {

    let postData = {};

    if (starttime != undefined && endtime != undefined && endtime != "") {
      postData = {
        start_time: starttime,
        end_time: endtime
      };

    } else if (endtime == undefined || endtime == "" && starttime != "") {
      postData = {
        start_time: starttime
      };
    } else {
      return false;
    }

    this.presentLoading((data) => {

      this.getHeader(),

        this.http.put(SERVER_URL + '/customer/orders/' + id, postData, this.httpOptions).subscribe(data => {
          this.data.response;
          this.toastController.dismiss();
          j(data);
          this.dateToast('bottom');
        }, error => {
          
          this.toastController.dismiss();
          if (error.error.msg == "Token has expired") {
            this.refreshToken((j) => {
              
            });
            this.inativeToast('bottom');
          } else {

            this.requestToast('bottom');
          }
        });

    });

  }


  async deleteTime(id, schedule_id, j) {

    this.presentLoading((data) => {

      this.getHeader(),

        this.http.delete(SERVER_URL + '/customer/orders?schedule_id=' + schedule_id, this.httpOptions).subscribe(data => {
          this.data.response;

          this.deleteTimeToast('bottom');
          this.toastController.dismiss();
          j(data);
        }, error => {
          
          this.toastController.dismiss();
          if (error.error.msg == "Token has expired") {
            this.refreshToken((j) => {
              
            });
            this.inativeToast('bottom');
          } else {

            this.requestToast('bottom');
          }
        })

    });

  }

  async getTicketTech(id) {

    this.presentLoading((data) => {

      this.getHeader();

      this.i = 0,
        this.resultUsers = [],
        this.data = this.http.get(SERVER_URL + "/customer/users?id=" + id, this.httpOptions);
      this.data.subscribe(data => {
        
        this.users = data.users;
        if (this.users == "") {
          this.notFoundToast('bottom');
        } else {
          for (var item in this.users) {
            this.resultUsers.push(this.users[this.i]);
            this.i++;
          }
        }
        this.toastController.dismiss();
      }, error => {
        
        this.toastController.dismiss();
        if (error.error.msg == "Token has expired") {
          this.refreshToken((j) => {
            
          });
          this.inativeToast('bottom');
        } else {

          this.requestToast('bottom');
        }
      })

    });

  }

  async getChat(id, j) {

    this.presentLoading((data) => {

      this.getHeader();

      this.i = 0,
        this.resultChat = [],
        this.data = this.http.get(SERVER_URL + "/customer/chat/" + id, this.httpOptions);
      this.data.subscribe(data => {
        
        this.messages = data.messages;
        if (this.messages == "") {
          this.notFoundToast('bottom');
        } else {
          for (var item in this.messages) {
            this.resultChat.push(this.messages[this.i]);
            this.i++;
          }
        }
        this.toastController.dismiss();
        j(data);
      }, error => {
        
        this.toastController.dismiss();
        if (error.error.msg == "Token has expired") {
          this.refreshToken((j) => {
            
          });
          this.inativeToast('bottom');
        } else {

        }
      })

    });

  }

  async sendMsgChat(id, message, formData, j) {

    this.presentLoading((data) => {

      this.getHeader(),

        this.http.post(SERVER_URL + "/customer/chat/" + id + "?message=" + message, formData, this.httpOptions).subscribe(data => {
          this.toastController.dismiss();
          j(data);
        }, error => {
          
          this.toastController.dismiss();
          if (error.error.message == "Token has expired") {
            this.refreshToken((j) => {
              
            });
            this.inativeToast('bottom');
          } else {
            this.requestToast('bottom');
          }
        })

    });


  }


  async deleteUser(user) {

    this.presentLoading((data) => {

      this.getHeader(),

        this.http.delete(SERVER_URL + '/customer/users/' + user, this.httpOptions).subscribe(data => {
          this.data.response;

          this.deleteToast('bottom');
          this.toastController.dismiss();
        }, error => {
          
          this.toastController.dismiss();
          if (error.error.msg == "Token has expired") {
            this.refreshToken((j) => {
              
            });
            this.inativeToast('bottom');
          } else {

            this.requestToast('bottom');
          }
        })

    });

  }

  async deleteEquipment(id) {

    this.presentLoading((data) => {

      this.getHeader(),

        this.http.delete(SERVER_URL + '/customer/user/equipments/' + id, this.httpOptions).subscribe(data => {
          this.data.response;

          this.deleteToast('bottom');
          this.toastController.dismiss();
        }, error => {
          
          this.toastController.dismiss();
          if (error.error.msg == "Token has expired") {

            this.refreshToken((j) => {
              
            });
            this.inativeToast('bottom');
          } else {

            this.requestToast('bottom');
          }
        })

    });

  }

  async sendEmailUser(username, role) {

    let postData = {};

    this.storage.get('language').then((val) => {
      this.presentLoading((data) => {

        this.getHeader(),

          postData = {

            username: username,
            role: role,
            language: val

          },

          this.http.put(SERVER_URL + '/customer/users/authorize', postData, this.httpOptions).subscribe(data => {
            this.data.response;

            this.presentToast('bottom');
            this.toastController.dismiss();
          }, error => {
            
            this.toastController.dismiss();
            if (error.error.msg == "Token has expired") {
              this.refreshToken((j) => {
                
              });
              this.inativeToast('bottom');
            } else {

              this.requestToast('bottom');
            }
          });
      });
    })

  }

  async chooseCompany(id, company) {

    let postData = {};

    this.presentLoading((data) => {

      this.getHeader(),

        postData = {

          company: company,

        },

        this.http.put(SERVER_URL + "/customer/users/" + id, postData, this.httpOptions).subscribe(data => {
          this.data.response;
          this.toastController.dismiss();
        }, error => {
          
          this.toastController.dismiss();
          if (error.error.msg == "Token has expired") {
            this.refreshToken((j) => {
              
            });
            this.inativeToast('bottom');
          } else {

            this.requestToast('bottom');
          }
        })

    });

  }



  async editEquipment(id, status, justification, j) {

    let postData = {}
    var root = ""

    this.presentLoading((data) => {

      this.getHeader(),
        root = ""
      var numberpages = [];

      if (status == "rejected") {
        postData = {
          serial_number: id,
          status: status,
          justification_id: justification
        }
      } else {
        postData = {
          serial_number: id,
          status: status
        }
      }

      this.http.put(SERVER_URL + '/customer/user/equipments', postData, this.httpOptions).subscribe(data => {
        this.data.response;
        this.editToast('bottom');
        this.toastController.dismiss();
        j(data);
      }, error => {
        
        this.toastController.dismiss();
        if (error.error.msg == "Token has expire") {
          this.refreshToken((j) => {
            
          });
          this.inativeToast('bottom');
        } else {

          this.requestToast('bottom');
        }
      });

    });


  }

  async editUser(id, name, company, phone, address, role, country, region, city) {

    let postData = {};

    this.presentLoading((data) => {

      this.getHeader(),

        postData = {

          id: id,
          name: name,
          company_name: company,
          phone_number: phone,
          address: address,
          role: role,
          country: country,
          region: region,
          city: city

        },

        this.http.put(SERVER_URL + "/customer/users/" + id, postData, this.httpOptions).subscribe(data => {
          this.data.response;

          this.editToast('bottom');
          this.toastController.dismiss();
        }, error => {
          
          this.toastController.dismiss();
          if (error.error.msg == "Token has expired") {
            this.refreshToken((j) => {
              
            });
            this.inativeToast('bottom');
          } else {

            this.requestToast('bottom');
          }
        }),
        this.router.navigate(['home-vmi']);

    });

  }

  async desativeUser(id, j) {

    let postData = {};

    this.presentLoading((data) => {

      this.getHeader(),

        postData = {

          state: "inactive",

        },

        this.http.put(SERVER_URL + '/customer/users/' + id, postData, this.httpOptions).subscribe(data => {
          this.data.response;
          j(data);
          this.desativeToast('bottom');
          this.toastController.dismiss();
        }, error => {
          
          this.toastController.dismiss();
          if (error.error.msg == "Token has expired") {
            this.refreshToken((j) => {
              
            });
            this.inativeToast('bottom');
          } else {

            this.requestToast('bottom');
          }
        })

    });

  }

  async registerKey(key) {

    this.presentLoading((data) => {

      this.getHeader(),

        this.http.get(SERVER_URL + "/customer/users/validate/" + key).subscribe(data => {
          
          this.data = data;
          this.id = this.data.user_id;
          this.router.navigate(['register-confirm']);
          this.toastController.dismiss();
          KEY.key = "";
          KEY.keymobile = "";
        }, error => {
          KEY.key = "";
          KEY.keymobile = "";
          
          this.toastController.dismiss();
          this.router.navigate(['login']);
          this.keyToast('bottom');
        });
    });
  }

  async redeemSign(j) {

    this.presentLoading((data) => {

      this.getHeader(),

        this.http.get(SERVER_URL + "/customer/users/sign", this.httpOptions).subscribe(data => {
          this.data = data;
          this.resultSign = this.data.temporary_signature;
          j(data);
          this.toastController.dismiss();
        }, error => {
          
          this.toastController.dismiss();
          if (error.error.msg == "Token has expired") {
            this.refreshToken((j) => {
              
            });
            this.inativeToast('bottom');
          } else {

            this.requestToast('bottom');
          }
        });
    });
  }

  async endOrder(id, assign, j) {

    let postData = {};

    this.presentLoading((data) => {

      this.getHeader(),

        postData = {

          service_id: id,
          signature: assign,
        },

        this.http.post(SERVER_URL + "/customer/users/sign", postData, this.httpOptions).subscribe(data => {
          this.data.response;

          j(data);
          this.toastController.dismiss();
        }, error => {
          
          this.toastController.dismiss();
          if (error.error.message == 'The User Signature has expired'){
            this.expiredToast('bottom');
          } else if (error.error.msg == "Token has expired") {
            this.refreshToken((j) => {
              
            });
            this.inativeToast('bottom');
          } else {

            this.requestToast('bottom');
          }
        });
    });

  }

  async createTroubleshoot(id, keywords, title, content) {

    let postData = {};

    this.presentLoading((data) => {

      this.getHeader(),

        postData = {

          equip_id: id,
          keywords: keywords,
          title: title,
          content: content

        },

        this.http.post(SERVER_URL + "/customer/troubleshooting", postData, this.httpOptions).subscribe(data => {
          this.data.response;
          this.toastController.dismiss();
          this.completeToast('bottom');
          this.router.navigate(['troubleshoot-vmi']);
        }, error => {
          
          this.toastController.dismiss();
          if (error.error.msg == "Token has expired") {
            this.refreshToken((j) => {
              
            });
            this.inativeToast('bottom');
          } else {

            this.requestToast('bottom');
          }
        });
    });

  }

  async getTroubleshoot(model, keyword, page, per_page, numberpage) {

    var root = "";

    this.presentLoading((data) => {

      this.getHeader(),

        this.i = 0,
        this.resultTroubleshooting = [],
        root = "/customer/troubleshooting" + "?page=" + page + "&per_page=" + per_page
      var numberpages = [];
      if (model != "") {
        root = root.concat("&model=" + model);
      } if (keyword != "") {
        for (var i = 0; i < keyword.length; i++) {
          root = root.concat("&keywords=" + keyword[i]);
        }
      }
      this.data = this.http.get(SERVER_URL + root, this.httpOptions);
      this.data.subscribe(data => {
        
        this.troubleshooting = data.troubleshootings;
        for (var a = 1; a <= data.n_pages; a++) {
          numberpages.push(a);
        }
        numberpage(numberpages);
        if (this.troubleshooting == "") {
          this.notFoundToast('bottom');
        } else {
          for (var item in this.troubleshooting) {
            this.resultTroubleshooting.push(this.troubleshooting[this.i]);
            this.i++;
          }
        }
        this.toastController.dismiss();
      }, error => {
        
        this.toastController.dismiss();
        if (error.error.msg == "Token has expired") {
          this.refreshToken((j) => {
            
          });
          this.inativeToast('bottom');
        } else {

          this.requestToast('bottom');
        }
      })

    });

  }

  async registerMiniKey(key, email) {

    let postData = {};

    this.presentLoading((data) => {

      this.getHeader(),

        postData = {
          email: email
        },

        this.http.put(SERVER_URL + "/customer/users/validate/" + key, postData).subscribe(data => {
          
          this.data = data;
          this.id = this.data.user_id;
          this.router.navigate(['register-confirm']);
          this.toastController.dismiss();
          KEY.key = "";
          KEY.keymobile = "";
        }, error => {
          KEY.key = "";
          KEY.keymobile = "";
          
          this.toastController.dismiss();
          this.router.navigate(['login']);
          if (error.error.message == 'User not found') {
            this.notFound('bottom');
          } else if (error.error.message == 'Invalid token') {
            this.keyToast('bottom');
          } else {
            this.requestToast('bottom');
          }
        })
    });
  }

  async forgetPass(email) {

    let postData = {};

    this.presentLoading((data) => {

      this.getHeader(),

        postData = {
          email: email
        },

        this.http.put(SERVER_URL + "/customer/login", postData).subscribe(data => {
          
          this.toastController.dismiss();
          this.presentToast('bottom');
        }, error => {
          if (error.error.message == 'User not found') {
            this.notFound('bottom');
          } else {
            this.requestToast('bottom');
          }
          
          this.toastController.dismiss();
        })
    });
  }

  async changeLang(locale) {
    let postData = {};

    this.presentLoading((data) => {

      this.getHeader(),

        postData = {
          locale: locale
        },

        this.http.put(SERVER_URL + "/customer/users", postData, this.httpOptions).subscribe(data => {
          
          this.data = data;
          this.toastController.dismiss();
        }, error => {
          
          this.toastController.dismiss();
        })
    });
  }


  async refreshTokenReload(j) {
    this.storage.get('refresh_token').then((val2) => {
    })
  }

  notification() {
    this.notificationService.startListenerNotification();

    this.storage.get('ticket').then((val) => {
      BADGE.new_ticket = val;
    })

    this.storage.get('service').then((val) => {
      BADGE.new_service = val;
    })

    this.storage.get('solicitation').then((val) => {
      BADGE.new_solicitation = val;
    })

    this.storage.get('equipment').then((val) => {
      BADGE.new_equipments = val;
    })
  }

  async refreshToken(j) {

    this.presentLoading((data) => {


      this.storage.get('language').then((val) => {
        this.storage.get('refresh_token').then((val2) => {
          if (val != null && val2 != null) {
            LANGUAGE.locale = val;
            this.translate.use(val);

            const httpOptions = {
              headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + val2,
              })
            };

            this.http.post(SERVER_URL + "/customer/token/refresh", null, httpOptions).subscribe(data => {
              
              this.data.response;
              this.data = data;
              j(data);
              TOKEN.access_token = this.data.access_token;
              if (this.platform.is('mobile')) {
                this.getToken();
              } else {
              }
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
                  this.router.navigate(['home-vmi']);
                  this.notification();
                  this.toastController.dismiss();
                } if (val3 == 'home-distributors') {
                  ROLE.role = "distributor";
                  this.router.navigate(['home-distributors']);
                  this.notification();
                  this.toastController.dismiss();
                } if (val3 == 'home-technician') {
                  ROLE.role = "tech";
                  this.router.navigate(['ticket']);
                  this.notification();
                  this.toastController.dismiss();
                } if (val3 == 'home-client') {
                  ROLE.role = "client";
                  this.router.navigate(['ticket']);
                  this.notification();
                  this.toastController.dismiss();
                }
              });
            }, error => {
              
              this.router.navigate(['login']);
              this.notification();
              this.toastController.dismiss();
            });
          } else if (val != null && val2 == null) {
            LANGUAGE.locale = val;
            this.translate.use(val);
            this.router.navigate(['login']);
            this.notification();
            this.toastController.dismiss();
            j(val);
          } else if (val == null && val2 == null) {
            LANGUAGE.locale = 'pt';
            this.router.navigate(['home']);
            this.translate.use('pt');
            this.notification();
            this.toastController.dismiss();
            j(val);
          }
        });
      })
    });
  }

  async getToken() {

    this.firebase.getToken()
      .then(token => {
        this.sendToken(token);
        // this.iniciarListenerDeNotificacoes();
      }) // save the token server-side and use it to push notifications to this device
      .catch(error => {
        console.error('Error getting token', error)
      });

  }


  async sendToken(token) {

    this.getHeader();

    let postData = {

      token: token,
      device: "android"
    }

    this.http.post(SERVER_URL + "/customer/registration", postData, this.httpOptions).subscribe(data => {
    }, error => {


    });

    // this.presentLoading((data) => {

    // });

  }

  async getLocation(type, j) {

    this.presentLoading((data) => {

      this.getHeader();

      this.data = this.http.get(SERVER_URL + "/customer/user/location/" + type, this.httpOptions);
      this.data.subscribe(data => {
        j(data);
        this.toastController.dismiss();
      }, error => {
        
        this.toastController.dismiss();
        if (error.error.msg == "Token has expired") {
          this.refreshToken((j) => {
            
          });
          this.inativeToast('bottom');
        } else {

        }
      })

    });

  }

  async getAllCountries(j) {
    this.presentLoading((data) => {

      this.getHeader();

      this.data = this.http.get("https://restcountries.eu/rest/v2/all");
      this.data.subscribe(data => {
        
        j(data);
        this.toastController.dismiss();
      }, error => {
        
        this.toastController.dismiss();
        if (error.error.msg == "Token has expired") {
          this.refreshToken((j) => {
            
          });
          this.inativeToast('bottom');
        } else {

        }
      })

    });
  }

  async getAllRegion(country, j) {
    this.presentLoading((data) => {

      this.getHeader();

      this.data = this.http.get("http://192.168.0.185:8080/battuta.medunes.net/api/region/" + country + "/all/?key=1734cd94009f862b8fc5ea9f12c4ab5e");
      this.data.subscribe(data => {
        
        j(data);
        this.toastController.dismiss();
      }, error => {
        
        this.toastController.dismiss();
        if (error.error.msg == "Token has expired") {
          this.refreshToken((j) => {
            
          });
          this.inativeToast('bottom');
        } else {

        }
      })

    });
  }

  async getAllCity(region, country, j) {
    this.presentLoading((data) => {
      this.getHeader();

      this.data = this.http.get("http://192.168.0.185:8080/battuta.medunes.net/api/city/" + country + "/search/?region=" + region + "&key=1734cd94009f862b8fc5ea9f12c4ab5e");
      this.data.subscribe(data => {
        
        j(data);
        this.toastController.dismiss();
      }, error => {
        
        this.toastController.dismiss();
        if (error.error.msg == "Token has expired") {
          this.refreshToken((j) => {
            
          });
          this.inativeToast('bottom');
        } else {

        }
      })

    });
  }

  async qrAuth(computer, mcb, keyboard, serial) {
    let postData = {};

    this.presentLoading((data) => {

      this.getHeader(),

        postData = {
          serial_number: serial,
          mcb_mac_address: mcb,
          computer_mac_address: computer,
          keyboard_mac_address: keyboard
        },

        this.http.post(SERVER_URL + "/customer/equipment/management", postData, this.httpOptions).subscribe(data => {
          
          this.foundEquip('bottom');
          this.data = data;
          this.toastController.dismiss();
        }, error => {
          if (error.error.message == "VMI code already exists. Contact the admin") {

          }
          if (error.error.message.includes('not found')) {
            this.notFoundEquip('bottom');
          } else {
            this.requestToast('bottom');
          }
          this.toastController.dismiss();
        })
    });
  }

  async pieceQr(id, pieces, serial) {
    let postData = {};

    this.presentLoading((data) => {

      this.getHeader(),

        postData = {
          serial_number: serial,
          service_order_id: id,
          equipment_piece_list: pieces
        },


      this.http.post(SERVER_URL + "/customer/equipment/management", postData, this.httpOptions).subscribe(data => {
        
        this.foundEquip('bottom');
        this.data = data;
        this.toastController.dismiss();
      }, error => {
        if (error.error.message == "VMI code already exists. Contact the admin") {
          this.vmiExistsToast('bottom')
        }
        else if (error.error.message.includes('not found')) {
          this.notFoundEquip('bottom');
        } else {
          this.requestToast('bottom');
        }
        this.toastController.dismiss();
      })
    });
  }

  async warrantyEquip(request_id, state, serial, auth_code, warrantytype, warrantytime, maintenancetype, maintenancetime, j) {
    let postData = {};

    this.presentLoading((data) => {

      this.getHeader(),

        postData = {
          request_id: request_id,
          state: state,
          serial_number: serial,
          auth_code: auth_code,
          warranty_type: warrantytype,
          warranty_time: warrantytime,
          maintenance_type: maintenancetype,
          maintenance_time: maintenancetime
        },


      this.http.put(SERVER_URL + "/customer/equipment/management", postData, this.httpOptions).subscribe(data => {
        
        this.completeToast('bottom');
        this.data = data;
        j(data);
        this.toastController.dismiss();
      }, error => {
        
        if (error.error.message.includes('not found')) {
          this.notFoundEquip('bottom');
        } else {
          this.requestToast('bottom');
        }
        this.toastController.dismiss();
        j(error);
      })
    });
  }

  async acceptRequest(id, serial, auth_code, state, j) {
    let postData = {};

    this.presentLoading((data) => {

      this.getHeader(),

        postData = {
          request_id: id,
          serial_number: serial,
          auth_code: auth_code,
          state: state
        },

      this.http.put(SERVER_URL + "/customer/equipment/management", postData, this.httpOptions).subscribe(data => {
        
        this.completeToast('bottom');
        this.data = data;
        j(data);
        this.toastController.dismiss();
      }, error => {
        

        if (error.error.message.includes('not found')) {
          this.notFoundEquip('bottom');
        } else {
          this.requestToast('bottom');
        }
        this.toastController.dismiss();
        j(error);
      })
    });
  }

  async approveRequest(id, serial, state, j) {
    let postData = {};

    this.presentLoading((data) => {

      this.getHeader(),

        postData = {
          request_id: id,
          serial_number: serial,
          state: state
        },

      this.http.put(SERVER_URL + "/customer/equipment/management", postData, this.httpOptions).subscribe(data => {
        
        this.foundEquip('bottom');
        this.data = data;
        j(data);
        this.toastController.dismiss();
      }, error => {
        

        if (error.error.message.includes('not found')) {
          this.notFoundEquip('bottom');
        } else {
          this.requestToast('bottom');
        }
        this.toastController.dismiss();
        j(error);
      })
    });
  }

  async getTimeline(keywords, page, per_page, j) {
    this.presentLoading((data) => {

      var root = "";

      this.getHeader();

      root = "/customer/timeline?page=" + page + "&per_page=" + per_page

      if (keywords) {
        for (var i = 0; i < keywords.length; i++) {
          root = root.concat("&keywords=" + keywords[i]);
        }
      }

      this.data = this.http.get(SERVER_URL + root, this.httpOptions);
      this.data.subscribe(data => {
        
        j(data);
        this.toastController.dismiss();
      }, error => {
        
        this.toastController.dismiss();
        if (error.error.msg == "Token has expired") {
          this.refreshToken((j) => {
            
          });
          this.inativeToast('bottom');
        } else {

        }
      })

    });
  }


  async createTimelinePost(title, description, keywords, formData) {

    var root = "";
    

    this.presentLoading((data) => {

      this.getHeader(),

        this.i = 0,
        this.resultTroubleshooting = [],
        root = "/customer/timeline?title=" + title + "&content=" + description
      var numberpages = [];
      if (keywords != "") {
        for (var i = 0; i < keywords.length; i++) {
          root = root.concat("&keywords=" + keywords[i]);
        }
      }
      this.http.post(SERVER_URL + root, formData, this.httpOptions).subscribe(data => {
        this.completeToast('bottom');
        this.router.navigate(['timeline']);
        this.toastController.dismiss();
      }, error => {
        
        this.toastController.dismiss();
        if (error.error.msg == "Token has expired") {
          this.refreshToken((j) => {
            
          });
          this.inativeToast('bottom');
        } else {
          this.requestToast('bottom');
        }
      })

    });

  }

  async getUserReport(type, all, role, city, region, country) {

    this.presentLoading((data) => {

      this.getHeader();

      var root = "/customer/report/user?type=" + type

      if (all != "") {
        root = root.concat("&all=" + all);
      } if (role != "") {
        root = root.concat("&role=" + role);
      } if (city != "") {
        root = root.concat("&city=" + city);
      } if (region != "") {
        root = root.concat("&region=" + region);
      } if (country != "") {
        root = root.concat("&country=" + country);
      }


      this.http.get(SERVER_URL + root, this.httpOptionsImage).subscribe(data => {
        var fileURL = URL.createObjectURL(data);
        var b: any = data;
        if (this.platform.is("mobile")) {
          var name = ''
          if (type == 'xlsx') {
            name = '.xlsx'
          }
          this.file.writeFile(this.file.dataDirectory, "teste" + name, data, { replace: true }).then((fileEntry: FileEntry) => {
            this.fileOpener.open(fileEntry.toURL(), b.type)
              .then(() => console.log('File is opened'))
              .catch(err => console.error('Error openening file: ' + err));
          })
            .catch((err) => {
              console.error("Error creating file: " + err);
              throw err;  //Rethrow - will be caught by caller
            });
        } else {
          if (type == 'xlsx') {
            this.saveFile(data, 'users.xlsx')
          } else {
            window.open(fileURL, '_blank');
          }

        }
        this.toastController.dismiss();
      }, error => {
        
        if (error.error.msg == "Token has expired") {
          this.refreshToken((j) => {
            
          });
          this.inativeToast('bottom');
        }
        this.toastController.dismiss();
      });
    });
  }


  async getEquipReport(type, model, company_id, city, region, country) {

    this.presentLoading((data) => {

      this.getHeader();

      var root = "/customer/report/equipment?type=" + type

      if (model != "") {
        root = root.concat("&model=" + model);
      } if (company_id != "") {
        root = root.concat("&company_id=" + company_id);
      } if (city != "") {
        root = root.concat("&city=" + city);
      } if (region != "") {
        root = root.concat("&region=" + region);
      } if (country != "") {
        root = root.concat("&country=" + country);
      }

      

      this.http.get(SERVER_URL + root, this.httpOptionsImage).subscribe(data => {
        var fileURL = URL.createObjectURL(data);
        
        var b: any = data;
        if (this.platform.is("mobile")) {
          var name = ''
          if (type == 'xlsx') {
            name = '.xlsx'
          }
          this.file.writeFile(this.file.dataDirectory, "teste" + name, data, { replace: true }).then((fileEntry: FileEntry) => {
            this.fileOpener.open(fileEntry.toURL(), b.type)
              .then(() => console.log('File is opened'))
              .catch(err => console.error('Error openening file: ' + err));
          })
            .catch((err) => {
              console.error("Error creating file: " + err);
              throw err;  //Rethrow - will be caught by caller
            });
        } else {
          if (type == 'xlsx') {
            this.saveFile(data, 'equipment.xlsx')
          } else {
            window.open(fileURL, '_blank');
          }

        }
        this.toastController.dismiss();
      }, error => {
        
        if (error.error.msg == "Token has expired") {
          this.refreshToken((j) => {
            
          });
          this.inativeToast('bottom');
        }
        this.toastController.dismiss();
      });
    });
  }

  async getWarrantyReport(type, model, company_id, city, region, country, initialdate, enddate) {

    this.presentLoading((data) => {

      this.getHeader();

      var root = "/customer/report/warranty?type=" + type

      if (model != "") {
        root = root.concat("&model=" + model);
      } if (company_id != "") {
        root = root.concat("&company_id=" + company_id);
      } if (city != "") {
        root = root.concat("&city=" + city);
      } if (region != "") {
        root = root.concat("&region=" + region);
      } if (country != "") {
        root = root.concat("&country=" + country);
      } if (initialdate != "") {
        root = root.concat("&start=" + initialdate);
      } if (enddate != "") {
        root = root.concat("&end=" + enddate);
      }

      this.http.get(SERVER_URL + root, this.httpOptionsImage).subscribe(data => {
        
        var fileURL = URL.createObjectURL(data);
        var b: any = data;
        if (this.platform.is("mobile")) {
          var name = ''
          if (type == 'xlsx') {
            name = '.xlsx'
          }

          this.file.writeFile(this.file.dataDirectory, "teste" + name, data, { replace: true }).then((fileEntry: FileEntry) => {
            this.fileOpener.open(fileEntry.toURL(), b.type)
              .then(() => console.log('File is opened'))
              .catch(err => console.error('Error openening file: ' + err));
          })
            .catch((err) => {
              console.error("Error creating file: " + err);
              throw err;  //Rethrow - will be caught by caller
            });
        } else {
          if (type == 'xlsx') {
            this.saveFile(data, 'warranty.xlsx')
          } else {
            window.open(fileURL, '_blank');
          }

        }
        this.toastController.dismiss();
      }, error => {
        
        if (error.error.msg == "Token has expired") {
          this.refreshToken((j) => {
            
          });
          this.inativeToast('bottom');
        }
        this.toastController.dismiss();
      });
    });
  }

  async getIndexReport(report_type, type, model, technician,start,end, j) {

    this.presentLoading((data) => {

      var message = "";
      this.translate.get('DAYS').subscribe((res: string) => {
        message = res;
      });

      this.getHeader();

      var root = "/customer/report/index?report_type=" + report_type


      if (type == "ticket") {
        root = root.concat("&ticket=" + true);
      } if (type == "service_order") {
        root = root.concat("&service_order=" + true);
      } if (model != "") {
        root = root.concat("&model=" + model);
      } if (technician != "") {
        root = root.concat("&user_id=" + technician);
      } if (start != "") {
        root = root.concat("&start=" + start);
      } if (end != "") {
        root = root.concat("&end=" + end);
      }


      this.http.get(SERVER_URL + root, this.httpOptions).subscribe(data => {
        
        if (report_type == 'mttr' ) {

          if (data[0].days == null) {
            this.reportAlert('0')
          } else {
            this.reportAlert(data[0].days + ' ' + message)
          }
        } else if (report_type == 'client_maintenance' || report_type == 'stats_order') {
          this.reportAlert(data[0].count)
        } else if (report_type == 'mtbf') {
          this.reportAlert(data + ' ' + message )
        }

        j(data);

        this.toastController.dismiss();
      }, error => {
        
        if (error.error.msg == "Token has expired") {
          this.refreshToken((j) => {
            
          });
          this.inativeToast('bottom');
        }
        j(error);
        this.toastController.dismiss();
      });
    });
  }


}  
