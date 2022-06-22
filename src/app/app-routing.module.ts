import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // when registering routes for root module - use forRoot
  exports: [RouterModule]
})
export class AppRoutingModule { }
