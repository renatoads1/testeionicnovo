
import { Component } from '@angular/core';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';

@Component({
  selector: 'app-timeline-multi-file-upload',
  templateUrl: './timeline-multi-file-upload.component.html',
  styleUrls: ['./timeline-multi-file-upload.component.scss'],
})
export class TimelineMultiFileUploadComponent {

  attachments: any;

  public uploader: FileUploader = new FileUploader({});
  public hasBaseDropZoneOver: boolean = false;

  constructor() {

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

  clear(index) {
    this.uploader.queue.splice(index, 1);
  }

}
