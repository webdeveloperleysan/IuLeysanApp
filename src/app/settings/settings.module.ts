import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SettingsComponent} from "./components/settings/settings.component";
import {RouterModule} from "@angular/router";
import {StoreModule} from "@ngrx/store";
import {reducers} from "src/app/settings/store/reducers";
import {ReactiveFormsModule} from "@angular/forms";
import {BackendErrorMessagesModule} from "../shared/modules/backendErrorMessages/backendErrorMessages.module";

const routes = [
  {
    path: 'settings',
    component: SettingsComponent
  }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('settings', reducers),
    ReactiveFormsModule,
    BackendErrorMessagesModule
  ],
  declarations: [SettingsComponent]
})
export class SettingsModule{}
