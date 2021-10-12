import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddTutorialPage } from './add-tutorial.page';
import { TranslateModule } from '@ngx-translate/core';
import { FileUploadModule } from 'ng2-file-upload';
import { TutorialMultiFileUploadComponent } from '../../components/tutorial-multi-file-upload/tutorial-multi-file-upload.component';


const routes: Routes = [
  {
    path: '',
    component: AddTutorialPage
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
  declarations: [AddTutorialPage, TutorialMultiFileUploadComponent]
})
export class AddTutorialPageModule { }
