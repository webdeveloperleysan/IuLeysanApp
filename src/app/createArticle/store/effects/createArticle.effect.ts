import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {switchMap, map, catchError, tap} from "rxjs";
import {of} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {
  createArticleAction,
  createArticleFailureAction,
  createArticleSuccessAction
} from "src/app/createArticle/store/actions/createArticle.action";
import {CreateArticleService} from "../../services/createArticle.service";
import {ArticleInterface} from "src/app/shared/types/article.interface";

@Injectable()
// run this code when a createArticle action is dispatched
export class CreateArticleEffect{
  //this.actions$.pipe from ngrx - this is a stream of every action that is being dispatched in the application
  createArticle$ = createEffect(()=>this.actions$.pipe(
    //listening for the actions of type createArticle
    ofType(createArticleAction),
    switchMap(({articleInput}) => {
      return this.createArticleService.createArticle(articleInput).pipe(
        //take the returned value and return a new success action containing the data
        map((article: ArticleInterface) => {
          return createArticleSuccessAction({article})
        }),
        //Or if it errors return a new failure action containing the error
        catchError((errorResponse: HttpErrorResponse) => {
          return of(createArticleFailureAction({errors: errorResponse.error.errors}))
        })
      )
    })
  ))

  redirectAfterCreate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createArticleSuccessAction),
        tap(({article})=> {
          this.router.navigate(['/articles', article.slug])
        })
      ),
    {dispatch: false}
  )

  constructor(private actions$: Actions,
              private createArticleService: CreateArticleService,
              private router: Router) {}
}
