import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KadDetailPage } from './kad-detail';

@NgModule({
  declarations: [
    KadDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(KadDetailPage),
  ],
})
export class KadDetailPageModule {}
