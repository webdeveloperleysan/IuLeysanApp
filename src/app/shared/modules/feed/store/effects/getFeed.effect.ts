import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {switchMap, map, catchError} from "rxjs";
import {of} from "rxjs";

import {GetFeedResponseInterface} from "src/app/shared/modules/feed/types/getFeedResponse.interface";
import {FeedService} from "src/app/shared/modules/feed/services/feed.service";
import {getFeedAction, getFeedFailureAction, getFeedSuccessAction} from "src/app/shared/modules/feed/store/actions/getFeed.action";

@Injectable()
export class GetFeedEffect{
  getFeed$ = createEffect(()=>
    this.actions$.pipe(
      ofType(getFeedAction),
      // I need to get utl
      switchMap(({url}) => {
        //get url from action
        return this.feedService.getFeed(url).pipe(
          //if i get response from getFeed api - I get feed back
          map((feed: GetFeedResponseInterface) => {
            //then I rename action as success
            return getFeedSuccessAction({feed})
          }),
          catchError(() => {
            return of(getFeedFailureAction())
          })
        )
      })
    ))


  constructor(private actions$: Actions,
              private feedService: FeedService
  ) {}
}
