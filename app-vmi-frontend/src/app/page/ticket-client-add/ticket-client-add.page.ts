import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../../http.service';
import { TicketMultiFileUploadComponent } from '../../components/ticket-multi-file-upload/ticket-multi-file-upload.component';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';

@Component({
  selector: 'app-ticket-client-add',
  templateUrl: './ticket-client-add.page.html',
  styleUrls: ['./ticket-client-add.page.scss'],
})
export class TicketClientAddPage implements OnInit {

  result: any;
  isDisbled: boolean = true;
  device: any;
  description: any;
  title: any;
  public uploader: FileUploader = new FileUploader({});
  public hasBaseDropZoneOver: boolean = false;

  @ViewChild(TicketMultiFileUploadComponent) fileField: TicketMultiFileUploadComponent;

  constructor(
    public ticketService: HttpService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.ticketService.getEquipments(false,"", "accepted", "", 1, "1000", (t) => {
        this.result = this.ticketService.resultEquip;
    });

  }

  getFiles(): FileLikeObject[] {
    return this.uploader.queue.map((fileItem) => {
      return fileItem.file;
    });
  }

  fileOverBase(ev): void {
    this.hasBaseDropZoneOver = ev;
  }

  reorderFiles(reorderEvent: CustomEvent): void {
    let element = this.uploader.queue.splice(reorderEvent.detail.from, 1)[0];
    this.uploader.queue.splice(reorderEvent.detail.to, 0, element);
  }

  create() {
    let files = this.fileField.getFiles();

    let formData = new FormData();

    files.forEach((file) => {
      formData.append('attachments', file.rawFile);
    });
    if (this.title && this.device && this.description) {
      this.ticketService.createTicket(this.title, this.device, this.description, formData);
    }
  }


  select() {
    this.isDisbled = !this.isDisbled;
  }


}
