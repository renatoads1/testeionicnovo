import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './page/home/home.module#HomePageModule' },
  { path: 'login', loadChildren: './page/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './page/register/register.module#RegisterPageModule' },
  { path: 'settings', loadChildren: './page/settings/settings.module#SettingsPageModule' },
  { path: 'home-vmi', loadChildren: './page/home-vmi/home-vmi.module#HomeVmiPageModule' },
  { path: 'troubleshoot-vmi', loadChildren: './page/troubleshoot-vmi/troubleshoot-vmi.module#TroubleshootVmiPageModule' },
  { path: 'troubleshoot-add', loadChildren: './page/troubleshoot-add/troubleshoot-add.module#TroubleshootAddPageModule' },
  { path: 'ticket-client-add', loadChildren: './page/ticket-client-add/ticket-client-add.module#TicketClientAddPageModule' },
  { path: 'tutorial-vmi', loadChildren: './page/tutorial-vmi/tutorial-vmi.module#TutorialVmiPageModule' },
  { path: 'reports-vmi', loadChildren: './page/reports-vmi/reports-vmi.module#ReportsVmiPageModule' },
  { path: 'add-tutorial', loadChildren: './page/add-tutorial/add-tutorial.module#AddTutorialPageModule' },
  { path: 'register-confirm', loadChildren: './page/register-confirm/register-confirm.module#RegisterConfirmPageModule' },
  { path: 'equipment-client', loadChildren: './page/equipment-client/equipment-client.module#EquipmentClientPageModule' },
  { path: 'equipment-client-add', loadChildren: './page/equipment-client-add/equipment-client-add.module#EquipmentClientAddPageModule' },
  { path: 'edit-user', loadChildren: './page/edit-user/edit-user.module#EditUserPageModule' },
  { path: 'piece', loadChildren: './page/piece/piece.module#PiecePageModule' },
  { path: 'piece-add', loadChildren: './page/piece-add/piece-add.module#PieceAddPageModule' },
  { path: 'service-add', loadChildren: './page/service-add/service-add.module#ServiceAddPageModule' },
  { path: 'equipment-vmi', loadChildren: './page/equipment-vmi/equipment-vmi.module#EquipmentVmiPageModule' },
  { path: 'equipment-vmi-add', loadChildren: './page/equipment-vmi-add/equipment-vmi-add.module#EquipmentVmiAddPageModule' },
  { path: 'reason-add', loadChildren: './page/reason-add/reason-add.module#ReasonAddPageModule' },
  { path: 'ticket', loadChildren: './page/ticket/ticket.module#TicketPageModule' },
  { path: 'service', loadChildren: './page/service/service.module#ServicePageModule' },
  { path: 'task', loadChildren: './page/task/task.module#TaskPageModule' },
  { path: 'task-add', loadChildren: './page/task-add/task-add.module#TaskAddPageModule' },
  { path: 'company', loadChildren: './page/company/company.module#CompanyPageModule' },
  { path: 'solicitation', loadChildren: './page/solicitation/solicitation.module#SolicitationPageModule' },
  { path: 'timeline-create', loadChildren: './page/timeline-create/timeline-create.module#TimelineCreatePageModule' },
  { path: 'timeline', loadChildren: './page/timeline/timeline.module#TimelinePageModule' }]
;

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
