import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MurDetailPage } from './mur-detail';

@NgModule({
  declarations: [
    MurDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(MurDetailPage),
  ],
})
export class MurDetailPageModule {}
