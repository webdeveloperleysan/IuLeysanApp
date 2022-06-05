import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {switchMap, map, catchError} from "rxjs";
import {of} from "rxjs";
import {ArticleInterface} from "src/app/shared/types/article.interface";
import {ArticleService as SharedArticleService} from "src/app/shared/services/article.service";
import {getArticleAction, getArticleFailureAction, getArticleSuccessAction} from "../actions/getArticle.action";
import {Router} from "@angular/router";

@Injectable()
export class GetArticleEffect {
  getArticle$ = createEffect(()=>
    this.actions$.pipe(
      ofType(getArticleAction),
      switchMap(({slug}) => {
        return this.sharedArticleService.getArticle(slug).pipe(
          map((article: ArticleInterface) => {
            return getArticleSuccessAction({article})
          }),
          catchError(() => {
            return of(getArticleFailureAction())
          })
        )
      })
    ))



  constructor(private actions$: Actions,
              private sharedArticleService: SharedArticleService,
              private router: Router
              ) {}
}
