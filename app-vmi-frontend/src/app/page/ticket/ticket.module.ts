import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TicketPage } from './ticket.page';
import { TranslateModule } from '@ngx-translate/core';
import { StarRatingModule } from 'ionic4-star-rating';



const routes: Routes = [
  {
    path: '',
    component: TicketPage
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
  declarations: [TicketPage]
})
export class TicketPageModule { }
