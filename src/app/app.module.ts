import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { AuthModule } from 'src/app/auth/auth.module';
import {StoreModule} from "@ngrx/store";
import {environment} from "src/environments/environment";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {EffectsModule} from "@ngrx/effects";
import {TopBarModule} from "./shared/modules/topBar/topBar.module";
import {PersistanceService} from "./shared/services/persistance.service";
import {AuthInterceptor} from "./shared/services/authinterceptor.service";
import {GlobalFeedModule} from "./globalFeed/globalFeed.module";
import {StoreRouterConnectingModule, routerReducer} from "@ngrx/router-store";
import {YourFeedModule} from "./yourlFeed/yourFeed.module";
import {TagFeedModule} from "./tagFeed/tagFeed.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule,
    StoreModule.forRoot({router: routerReducer}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    StoreRouterConnectingModule.forRoot(),
    TopBarModule,
    GlobalFeedModule,
    YourFeedModule,
    TagFeedModule
  ],
  providers: [
    PersistanceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
