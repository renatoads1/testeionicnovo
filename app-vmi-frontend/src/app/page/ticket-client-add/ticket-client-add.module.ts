import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TicketClientAddPage } from './ticket-client-add.page';
import { TranslateModule } from '@ngx-translate/core';
import { FileUploadModule } from 'ng2-file-upload';
import { TicketMultiFileUploadComponent } from '../../components/ticket-multi-file-upload/ticket-multi-file-upload.component';


const routes: Routes = [
  {
    path: '',
    component: TicketClientAddPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    IonicModule,
    FileUploadModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TicketClientAddPage, TicketMultiFileUploadComponent]
})
export class TicketClientAddPageModule { }
