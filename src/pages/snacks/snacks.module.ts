import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SnacksPage } from './snacks';

@NgModule({
  declarations: [
    SnacksPage,
  ],
  imports: [
    IonicPageModule.forChild(SnacksPage),
  ],
})
export class SnacksPageModule {}
