import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {EffectsModule} from "@ngrx/effects";
import {GetArticleEffect} from "./store/effects/getArticle.effect";
import {StoreModule} from "@ngrx/store";
import {reducers} from "src/app/shared/modules/feed/store/reducers";
import {ArticleService as SharedArticleService} from "../shared/services/article.service";
import {RouterModule} from "@angular/router";
import {ErrorMessageModule} from "src/app/shared/modules/errorMessage/errorMessage.module";
import {LoadingModule} from "src/app/shared/modules/loading/loading.module";




@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forFeature([GetArticleEffect]),
    StoreModule.forFeature('article', reducers),
    RouterModule,
    ErrorMessageModule,
    LoadingModule,

  ],
  declarations: [],
  exports: [],
  providers: [SharedArticleService]
})
export class ArticleModule {}
