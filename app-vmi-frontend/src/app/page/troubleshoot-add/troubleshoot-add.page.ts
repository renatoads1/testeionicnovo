import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';

@Component({
  selector: 'app-troubleshoot-add',
  templateUrl: './troubleshoot-add.page.html',
  styleUrls: ['./troubleshoot-add.page.scss'],
})
export class TroubleshootAddPage implements OnInit {

  keyword: any;
  result: any;
  title: any;
  content: any;
  device: any;
  keywords = [];

  constructor(
    public troubleshootService: HttpService) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.keywords = [];
    this.troubleshootService.getEquipmentsAdmin("1", "1000", (t) => {
        this.result = this.troubleshootService.resultEquipAdmin;
    });
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

  sendPostRequest(equip_id, title, content) {
    if (equip_id && title && content && this.keywords) {
      this.troubleshootService.createTroubleshoot(equip_id, this.keywords, title, content);
    }
  }
}
