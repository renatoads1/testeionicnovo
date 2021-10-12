import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ActionSheetController, Events, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { HttpService } from '../../http.service';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { IMAGE, ROLE } from 'src/environments/environment';
import { MenuController } from '@ionic/angular';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';


@Component({
  selector: 'app-service',
  templateUrl: './service.page.html',
  styleUrls: ['./service.page.scss'],
})
export class ServicePage implements OnInit {
  scannedCode = null;

  fileField: any;
  fileChoose: any;
  fileChoose_name: any;

  // @ViewChild(TicketMultiFileUploadComponent) fileField: TicketMultiFileUploadComponent;
  @ViewChild('content') private content: any;
  @ViewChild('chat_input') messageInput: ElementRef;
  technician_id: any;
  inp_text: any;
  showEmojiPicker = false;
  msgList = [];
  public count = 0;
  numChat: any;

  chat: any;

  chatmessage = {
    title_client: "",
    title_technician: "",
  }

  sign: any;
  signature: any;
  public ionpage: any;

  i: any;
  id: any;
  thumb: any;
  serviceselect: any;

  hideMe: any;
  hideMe3: any;
  rating: any;
  segment: any;

  public items: any = [];

  role: any;
  rate: any;
  ticketid: any;
  pieces: any;

  piece: any;
  task: any;
  tasks: any;
  amount: any;
  starttime: any;
  endtime: any;
  attachments: any;
  status: any;

  equipmentId: any;
  orderId: any;

  services: any;

  page: any;
  pageselected: any;

  listseepieces = {
    name: "",
    amount: ""
  };
  listseetasks = {
    title: ""
  };
  listallpieces = [];
  listalltasks = [];
  listofpieces = [];
  listoftasks = [];

  piecesListen = {};
  tasksListen = {};
  times = {};
  time_worked = "";

  files = [];

  note: any;
  tasknote: any;

  constructor(
    private imagePicker: ImagePicker,
    private menu: MenuController,
    private router: Router,
    private translate: TranslateService,
    public orderService: HttpService,
    private storage: Storage,
    public alertController: AlertController,
    private events: Events,
    private file: File,
    private actionSheetController: ActionSheetController,
    private mediaCapture: MediaCapture,
    private platform: Platform,
    private barcodeScanner: BarcodeScanner,
  ) {

    this.items = [
      { expanded: false },
      { expanded: false },
      { expanded: false }
    ];
  }



