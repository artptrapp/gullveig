import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupSelectionPage } from './group-selection.page';

const routes: Routes = [
  {
    path: '',
    component: GroupSelectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupSelectionPageRoutingModule {}
