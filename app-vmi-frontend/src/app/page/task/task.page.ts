import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { HttpService } from '../../http.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
})
export class TaskPage implements OnInit {

  result: any;
  page: any;
  pageselected: any;

  constructor(
    private menu: MenuController,
    private router: Router,
    public taskService: HttpService) { }

  ngOnInit() {
  }

  doRefresh(event) {

    setTimeout(() => {
      event.target.complete();
    }, 100);
  }

  getData(page) {
    this.taskService.getTask(page, "10", (numberpage) => {
      this.page = numberpage
      this.result = this.taskService.resultTask
    });

  }

  ionViewWillEnter() {
    this.result = [];
    this.pageselected = 1;
    this.getData("1");
    this.menu.enable(true, 'admin');
  }

  ionViewDidLeave() {
    this.menu.close();
  }

  openAdd(): void {
    this.router.navigate(['task-add']);
  }

  presentAlertDelete(id) {
    this.taskService.deleteTask(id, (data) => {
      this.taskService.getTask("1", "10", (numberpage) => {
        this.page = numberpage
        this.result = this.taskService.resultTask
      });
    });
  }

  openSlide(slide) {
    slide.open("end");
  }

}
