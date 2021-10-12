import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ServiceAddPage } from './service-add.page';
import { TranslateModule } from '@ngx-translate/core';
import { FileUploadModule } from 'ng2-file-upload';
import { MultiFileUploadComponent } from '../../components/multi-file-upload/multi-file-upload.component';
import { IonicSelectableModule } from 'ionic-selectable';


const routes: Routes = [
  {
    path: '',
    component: ServiceAddPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    IonicModule,
    FileUploadModule,
    IonicSelectableModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ServiceAddPage, MultiFileUploadComponent]
})
export class ServiceAddPageModule { }
