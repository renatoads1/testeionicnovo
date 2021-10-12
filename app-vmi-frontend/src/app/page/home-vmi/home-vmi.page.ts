import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TIP } from 'src/environments/environment';
import { MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { HttpService } from '../../http.service';
import { Chart } from 'chart.js';



@Component({
  selector: 'app-home-vmi',
  templateUrl: './home-vmi.page.html',
  styleUrls: ['./home-vmi.page.scss'],
})
export class HomeVmiPage implements OnInit {
  @ViewChild("lineCanvas") lineCanvas: ElementRef;



  tips: any;
  tipenable: any;
  from: any;
  fromtitle: any;
  to: any;
  fromdate = [];
  opened = [];
  onhold = [];
  escalated = [];
  closed = [];

  private lineChart: Chart;


  constructor(
    private menu: MenuController,
    public homeService: HttpService,
    private storage: Storage,
    private translate: TranslateService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, { });
    this.menu.enable(true, 'admin');
    this.from = "2020-07-01";
    this.to = "2020-07-17";

    this.filter();
  }

  ionViewDidLeave() {
    this.menu.close();
  }

  tipConfirm() {
    if (this.tipenable == undefined || this.tipenable == false) {
      this.tips = false;
      TIP.tips = true;
    } else {
      this.tips = false;
      TIP.tips = false;
      this.storage.set('tips', false);
    }
  }

  formatDate(input) {
    var datePart = input.match(/\d+/g),
      year = datePart[0].substring(0),
      month = datePart[1], day = datePart[2];

    return day + '/' + month + '/' + year;
  }

  filter() {
    
    this.fromdate = [];
    this.opened = [];
    this.onhold = [];
    this.escalated = [];
    this.closed = [];
    var fromdate = this.formatDate(this.from);
    var fromto = this.formatDate(this.to);
    if (this.from < this.to) {
      this.homeService.getStats(fromdate, fromto, (fromtitle) => {
        for (var i = 0; i < fromtitle.length; i++) {
          this.fromdate.push(fromtitle[i].date);
          this.opened.push(fromtitle[i].n_open);
          this.onhold.push(fromtitle[i].n_on_hold);
          this.escalated.push(fromtitle[i].n_escalated);
          this.closed.push(fromtitle[i].n_closed);
        }
        this.fromtitle = fromtitle

        var open = "";
        var onhold = "";
        var escalated = "";
        var closed = "";

        this.translate.get('OPENED').subscribe((res: string) => {
          open = res;
        });
        this.translate.get('ONHOLD').subscribe((res: string) => {
          onhold = res;
        });
        this.translate.get('ESCALATED').subscribe((res: string) => {
          escalated = res;
        });
        this.translate.get('CLOSED').subscribe((res: string) => {
          closed = res;
        });

        this.lineChart = new Chart(this.lineCanvas.nativeElement, {
          type: "line",

          data: {
            labels: this.fromdate,
            datasets: [
              {
                label: open,
                fill: true,
                lineTension: 0.1,
                backgroundColor: "#EEBB00",
                borderColor: "#EEBB00",
                borderCapStyle: "butt",
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: "miter",
                pointBorderColor: "#EEBB00",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "#EEBB00",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: this.opened,
                spanGaps: false
              }, {
                label: onhold,
                fill: true,
                lineTension: 0.1,
                backgroundColor: "#373737",
                borderColor: "#373737",
                borderCapStyle: "butt",
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: "miter",
                pointBorderColor: "#373737",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "#373737",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: this.onhold,
                spanGaps: false
              }, {
                label: escalated,
                fill: true,
                lineTension: 0.1,
                backgroundColor: "#10dc60",
                borderColor: "#10dc60",
                borderCapStyle: "butt",
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: "miter",
                pointBorderColor: "#10dc60",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "#10dc60",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: this.escalated,
                spanGaps: false
              }, {
                label: closed,
                fill: true,
                lineTension: 0.1,
                backgroundColor: "#f04141",
                borderColor: "#f04141",
                borderCapStyle: "butt",
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: "miter",
                pointBorderColor: "#f04141",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "#f04141",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: this.closed,
                spanGaps: false
              }

            ]
          }
        });
      });
    }

  }

}
