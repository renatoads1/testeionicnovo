import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service'

@Component({
  selector: 'app-company',
  templateUrl: './company.page.html',
  styleUrls: ['./company.page.scss'],
})
export class CompanyPage implements OnInit {

  name: any;
  is_client: any;
  associate: any;
  page: any;
  resultCompany: any;

  constructor(
    public companyService: HttpService) { }

  ngOnInit() {
  }

  sendPostRequest() {
    if (this.name && this.is_client && this.associate) {
      this.companyService.createCompany(this.name, this.is_client, this.associate);
    }
  }

  async getCompany(page) {
    this.resultCompany = [];
    this.companyService.getCompany(page, "1000", (numberpage) => {
      this.page = numberpage,
        this.resultCompany = this.companyService.resultCompany
    });

  }

}
