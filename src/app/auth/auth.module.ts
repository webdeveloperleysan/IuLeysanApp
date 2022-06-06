import {NgModule} from '@angular/core'
import {CommonModule} from "@angular/common"

import {RegisterComponent} from 'src/app/auth/components/register/register.component'
import {Routes, RouterModule} from "@angular/router"
import {ReactiveFormsModule} from '@angular/forms'
import {StoreModule} from "@ngrx/store";
import {reducers} from "src/app/auth/store/reducers";
import {AuthService} from "src/app/auth/services/auth.service";
import {EffectsModule} from "@ngrx/effects";
import {RegisterEffect} from "src/app/auth/store/effects/register.effect";
import {BackendErrorMessagesModule} from "src/app/shared/modules/backendErrorMessages/backendErrorMessages.module";
import {PersistanceService} from "src/app/shared/services/persistance.service";
import {LoginEffect} from "src/app/auth/store/effects/login.effect";
import {LoginComponent} from "src/app/auth/components/login/login.component";
import {GetCurrentUserEffect} from "src/app/auth/store/effects/getCurrentUser.effect";
import {UpdateCurrentUserEffect} from "./store/effects/updateCurrentUser.effect";

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([
      RegisterEffect,
      LoginEffect,
      GetCurrentUserEffect,
      UpdateCurrentUserEffect,
      LoginEffect
    ]),
    BackendErrorMessagesModule
  ],
  declarations: [RegisterComponent, LoginComponent],
  providers: [AuthService, PersistanceService]
})
export class AuthModule {
}
