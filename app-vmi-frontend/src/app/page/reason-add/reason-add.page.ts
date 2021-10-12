import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service'

@Component({
  selector: 'app-reason-add',
  templateUrl: './reason-add.page.html',
  styleUrls: ['./reason-add.page.scss'],
})
export class ReasonAddPage implements OnInit {

  model: any;

  constructor(
    public reasonService: HttpService) { }

  ngOnInit() {
  }

  sendPostRequest() {
    if (this.model) {
      this.reasonService.createReason(this.model);
    }
  }

}
