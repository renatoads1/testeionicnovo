import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';

@Component({
  selector: 'app-piece-add',
  templateUrl: './piece-add.page.html',
  styleUrls: ['./piece-add.page.scss'],
})
export class PieceAddPage implements OnInit {

  device: any;
  name: any;
  result: any;

  constructor(
    public pieceService: HttpService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {

  }

  sendPostRequest(name) {
    if (name) {
      this.pieceService.createPieces(name);
    }
  }

}
