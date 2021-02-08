import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CharacterCreationPage } from './character-creation.page';

const routes: Routes = [
  {
    path: '',
    component: CharacterCreationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CharacterCreationPageRoutingModule {}
