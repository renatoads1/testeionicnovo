import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TimelineCreatePage } from './timeline-create.page';
import { TranslateModule } from '@ngx-translate/core';
import { FileUploadModule } from 'ng2-file-upload';
import { TimelineMultiFileUploadComponent } from '../../components/timeline-multi-file-upload/timeline-multi-file-upload.component';


const routes: Routes = [
  {
    path: '',
    component: TimelineCreatePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    FileUploadModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TimelineCreatePage, TimelineMultiFileUploadComponent]
})
export class TimelineCreatePageModule {}
