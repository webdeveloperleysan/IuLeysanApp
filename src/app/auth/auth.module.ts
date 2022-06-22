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
import {LogoutEffect} from "./store/effects/logout.effect";


const routes: Routes = [
  {
    path: 'register', //the path along which we render the component (localhost:4200/register)
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
]
//@NgModule defines the class as an Angular module
//NgModule represents a decorator function that takes an object whose properties describe the module's metadata
@NgModule({
  //imports - other modules whose classes are required for the component templates from the current module
  imports: [
    CommonModule,
    RouterModule.forChild(routes), // when register routes for modules  - use forChild
    ReactiveFormsModule,// Reactive Forms creates a set of FormGroup and FormControl objects for a form.
    // The form itself and its subsections represent the FormGroup class, and individual input elements represent the FormControl class
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([
      RegisterEffect,
      LoginEffect,
      GetCurrentUserEffect,
      UpdateCurrentUserEffect,
      LogoutEffect
    ]),
    BackendErrorMessagesModule
  ],
  //declarations - view classes that belong to the module.
  declarations: [RegisterComponent, LoginComponent],
  //providers - classes that create the services used by the module
  providers: [AuthService, PersistanceService]
})
export class AuthModule {
}
