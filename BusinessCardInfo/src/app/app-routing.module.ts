import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBusinessCardComponent } from './add-business-card/add-business-card.component';
import { BusinessCardListComponent } from './business-card-list/business-card-list.component';
const routes: Routes = [
 {
  path:'create',
  component: AddBusinessCardComponent },
  { path: 'list',
     component: BusinessCardListComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
