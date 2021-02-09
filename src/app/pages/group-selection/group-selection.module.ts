import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroupSelectionPageRoutingModule } from './group-selection-routing.module';

import { GroupSelectionPage } from './group-selection.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GroupSelectionPageRoutingModule
  ],
  declarations: [GroupSelectionPage]
})
export class GroupSelectionPageModule {}
