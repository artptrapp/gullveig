import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { MenuManagerComponent } from 'src/app/components/menu-manager/menu-manager.component';
import { CharacterCardComponent } from 'src/app/components/character-card/character-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, MenuManagerComponent, CharacterCardComponent]
})
export class HomePageModule {}
