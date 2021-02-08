import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CharacterCreationPageRoutingModule } from './character-creation-routing.module';

import { CharacterCreationPage } from './character-creation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CharacterCreationPageRoutingModule
  ],
  declarations: [CharacterCreationPage]
})
export class CharacterCreationPageModule {}
