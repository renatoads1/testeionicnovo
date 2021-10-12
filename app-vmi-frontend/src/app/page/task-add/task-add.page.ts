import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../../http.service';


@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.page.html',
  styleUrls: ['./task-add.page.scss'],
})
export class TaskAddPage implements OnInit {

  title: any;
  description: any;

  constructor(
    public taskService: HttpService) { }

  ngOnInit() {
  }

  sendPostRequest(title, description) {
    if (title && description) {
      this.taskService.createTask(title, description);
    }
  }

}
