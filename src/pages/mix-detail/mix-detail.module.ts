import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MixDetailPage } from './mix-detail';

@NgModule({
  declarations: [
    MixDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(MixDetailPage),
  ],
})
export class MixDetailPageModule {}
