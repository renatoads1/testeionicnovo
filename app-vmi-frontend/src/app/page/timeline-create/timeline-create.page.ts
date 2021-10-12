import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { HttpService } from '../../http.service';
import { File } from '@ionic-native/file/ngx';
import { TimelineMultiFileUploadComponent } from '../../components/timeline-multi-file-upload/timeline-multi-file-upload.component';
import { ROLE } from 'src/environments/environment';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-timeline-create',
  templateUrl: './timeline-create.page.html',
  styleUrls: ['./timeline-create.page.scss'],
})
export class TimelineCreatePage implements OnInit {

  @ViewChild(TimelineMultiFileUploadComponent) fileField: TimelineMultiFileUploadComponent;

  keyword: any;
  result: any;
  title: any;
  content: any;
  device: any;
  keywords = [];

  constructor(public timelineService: HttpService) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.keywords = [];
  }

  addKeyword(keyword) {
    if (keyword.includes(" ") == true) {
      this.keywords.push(keyword.split(" ")[0]);
      this.keyword = "";
    }
  }

  addKeywordOff(keyword) {
    if (keyword) {
      this.keywords.push(keyword.split(" ")[0]);
      this.keyword = "";
    }
  }

  removeKey(index) {
    this.keywords.splice(index, 1);
  }

  sendPostRequest(title, content) {

    let files = this.fileField.getFiles();

    let formData = new FormData();

    files.forEach((file) => {
      formData.append('attachments', file.rawFile);
    });

    if (title && content && this.keywords) {
      this.timelineService.createTimelinePost(title, content, this.keywords, formData);
    }
  }

}
