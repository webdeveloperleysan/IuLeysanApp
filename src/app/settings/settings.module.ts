import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SettingsComponent} from "./components/settings/settings.component";
import {RouterModule} from "@angular/router";
import {StoreModule} from "@ngrx/store";
import {reducers} from "src/app/settings/store/reducers";

const routes = [
  {
    path: 'settings',
    component: SettingsComponent
  }
]
@NgModule({
  imports:[
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('settings', reducers)
  ],
  declarations: [SettingsComponent]
})
export class SettingsModule{}