  async scroll(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => this.scrollToBottomOnInit());
  }

  scanCode(id,serial) {
    this.barcodeScanner.scan().then(
      barcodeData => {
        
        this.scannedCode = barcodeData.text;
        this.scannedCode = JSON.parse(this.scannedCode);
        if (this.scannedCode.equipment_piece_list && id && serial ) {
          this.qrAuth(this.scannedCode.equipment_piece_list, id, serial);
        }
      }
    )
  }

  async qrAuth(pieces, id, serial) {

    var header = "";
    var message = "";
    var cancel = "";
    this.translate.get('AUTH').subscribe((res: string) => {
      header = res;
    });
    this.translate.get('QRAUTH').subscribe((res: string) => {
      message = res;
    });
    this.translate.get('CANCEL').subscribe((res: string) => {
      cancel = res;
    });

    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [
        {
          text: cancel,
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Ok',
          handler: () => {
            this.orderService.pieceQr(id,pieces,serial);
          }
        }
      ]
    });
    await alert.present();
  }

  doRefresh(event) {

    setTimeout(() => {
      event.target.complete();
    }, 100);
  }

  sendMsg() {
    this.scrollToBottomOnInit();
  }

  notificationUpdate(id_chat) {

    this.storage.get('update_chat').then((value) => {
      if (value == true) {
        this.orderService.getChat(id_chat, (numberpage) => {
          this.msgList = this.orderService.resultChat,
            this.scroll(300);
        });
        this.storage.set('update_chat', false);
      }
    });

  }

  scrollToBottomOnInit() {
    this.content.scrollToBottom(300);
  }

  getChatDesc(tech_name, tech_id, client_name, id_chat) {
    this.closeChat();
    this.msgList = [];
    this.tasknote = "";
    this.technician_id = tech_id;
    this.chatmessage.title_client = tech_name;
    this.chatmessage.title_technician = client_name;
    this.numChat = id_chat;

    this.orderService.getChat(id_chat, (numberpage) => {
      this.msgList = this.orderService.resultChat,
        this.scroll(300);
    });

    this.id = setInterval(() => {
      this.notificationUpdate(id_chat)
    }, 5000);


  }

  sendChat(id_chat, message, files, file_name) {

    let formData = new FormData();

    if (files != "" && files != null && files != undefined) {
      formData.append('attachments', files, file_name);
      if (message == '' || message == null || message == undefined) {
        message = "  "
      }
    }

    if (message == "" || message == null || message == undefined) {
      return false;
    } else {
      this.orderService.sendMsgChat(id_chat, message, formData, (data) => {
        this.inp_text = "";
        this.orderService.getChat(id_chat, (numberpage) => {
          this.msgList = this.orderService.resultChat,
            this.scroll(300);
        });
      });
    }
  }

  closeChat() {
    if (this.chat == false) {
      this.chat = true;
    } else {
      clearInterval(this.id);
      this.chat = false;
    }
  }

  expandItem(item): void {
    if (item.expanded) {
      item.expanded = false;
    } else {
      this.items.map(listItem => {
        if (item == listItem) {
          listItem.expanded = !listItem.expanded;
        } else {
          listItem.expanded = false;
        }
        return listItem;
      });
    }
  }

  async presentFinalize(id) {

    var header = "";
    var message = "";
    var cancel = "";
    this.translate.get('FINISH').subscribe((res: string) => {
      header = res;
    });
    this.translate.get('SIGN').subscribe((res: string) => {
      message = res;
    });
    this.translate.get('CANCEL').subscribe((res: string) => {
      cancel = res;
    });

    const alert = await this.alertController.create({
      header: header,
      inputs: [
        {
          name: 'sign',
          type: 'text',
          placeholder: message
        }
      ],
      buttons: [
        {
          text: cancel,
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            this.endOrder(id, data.sign)
          }
        }
      ]
    });

    await alert.present();
  }

  close() {
    if (this.hideMe == false) {
      this.hideMe = true;
    } else {
      this.hideMe = false;
    }
  }

  ionViewWillEnter() {
    
    this.services = [];
    this.hideMe = false;
    this.hideMe3 = false;
    this.rating = false;
    this.sign = false;
    this.chat = false;
    this.storage.get('role').then((val3) => {
      if (val3 == 'home-vmi') {
        ROLE.role = "admin";
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
    this.listallpieces = [];
    this.piecesListen = {};
    this.listofpieces = [];
    this.listalltasks = [];
    this.tasksListen = {};
    this.listoftasks = [];
    this.times = {};
    this.time_worked = "";
    this.fileChoose = "";
    this.fileChoose_name = "";
    this.note = "";
    this.tasknote = "";
    if (this.platform.is('mobile')){
      this.loadFiles();
    }
  }

  loadFiles() {
    this.file.createDir(this.file.dataDirectory, 'vmi', true);
    this.file.listDir(this.file.dataDirectory, 'vmi').then(
      res => {
      },
      err => console.log('error loading files: ', err)
    );
  }

  uploadFiles(id_chat) {
    this.file.listDir(this.file.dataDirectory, 'vmi').then(
      res => {

        this.file.resolveLocalFilesystemUrl(res[res.length - 1].nativeURL)
          .then(entry => {
            (<FileEntry>entry).file(file => this.readFile(file, id_chat))
          })
          .catch(err => {
          });
      },
      err => console.log('error loading files: ', err)
    );
  }

  readFile(file: any, id_chat) {

    const reader = new FileReader();
    reader.onload = () => {
      const imgBlob = new Blob([reader.result], {
        type: file.type
      });
      this.fileChoose = imgBlob;
      this.fileChoose_name = file.name;
      // this.sendChat(id_chat,this.inp_text,imgBlob,file.name);
    };
    reader.readAsArrayBuffer(file);
  }

  async selectMedia(numChat) {
    var header = "";
    var image = "";
    var audio = "";
    var video = "";
    var media = ""
    var cancel = "";
    this.translate.get('MEDIA').subscribe((res: string) => {
      header = res;
    });
    this.translate.get('MEDIAAUDIO').subscribe((res: string) => {
      audio = res;
    });
    this.translate.get('MEDIAVIDEO').subscribe((res: string) => {
      video = res;
    });
    this.translate.get('MEDIAIMAGE').subscribe((res: string) => {
      image = res;
    });
    this.translate.get('SELECTMEDIA').subscribe((res: string) => {
      media = res;
    });
    this.translate.get('CANCEL').subscribe((res: string) => {
      cancel = res;
    });
    const actionSheet = await this.actionSheetController.create({
      header: header,
      buttons: [
        {
          text: image,
          handler: () => {
            this.captureImage(numChat);
          }
        },
        {
          text: video,
          handler: () => {
            this.captureVideo(numChat);
          }
        },
        {
          text: audio,
          handler: () => {
            this.captureAudio(numChat);
          }
        },
        {
          text: media,
          handler: () => {
            this.openGalery(numChat);
          }
        },
        {
          text: cancel,
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  async captureImage(numChat) {
    let options: CaptureImageOptions = { limit: 1 }
    this.mediaCapture.captureImage(options)
      .then(
        (data: MediaFile[]) =>
          this.copyFileToLocalDir(data[0].fullPath, numChat),
        (err: CaptureError) => console.error(err)
      );
  }

  async captureVideo(numChat) {
    let options: CaptureImageOptions = { limit: 1 }
    this.mediaCapture.captureVideo(options)
      .then(
        (data: MediaFile[]) =>
          this.copyFileToLocalDir(data[0].fullPath, numChat),
        (err: CaptureError) => console.error(err)
      );
  }

  async captureAudio(numChat) {
    let options: CaptureImageOptions = { limit: 1 }
    this.mediaCapture.captureAudio(options)
      .then(
        (data: MediaFile[]) =>
          this.copyFileToLocalDir(data[0].fullPath, numChat),
        (err: CaptureError) => console.error(err)
      );
  }

  async openGalery(numChat) {
    this.imagePicker.getPictures({}).then(
      data => {
        for (var i = 0; i < data.length; i++) {
          this.copyFileToLocalDir(data[0], numChat);
        }
      }
    );
  }

  copyFileToLocalDir(fullPath, id_chat) {
    let myPath = fullPath;
    // Make sure we copy from the right location
    if (fullPath.indexOf('file://') < 0) {
      myPath = 'file://' + fullPath;
    }

    const ext = myPath.split('.').pop();
    const d = Date.now();
    const newName = `${d}.${ext}`;

    const name = myPath.substr(myPath.lastIndexOf('/') + 1);
    const copyFrom = myPath.substr(0, myPath.lastIndexOf('/') + 1);
    const copyTo = this.file.dataDirectory + 'vmi';

    this.file.copyFile(copyFrom.replace('%20', ' '), name.replace('%20', ' '), copyTo, newName).then(
      success => {
        this.uploadFiles(id_chat);
      },
      error => {
      }
    );
  }


  ionViewDidLeave() {
    this.menu.close();
    this.rating = false;
    this.hideMe3 = false;
    this.chat = false;
    this.events.unsubscribe('chat:received');
  }

  openAdd() {
    this.router.navigate(['service-add']);
  }

  redeemSign() {
    this.orderService.redeemSign((data) => {
      this.signature = this.orderService.resultSign
    });
    this.ionpage = 'ionpager';
  }

  closeSignature() {
    if (this.sign == false) {
      this.sign = true;
    } else {
      this.sign = false;
    }
  }

  deleteTask(index) {


    this.listalltasks.splice(index, 1);
    this.listoftasks.splice(index,1);
    if (this.listoftasks){
      if (this.listoftasks.length == 0){
        this.listoftasks.push(-1);
      }
    }
  }

  deletePiece(index) {

    this.listallpieces.splice(index, 1);
    this.listofpieces.splice(index,1);
    if (this.listofpieces){
      if (this.listofpieces.length == 0){
        this.listofpieces.push("[" + -1 + "," + -1 + "]");
      }
    }  

  }


  removeclass() {
    if (this.ionpage == 'ionpager') {
      this.ionpage = '';
    }
  }

  getServiceCorrective(page) {
    this.pageselected = page;
    this.orderService.getService(false,"corrective", page, "10", (numberpage) => {
      this.page = numberpage,
        this.services = this.orderService.resultService
    });

  }

  getServiceMaintenance(page) {
    this.pageselected = page;
    this.orderService.getService(false,"maintenance", page, "10", (numberpage) => {
      this.page = numberpage,
        this.services = this.orderService.resultService
    });
  }

  getServiceInstallation(page) {
    this.pageselected = page;
    this.orderService.getService(false,"installation", page, "10", (numberpage) => {
      this.page = numberpage,
        this.services = this.orderService.resultService
    });
  }

  getData(page) {
    if (this.segment == "corrective") {
      this.getServiceCorrective(page);
    } else if (this.segment == "maintenance") {
      this.getServiceMaintenance(page);
    } else if (this.segment == "installation") {
      this.getServiceInstallation(page);
    }
  }

  getPiece() {
    this.orderService.getPieces("1", "1000", (numberpage) => {
      this.page = numberpage,
        this.pieces = this.orderService.resultPiece
    });
  }

  getTask() {
    this.orderService.getTask("1", "1000", (numberpage) => {
      this.page = numberpage,
        this.tasks = this.orderService.resultTask
    });
  }

  openImage(id, full, type) {
    this.orderService.getAttatchment(id, true, type, (data) => {
    });
  }

  async showThumbs(attachments, full, service) {
    IMAGE.thumbs = [];
    this.i = 0;
    this.thumb = [];
    this.serviceselect = service;
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
      } if (attachments[idx].ext == "AUD") {
        IMAGE.thumbs.push("url('data:image/png;base64,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')");
        this.thumb = IMAGE.thumbs
      }
    });
  }

  TicketDesc(note, orderId, equipment_id, pieces, tasks, schedule, time_worked, status) {
    this.listallpieces = [];
    this.piecesListen = {};
    this.listofpieces = [];
    this.listalltasks = [];
    this.tasksListen = {};
    this.listoftasks = [];
    this.times = {};
    this.note = "";
    this.task = "";
    this.piece = "";
    this.amount = "";
    this.starttime = "";
    this.endtime = "";
    this.time_worked = "";
    this.status = "";
    if (pieces){
      for (var i =0; i < pieces.length ; i++){
        this.addPiece(pieces[i].piece.id + "," + pieces[i].piece.name,pieces[i].amount);
      }
    }
    if (tasks){
      for (var i =0; i < tasks.length ; i++){
        this.addTask(tasks[i].id + "," + tasks[i].title);
      }
    }
    this.tasknote = note;
    this.note = note;
    this.equipmentId = equipment_id
    this.orderId = orderId
    this.piecesListen = pieces;
    this.tasksListen = tasks;
    this.times = schedule;
    this.time_worked = time_worked;
    this.status = status;
    this.closeTicketDesc();
  }


  addPiece(piece, amount) {
    if (!piece || !amount) {
      return false;
    } else {

      var duplicate = false;

      var name = piece.split(",")[1];
      var id = piece.split(",")[0];

      for (var z = 0; z < this.listallpieces.length; z++) {
        this.listseepieces = {
          name: name,
          amount: amount
        };
        if (this.listallpieces[z].name == this.listseepieces.name) {
          duplicate = true;
        }
      }
      if (duplicate == false) {
        this.listallpieces.push({
          name: name,
          amount: amount
        });
        var str = "[" + id + "," + amount + "]";
        this.listofpieces.push(str);
      }
    }
  }

  notes() {
    if (this.tasknote) {
      this.orderService.serviceNote(this.orderId, this.tasknote, (numberpage) => {
        this.orderService.getService(false,this.segment, "1", "10", (numberpage) => {
          this.page = numberpage;
          if (this.segment == "corrective") {
            this.services = this.orderService.resultService;
          } else if (this.segment == "maintenance") {
            this.services = this.orderService.resultService;
          } else if (this.segment == "installation") {
            this.services = this.orderService.resultService;
          }
        });
      });
      this.closeTicketDesc();
    }
  }


  addTask(task) {

    if (!task) {
      return false;
    } else {
      var duplicate = false;

      var title = task.split(",")[1];
      var id = task.split(",")[0];

      for (var z = 0; z < this.listalltasks.length; z++) {
        this.listseetasks = {
          title: title
        };
        if (this.listalltasks[z].title == this.listseetasks.title) {
          duplicate = true;
        }
      }
      if (duplicate == false) {
        this.listalltasks.push({
          title: title
        });
        this.listoftasks.push(id);
      }
    }
  }

  SendPieces() {
    if (this.listofpieces) {
      this.orderService.servicePieces(this.orderId, this.listofpieces, (numberpage) => {
        this.orderService.getService(false,this.segment, "1", "10", (numberpage) => {
          this.page = numberpage;
          if (this.segment == "corrective") {
            this.services = this.orderService.resultService;
          } else if (this.segment == "maintenance") {
            this.services = this.orderService.resultService;
          } else if (this.segment == "installation") {
            this.services = this.orderService.resultService;
          }
        });
      });
      this.closeTicketDesc();
    }
  }

  SendTasks() {
    if (this.listoftasks) {
      this.orderService.serviceTasks(this.orderId, this.listoftasks, (numberpage) => {
        this.orderService.getService(false,this.segment, "1", "10", (numberpage) => {
          this.page = numberpage;
          if (this.segment == "corrective") {
            this.services = this.orderService.resultService;
          } else if (this.segment == "maintenance") {
            this.services = this.orderService.resultService;
          } else if (this.segment == "installation") {
            this.services = this.orderService.resultService;
          }
        });
      });
      this.closeTicketDesc();
    }
  }

  ngOnInit() {
    this.hideMe = false;
    this.hideMe3 = false;
    this.rating = false;
  }

  closeTicketDesc() {
    if (this.hideMe3 == false) {
      this.hideMe3 = true;
    } else {
      this.hideMe3 = false;
    }
  }

  closeTicketRating(id) {
    this.ticketid = id;
    if (this.rating == false) {
      this.rating = true;
    } else {
      this.rating = false;
    }
  }

  logRatingChange(rating) {
    this.rate = rating;
  }

  addTime() {
    this.orderService.serviceTime(this.orderId, this.starttime, this.endtime, (numberpage) => {
      this.orderService.getService(false,this.segment, "1", "10", (numberpage) => {
        this.page = numberpage;
        if (this.segment == "corrective") {
          this.services = this.orderService.resultService;
        } else if (this.segment == "maintenance") {
          this.services = this.orderService.resultService;
        } else if (this.segment == "installation") {
          this.services = this.orderService.resultService;
        }
      });
    });
    this.closeTicketDesc();
  }

  deleteTime(schedule_id) {
    this.orderService.deleteTime(this.orderId, schedule_id, (data) => {
      this.orderService.getService(false,this.segment, "1", "10", (numberpage) => {
        this.page = numberpage;
        if (this.segment == "corrective") {
          this.services = this.orderService.resultService;
        } else if (this.segment == "maintenance") {
          this.services = this.orderService.resultService;
        } else if (this.segment == "installation") {
          this.services = this.orderService.resultService;
        }
      });
    });
    this.closeTicketDesc();
  }

  endOrder(id, assign) {

    this.orderService.endOrder(id, assign, (data) => {
      this.orderService.getService(false,this.segment, "1", "10", (numberpage) => {
        this.page = numberpage;
        if (this.segment == "corrective") {
          this.services = this.orderService.resultService;
        } else if (this.segment == "maintenance") {
          this.services = this.orderService.resultService;
        } else if (this.segment == "installation") {
          this.services = this.orderService.resultService;
        }
      });
    });
  }

  rateTicket() {
    // this.orderService.rateTicket(this.ticketid,this.rate,(data) =>{
    //   this.orderService.getTicket("","","","","","1","10",(numberpage)=>{
    //     this.page = numberpage,
    //     this.calls = this.orderService.resultTicket
    //   });
    // });
    // if (this.rating == false ){
    //   this.rating = true;
    // }else{
    //   this.rating = false;
    // }

  }

  openSlide(slide) {
    slide.open("end");
  }

}
