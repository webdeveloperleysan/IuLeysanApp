import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { AuthModule } from 'src/app/auth/auth.module';
import {StoreModule} from "@ngrx/store";
import {environment} from "src/environments/environment";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {EffectsModule} from "@ngrx/effects";
import {TopBarModule} from "./shared/modules/topBar/topBar.module";
import {PersistanceService} from "./shared/services/persistance.service";
import {AuthInterceptor} from "./shared/services/authinterceptor.service";
import {GlobalFeedModule} from "./globalFeed/globalFeed.module";
import {StoreRouterConnectingModule, routerReducer} from "@ngrx/router-store";
import {YourFeedModule} from "./yourFeed/yourFeed.module";
import {TagFeedModule} from "./tagFeed/tagFeed.module";
import {ArticleModule} from "./article/article.module";
import {CreateArticleModule} from "./createArticle/createArticle.module";
import {EditArticleModule} from "./editArticle/editArticle.module";
import {SettingsModule} from "./settings/settings.module";
import {UserProfileModule} from "./userProfile/userProfile.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  // add all modules here so that they are present in the application
  imports: [
    BrowserModule, //module needed to work with the browser
    AppRoutingModule,
    AuthModule,
    HttpClientModule,
    StoreModule.forRoot({router: routerReducer}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      autoPause: true
    }),
    StoreRouterConnectingModule.forRoot(),
    TopBarModule,
    GlobalFeedModule,
    YourFeedModule,
    TagFeedModule,
    CreateArticleModule,
    ArticleModule,
    EditArticleModule,
    SettingsModule,
    UserProfileModule
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
export class AppModule {}
