import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ServicePage } from './service.page';
import { TranslateModule } from '@ngx-translate/core';
import { StarRatingModule } from 'ionic4-star-rating';
import { ExpandableComponent } from "../../components/expandable/expandable.component";


const routes: Routes = [
  {
    path: '',
    component: ServicePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    StarRatingModule,
    TranslateModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ServicePage, ExpandableComponent]
})
export class ServicePageModule { }
