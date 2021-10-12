import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditUserPage } from './edit-user.page';
import { TranslateModule } from '@ngx-translate/core';
import { SimpleMaskModule } from 'ngx-ion-simple-mask';
import { IonicSelectableModule } from 'ionic-selectable';

const routes: Routes = [
  {
    path: '',
    component: EditUserPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    IonicModule,
    SimpleMaskModule,
    IonicSelectableModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditUserPage]
})
export class EditUserPageModule { }
