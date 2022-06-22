import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {EffectsModule} from "@ngrx/effects";
import {GetArticleEffect} from "./store/effects/getArticle.effect";
import {StoreModule} from "@ngrx/store";
import {reducers} from "src/app/article/store/reducers";
import {ArticleSharedService as SharedArticleService} from "../shared/services/articleShared.service";
import {RouterModule} from "@angular/router";
import {ErrorMessageModule} from "src/app/shared/modules/errorMessage/errorMessage.module";
import {LoadingModule} from "src/app/shared/modules/loading/loading.module";
import {ArticleComponent} from "./components/article/article.component";
import {TagListModule} from "../shared/modules/tagList/tagList.module";
import {ArticleService} from "./services/article.service";
import {DeleteArticleEffect} from "./store/effects/deleteArticle.effect";


const routes = [
  {
    path: 'articles/:slug',
    component: ArticleComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('article', reducers),
    EffectsModule.forFeature([GetArticleEffect, DeleteArticleEffect]),
    LoadingModule,
    ErrorMessageModule,
    TagListModule
  ],
  declarations: [ArticleComponent],
  providers: [SharedArticleService, ArticleService]
})
export class ArticleModule {}
