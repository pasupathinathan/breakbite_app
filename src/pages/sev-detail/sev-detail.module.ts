import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SevDetailPage } from './sev-detail';

@NgModule({
  declarations: [
    SevDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(SevDetailPage),
  ],
})
export class SevDetailPageModule {}
