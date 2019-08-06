import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OmmDetailPage } from './omm-detail';

@NgModule({
  declarations: [
    OmmDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(OmmDetailPage),
  ],
})
export class OmmDetailPageModule {}
