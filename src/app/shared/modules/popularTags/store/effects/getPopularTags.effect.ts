import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {switchMap, map, catchError} from "rxjs";
import {of} from "rxjs";
import {PopularTagsService} from "../../services/popularTags.service";
import {
  getPopularTagsFailureAction,
  getPopularTagsAction,
  getPopularTagsSuccessAction
} from "../actions/getPopularTags.action";
import {PopularTagType} from "../../../../types/popularTag.type";

@Injectable()
export class GetPopularTagsEffect{
  getPopularTags$ = createEffect(()=>
    this.actions$.pipe(
      ofType(getPopularTagsAction),
      switchMap(() => {
        return this.popularTagsService.getPopularTags().pipe(
          map((popularTags: PopularTagType []) => {
            return getPopularTagsSuccessAction({popularTags})
          }),
          catchError(() => {
            return of(getPopularTagsFailureAction())
          })
        )
      })
    ))


  constructor(private actions$: Actions,
              private popularTagsService: PopularTagsService

  ) {}
}
