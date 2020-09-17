import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MypointingPage } from './mypointing.page';

const routes: Routes = [
  {
    path: '',
    component: MypointingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MypointingPageRoutingModule {}
